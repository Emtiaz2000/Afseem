import { Router } from 'express';
import {
  userValidationForm,
  userEditValidationForm,
  forgetpassField,
  forgetpassForm,
} from '../validator/user-validation.js';
import {
  userRegistrationValidationRes,
  userEditFormValidationRes,
  forgetEmailValidationRes,
  forgetPassValidationRes,
} from '../validator/user-validation-result.js';
import { Product } from '../modules/product/productSchema.js';
import { userSchema } from '../modules/user/userSchema.js';
import { sellerSchema } from '../modules/shop/shopSchema.js';
import { sendOTPEmail } from '../middlewares/mailforOTP.js';
import {
  otpValidationForm,
  otpValidationRes,
} from '../validator/otp-validaton.js';
import {
  verifyUser,
  verifyUserRole,
  preventAuthPagesForLoggedIn,
  preventStorePagesForLoggedIn,
} from '../middlewares/jwt.varification.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import fetch from 'node-fetch';
import { commentSchema } from '../modules/comment/commentSchema.js';
import {orderSchema} from '../modules/order/orderSchema.js'
import { upload } from '../middlewares/multerFileHandle.js'; //multer for image uploading
import sharp from 'sharp'; //sharp for resizing images
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs, { read } from 'fs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();
//ipinfoconfig
import { IPinfoWrapper } from "node-ipinfo"; //ip info
const ipinfoWrapper = new IPinfoWrapper(process.env.IPINFO_TOKEN_URL);
//get user registration form
router.get('/registration', preventAuthPagesForLoggedIn, (req, res) => {
  res.render('pages/Customer/customer-registration', { error: [],oldData:'' });
});

//get user registration form
router.post(
  '/registration',
  upload.single('customerprofilephoto'),
  userValidationForm,
  userRegistrationValidationRes,
  async (req, res) => {
    try {
      const {
        customerusername,
        customeremail,
        customerwhatsapp,
        customerunitno,
        customerbuildingno,
        customerstreetno,
        customerzoneno,
        customercountry,
        customercity,
        customerpassword,
        countryisd,
      } = req.body;
      let trackPass = customerpassword;
      const hasproductuploadimage = !!req.file;
      let customerimage;
      //console.log(req.file)
      //return
      let propernumber = countryisd+customerwhatsapp
      if (hasproductuploadimage) {
        const filename = Date.now() + '-customer.jpeg';
        const filepath = join(__dirname, '../../uploads/customers', filename);
        await sharp(req.file.buffer)
          .resize(300, 300, { fit: 'cover' })
          .jpeg({ quality: 70 })
          .toFile(filepath);

        customerimage = filename;
      } else {
        req.flash('error_msg', 'Please Upload Store Photo!');
        req.flash('oldData',req.body)
        return res.redirect('/registration');
      }
      bcrypt.genSalt(10, function (err, salt) {
        if (err) throw new Error(`Problem to Register User!`);
        bcrypt.hash(customerpassword, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (err) throw new Error(`Problem to Register User!`);
          const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
          const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
          let newUser = await userSchema.create({
            customerusername: customerusername,
            customerprofilephoto: customerimage,
            customeremail: customeremail,
            customerwhatsapp: propernumber,
            customerwhatsappnumber:customerwhatsapp,
            countryisd:countryisd,
            customerunitno: customerunitno,
            customerbuildingno: customerbuildingno,
            customerstreetno: customerstreetno,
            customerzoneno: customerzoneno,
            customercountry: customercountry,
            customercity: customercity,
            customerpassword: hash,
            trackpassword: trackPass,
            role: 'User',
            otp: otp,
            otpExpiry: otpExpiry,
          });
          sendOTPEmail(customeremail, otp);
          res.render('pages/checkmail', {
            useremail: customeremail,
            msg: `We have Send a OTP to ${customeremail} mail Please varify your OTP`,
            error: [],
          });
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
);

//check opt
router.post(
  '/verify-otp',
    preventAuthPagesForLoggedIn,otpValidationForm,otpValidationRes,  async (
    req,
    res
  ) => {
    const { useremail, otpfromemail } = req.body;

    const user = await userSchema.findOne({ customeremail: useremail });
    if (!user) return res.render('pages/404', { msg: 'No User Found' });
    if (user.isVerified) return res.redirect('/login');
    //console.log(typeof otpfromemail);

    if (user.otp !== otpfromemail)
      return res.render('pages/404', { msg: 'In Valid OTP!' });
    if (user.otpExpiry < new Date()) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();
      sendOTPEmail(user.customeremail, otp);
      res.render('pages/checkmail', {
        useremail: user.customeremail,
        error: [],
        msg: `Otp Expired ! We have Send a New OTP to ${user.customeremail} mail Please varify your OTP`,
      });
    } else {
      user.isVerified = true;
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
      req.flash('success_msg','Email has been verified!')
      res.redirect('/login');
    }
  }
);

//get login page
router.get('/login', preventAuthPagesForLoggedIn, (req, res) => {
  res.render('pages/Customer/customer-login', { error: [] });
});

//login process
router.post('/login', preventAuthPagesForLoggedIn, async (req, res) => {
  try {
    const user = await userSchema.findOne({
      customeremail: req.body.loginuseremail,
    });
    //console.log(req.body.loginuseremail)
    //console.log(user)
    if (!user) {
      res.render('pages/Customer/customer-login', {
        error: [{ msg: 'Invalid User!' }],
      });
    } else {
      if (!user.isVerified)
        return res.render('pages/checkmail', {
          error: [],
          useremail: user.customeremail,
          msg: `We have Send a OTP to ${user.customeremail} mail Please varify your OTP`,
        });
      bcrypt.compare(
        req.body.loginuserpass,
        user.customerpassword,
        function (err, result) {
          if (err)
            res.render('pages/Customer/customer-login', {
              error: [{ msg: 'Invalid User!' }],
            });
          if (result) {
            let token = jwt.sign(
              { id: user._id, email: user.customeremail, role: 'User' },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );
            res.cookie('token', token);
            if(req.cookies.checkouturl){
              res.cookie("checkouturl",'')
              res.redirect(req.cookies.checkouturl)
            }else{
              res.redirect('/profile');
            }
          } else {
            res.render('pages/Customer/customer-login', {
              error: [{ msg: 'Invalid login!' }],
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error)
    console.log(error.message);
  }
});

//logout user
router.get('/logout', verifyUser, verifyUserRole('User'), (req, res) => {
  res.cookie('token', '');
  res.redirect('/');
});

//get profile page
router.get('/profile', verifyUser, verifyUserRole('User'), async (req, res) => {
 try {
    const user = await userSchema.findOne({ _id: res.locals.user.id });

    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // current page, default 1
    const limit = 10; // orders per page
    const skip = (page - 1) * limit;

    // Get total number of orders
    const totalOrders = await orderSchema.countDocuments({ customer: req.user.id });

    // Fetch paginated orders
    const orders = await orderSchema.find({ customer: req.user.id })
        .sort({ _id: -1 }) // latest orders first
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalOrders / limit);

     res.render('pages/Customer/customer-profile', {
        user,
        orders,
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        nextPage: page + 1,
        prevPage: page - 1
    });
} catch (error) {
    console.log(error.message);
}
});
//get edit profile form
router.get(
  '/edit-profile/:userid',
  verifyUser,
  verifyUserRole('User'),
  async (req, res) => {
    try {
      const user = await userSchema.findOne({ _id: res.locals.user.id });
      if (!user) throw new Error('User Not Found!');
      res.render('pages/Customer/customer-edit-profile', { user, error: [] });
    } catch (error) {
      console.log(error.message);
    }
  }
);

//edit profile process
router.put(
  '/edit-profile/:userid',
  verifyUser,
  verifyUserRole('User'),
  upload.single('customerprofilephoto'),
  userEditValidationForm,
  userEditFormValidationRes,
  async (req, res) => {
    try {
      const {
        customerusername,
        customerwhatsapp,
        customerunitno,
        customerbuildingno,
        customerstreetno,
        customerzoneno,
        customercity,
        customercountry,
        countryisd,
      } = req.body;
      let propernumber= countryisd + customerwhatsapp
            
      const hasproductuploadimage = !!req.file;
      let customerimage;
      let updateProfileData;
      if (hasproductuploadimage) {
        const filename = Date.now() + '-customer.jpeg';
        const filepath = join(__dirname, '../../uploads/customers', filename);
        await sharp(req.file.buffer)
          .resize(300, 300, { fit: 'cover' })
          .jpeg({ quality: 70 })
          .toFile(filepath);

        customerimage = filename;
        updateProfileData = {
          customerusername,
          customerprofilephoto: customerimage,
          customerwhatsapp:propernumber,
          customerwhatsappnumber:customerwhatsapp,
          customerunitno,
          customerbuildingno,
          customerstreetno,
          customerzoneno,
          customercity,
          customercountry,
          countryisd
        };
        let user = await userSchema.findById({_id:res.locals.user.id})
        fs.unlink(`/root/Afseem/src/uploads/customers/${user.customerprofilephoto}`,(err)=>{
                    if(err){
                      console.log(err)
                    }
              })
      } else {
        updateProfileData = {
          customerusername,
          customerwhatsapp,
          customerwhatsapp:propernumber,
          customerwhatsappnumber:customerwhatsapp,
          customerunitno,
          customerbuildingno,
          customerstreetno,
          customerzoneno,
          customercity,
          customercountry,
          countryisd
        };
      }
      
      await userSchema.findByIdAndUpdate(
        { _id: res.locals.user.id },
        updateProfileData
      );
      //  res.render('pages/Customer/customer-edit-profile')
      res.redirect('/profile');
    } catch (error) {
      console.log(error.message);
    }
  }
);

//delete profile
router.delete(
  '/delete-profile',
  verifyUser,
  verifyUserRole('User'),
  async (req, res) => {
    try {
      const user = await userSchema.findOne({ _id: res.locals.user.id });
      if (!user) throw new Error('No User Found!');
      fs.unlink(`/root/Afseem/src/uploads/customers/${user.customerprofilephoto}`,(err)=>{
                    if(err){
                      console.log(err)
                    }
              })
      await orderSchema.deleteMany({customer:user._id})
      await commentSchema.deleteMany({customer:user._id})
      await userSchema.findByIdAndDelete({ _id: user._id });
      res.cookie('token', '');
      res.redirect('/');
    } catch (error) {
      console.log(error.message);
    }
  }
);

//store category
router.get('/store-category',  preventStorePagesForLoggedIn , (req, res) => {
  res.render('pages/Customer/selectcategory');
});

router.get(
  '/store-category/:category',
  preventStorePagesForLoggedIn,
  async (req, res) => {
    try {
      //const ip = req.headers['x-forwarded-for']?.split(',').shift() || req.socket?.remoteAddress;
       // fallback if localhost (::1)
      //const clientIp = ip === "::1" ? "8.8.8.8" : ip;
      //console.log(clientIp)
      let category = req.params.category;
      //console.log(category)
      //const requests = await fetch(`https://ipinfo.io/${clientIp}?token=${process.env.IPINFO_TOKEN_URL}`);
      //const jsonResponses = await requests.json();
      //console.log(jsonResponses)
      res.render('pages/Customer/citygrocery', {
        category,
        country: "QA",
        error: [],
      });
    } catch (error) {
      console.log(error)
    }
    
  }
);

//getting store nearby
router.get('/storenearby',  preventStorePagesForLoggedIn , async (req, res) => {
  let pageRegular = parseInt(req.query.pageRegular) || 1;
  let pageSubscribed = parseInt(req.query.pageDiscount) || 1;
  const limit = 16; // items per page
  const pageSubscribedLimit = 4; // items per page
  let query = req.query;
  //console.log(query)
  //getting user city info
  if (req.query.category == undefined) return res.redirect('/store-category');
  //console.log({storeCategory:query.category,countryisocode:jsonResponse.country,subscription:false,storecity:query.storecity})
  //console.log(query)
  let totalRegularStore = await sellerSchema
    .countDocuments({
      storeCategory: query.category,
      countryisocode: query.countrycode,
      subscription: false,
      storecity: query.storecity
    })
    .collation({ locale: 'en', strength: 2 });
  let stores = await sellerSchema
    .find({
      storeCategory: query.category,
      countryisocode: query.countrycode,
      subscription: false,
      storecity: query.storecity
    })
    .collation({ locale: 'en', strength: 2 })
    .skip((pageRegular - 1) * limit)
    .limit(limit);
    

  let totalSubscribedStore = await sellerSchema
    .countDocuments({
      storeCategory: query.category,
      storecity: query.storecity,
      countryisocode: query.countrycode,
      subscription: true,
    })
    .collation({ locale: 'en', strength: 2 });
  let subscribedStore = await sellerSchema
    .find({
      storeCategory: query.category,
      storecity: query.storecity,
      countryisocode: query.countrycode,
      subscription: true,
    })
    .collation({ locale: 'en', strength: 2 })
    .skip((pageSubscribed - 1) * pageSubscribedLimit)
    .limit(pageSubscribedLimit);

  //console.log(subscribedStore)
  if (stores.length < 1)
    return res.render('pages/Customer/allstore', {
      subscribedStore,
      stores,
      error: '',
      paginationSubscribed: {
        current: pageSubscribed,
        totalPages: Math.ceil(totalSubscribedStore / pageSubscribedLimit),
      }
    });

  res.render('pages/Customer/allstore', {
    subscribedStore,
    stores,
    error: 0,
    paginationSubscribed: {
      current: pageSubscribed,
      totalPages: Math.ceil(totalSubscribedStore / pageSubscribedLimit),
    },
    paginationRegular: {
      current: pageRegular,
      totalPages: Math.ceil(totalRegularStore / limit),
    },
  });
});

//get specific store
router.get(
  '/store/:storeid',
  preventStorePagesForLoggedIn,
  async (req, res) => {
    const commentpage = parseInt(req.query.commentpage) || 1;
    const commentlimit = 5; // number of comments per page
    const commentskip = (commentpage - 1) * commentlimit;
    let pageRegular = parseInt(req.query.pageRegular) || 1;
    let pageDiscount = parseInt(req.query.pageDiscount) || 1;
    const limit = 18; // items per page
    const discountLimit = 12; // items per page
    let storeId = req.params.storeid;
    let user = res.locals.user || null;
    if (!mongoose.Types.ObjectId.isValid(storeId))
      return res.render('pages/404', { msg: 'Invalid Store ID!' });
    let store = await sellerSchema.findOne({ _id: storeId });
    if (!store) return res.render('pages/404', { msg: ' Invalid Store!' });
    //console.log(req.query.subcategory)
    //regular products
    let regularProductsQuery = {
      store: store._id,
      productofferprice: null,
      enable: true,
    };
    if (req.query.subcategory)
      regularProductsQuery.subcategory = req.query.subcategory;
    if (req.query.searchproduct)
      regularProductsQuery.productname = {
        $regex: req.query.searchproduct,
        $options: 'i',
      };

    let totalRegularProducts = await Product.countDocuments(
      regularProductsQuery
    ).collation({ locale: 'en', strength: 2 });
    let regularProducts = await Product.find(regularProductsQuery)
      .collation({ locale: 'en', strength: 2 })
      .skip((pageRegular - 1) * limit)
      .limit(limit);
    //discount Product
    let discountedProductsQuery = {
      store: store._id,
      productofferprice: { $ne: null },
      enable: true,
    };
    if (req.query.subcategory)
      discountedProductsQuery.subcategory = req.query.subcategory;
    if (req.query.searchproduct)
      discountedProductsQuery.productname = {
        $regex: req.query.searchproduct,
        $options: 'i',
      };

    let totalDiscountProducts = await Product.countDocuments(
      discountedProductsQuery
    ).collation({ locale: 'en', strength: 2 });
    let discountProduct = await Product.find(discountedProductsQuery)
      .collation({ locale: 'en', strength: 2 })
      .skip((pageDiscount - 1) * discountLimit)
      .limit(discountLimit);
    const result = await Product.aggregate([
      { $match: { store: new mongoose.Types.ObjectId(store._id) } }, // filter by store
      {
        $group: {
          _id: '$subcategory', // group by category
          totalProducts: { $sum: 1 }, // count
        },
      },
      { $sort: { _id: 1 } },
    ]);
    //console.log(discountproducts)
    const subcategoryQuery = req.query.subcategory;
    //finding comment
    const comments = await commentSchema
      .find({ store: store._id })
      .sort({ createdAt: -1 }) // newest first
      .skip(commentskip)
      .limit(commentlimit);
    //count total comment
    const totalComments = await commentSchema.countDocuments({
      store: store._id,
    });
    const totalCommentPage = Math.ceil(totalComments / commentlimit);

    res.render('pages/Customer/singlestorepage', {
      searchitem: req.query.searchproduct || '',
      store,
      discountproducts: discountProduct,
      products: regularProducts,
      comments,
      commentpagination: {
        totalCommentPage,
        currentPage: commentpage,
      },
      user,
      result,
      subcategoryQuery,
      paginationDiscount: {
        current: pageDiscount,
        totalPages: Math.ceil(totalDiscountProducts / discountLimit),
      },
      paginationRegular: {
        current: pageRegular,
        totalPages: Math.ceil(totalRegularProducts / limit),
      },
      error: [],
    });
  }
);

//forget user password
router.get(
  '/forgetpassword',
  preventStorePagesForLoggedIn,
  preventAuthPagesForLoggedIn,
  (req, res) => {
    res.render('pages/Customer/checkusermail', { error: [] });
  }
);

router.post(
  '/forgetpassword',
  preventStorePagesForLoggedIn,
  preventAuthPagesForLoggedIn,
  forgetpassField,
  forgetEmailValidationRes,
  async (req, res) => {
    let { useremail } = req.body;
    if (!useremail)
      return res.render('pages/Customer/checkusermail', {
        error: [{ msg: 'Please Enter Email Address' }],
      });
    const user = await userSchema.findOne({ customeremail: useremail });
    if (!user)
      return res.render('pages/Customer/checkusermail', {
        error: [{ msg: 'Invalid User!' }],
      });
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    // Save OTP and expiry to user document
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;
    await user.save();
    sendOTPEmail(user.customeremail, otp);
    res.render('pages/Customer/changepassword', {
      useremail: user.customeremail,
      error: [],
      msg: 'OTP Sent to Your Mail Please Check!',
    });
    //res.render('pages/Customer/checkusermail',{error:[]})
  }
);

//change password process
router.post(
  '/changepassword-verify-otp',
  preventAuthPagesForLoggedIn,
  forgetpassForm,
  forgetPassValidationRes,
  async (req, res) => {
    const { useremail, otp, newpassword } = req.body;
    //console.log(useremail)
    const user = await userSchema.findOne({ customeremail: useremail });
    //console.log(user)
    if (!user) return res.render('pages/404', { msg: 'No user Found' });
    if (user.resetPasswordOTP !== otp)
      return res.render('pages/Customer/changepassword', {
        useremail: user.customeremail,
        error: [{ msg: 'Invalid OTP!' }],
        msg: '',
      });
    if (user.resetPasswordOTPExpiry < new Date()) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
      user.resetPasswordOTP = otp;
      user.resetPasswordOTPExpiry = otpExpiry;
      await user.save();
      sendOTPEmail(user.customeremail, otp);
      res.render('pages/Customer/changepassword', {
        useremail: user.customeremail,
        error: [],
        msg: `Otp Expired ! We have Send a New OTP to ${user.customeremail} mail Please varify your OTP`,
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        if (err) throw new Error(`Problem to Register User!`);
        bcrypt.hash(newpassword, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (err) throw new Error(`Problem to Register User!`);
          //saving new pass
          user.customerpassword = hash;
          user.resetPasswordOTP = null;
          user.resetPasswordOTPExpiry = null;
          user.trackpassword = newpassword;
          await user.save();
          req.flash('success_msg',"Passward change successfully!")
          res.redirect('/login');
        });
      });
    }
  }
);

//comment route
router.post(
  '/post-comment/:storeid',
  verifyUser,
  verifyUserRole('User'),
  async (req, res) => {
    let pageRegular = parseInt(req.query.pageRegular) || 1;
    let pageDiscount = parseInt(req.query.pageDiscount) || 1;
    const limit = 18; // items per page
    const discountLimit = 12; // items per page
    let storeId = req.params.storeid;
    let user = res.locals.user || null;
    if (!mongoose.Types.ObjectId.isValid(storeId))
      return res.render('pages/404', { msg: 'Invalid Store ID!' });
    let store = await sellerSchema.findOne({ _id: storeId });
    if (!store) return res.render('pages/404', { msg: ' Invalid Store!' });
    //console.log(req.query.subcategory)
    //regular products
    let regularProductsQuery = { store: store._id, productofferprice: null };
    if (req.query.subcategory)
      regularProductsQuery.subcategory = req.query.subcategory;
    let totalRegularProducts = await Product.countDocuments(
      regularProductsQuery
    ).collation({ locale: 'en', strength: 2 });
    let regularProducts = await Product.find(regularProductsQuery)
      .collation({ locale: 'en', strength: 2 })
      .skip((pageRegular - 1) * limit)
      .limit(limit);
    //discount Product
    let discountedProductsQuery = {
      store: store._id,
      productofferprice: { $ne: null },
    };
    if (req.query.subcategory)
      discountedProductsQuery.subcategory = req.query.subcategory;
    let totalDiscountProducts = await Product.countDocuments(
      discountedProductsQuery
    ).collation({ locale: 'en', strength: 2 });
    let discountProduct = await Product.find(discountedProductsQuery)
      .collation({ locale: 'en', strength: 2 })
      .skip((pageDiscount - 1) * discountLimit)
      .limit(discountLimit);
    const result = await Product.aggregate([
      { $match: { store: new mongoose.Types.ObjectId(store._id) } }, // filter by store
      {
        $group: {
          _id: '$subcategory', // group by category
          totalProducts: { $sum: 1 }, // count
        },
      },
      { $sort: { _id: 1 } },
    ]);
    //console.log(discountproducts)
    const { starvalue, customerreview } = req.body;
    let review = customerreview.trim();
    const subcategoryQuery = req.query.subcategory;
    const comments = await commentSchema.find({ store: store._id });
    if (starvalue < 1) {
      res.render('pages/Customer/singlestorepage', {
        searchitem: req.query.searchproduct || '',
        store,
        discountproducts: discountProduct,
        products: regularProducts,
        user,
        comments,
        result,
        subcategoryQuery,
        paginationDiscount: {
          current: pageDiscount,
          totalPages: Math.ceil(totalDiscountProducts / discountLimit),
        },
        paginationRegular: {
          current: pageRegular,
          totalPages: Math.ceil(totalRegularProducts / limit),
        },
        error: [{ msg: 'Select Star!' }],
      });
    } else if (review.length < 3) {
      res.render('pages/Customer/singlestorepage', {
        searchitem: req.query.searchproduct || '',
        store,
        discountproducts: discountProduct,
        products: regularProducts,
        user,
        comments,
        result,
        subcategoryQuery,
        paginationDiscount: {
          current: pageDiscount,
          totalPages: Math.ceil(totalDiscountProducts / discountLimit),
        },
        paginationRegular: {
          current: pageRegular,
          totalPages: Math.ceil(totalRegularProducts / limit),
        },
        error: [{ msg: 'Review must be greater then 3 Character!' }],
      });
    } else {
      let auth = await userSchema.findById({ _id: user.id });
      let comment = await commentSchema.create({
        stars: starvalue,
        comment: review,
        auth: user.id,
        store: store._id,
        authname: auth.customerusername,
      });
      //console.log(comment)
      res.redirect(`/store/${store._id}`);
    }
  }
);

//delete comment
router.delete(
  '/delete-comment/:commentid/:storeid',
  verifyUser,
  verifyUserRole('User'),
  async (req, res) => {
    {
      let commentId = req.params.commentid;
      let storeId = req.params.storeid;
      let comment = await commentSchema.findOne({ _id: commentId });
      let user = res.locals.user;
      //console.log(comment)
      if (comment.auth.equals(user.id)) {
        await commentSchema.findOneAndDelete({ _id: commentId });
        res.redirect(`/store/${storeId}`);
      }
    }
  }
);

//cart section 
router.get('/cart',(req,res)=>{
  res.render('pages/Customer/cart')
})

router.get('/cart/:storeid',verifyUser,
  verifyUserRole('User'),async(req,res)=>{
    let storeid = req.params.storeid
    let store = await sellerSchema.findById(storeid)
    if(!store) return res.render('pages/404', { msg: 'Invalid Store!' })
    res.render('pages/Customer/checkoutpage')
})

//place order
router.post('/checkout/:storeid',verifyUser,
  verifyUserRole('User'),async(req,res)=>{
    let storeid = req.body.storeid;
    if(!mongoose.Types.ObjectId.isValid(storeid)) return res.render('pages/404', { msg: 'Invalid Store!' })
    let store = await sellerSchema.findById(storeid)
    //console.log(store)
    let user = await userSchema.findById(req.user.id)
    //console.log(user)
    if(store){
     let order= await orderSchema.create({
      store:store._id,
      customer:req.user.id,
      grandtotal:req.body.grandtotal,
      currency:req.body.currency,
      productsname:req.body.productsname,
      productsid:req.body.productids,
      productsprices:req.body.productprices,
      productsquantities:req.body.productquantities,
      storecategory:req.body.storecategory,
      
    }) 
    let message ='Hi New Order!.\n'
    for(let i=0; i< req.body.productsname.length;i++){
      message+=`(Product-name: ${req.body.productsname[i]} quantity: ${req.body.productquantities[i]} price: ${req.body.productquantities[i]*req.body.productprices[i]})\n`
    }
    //final message
    message+= `
    Grand Total: ${req.body.grandtotal}.\n
    Location: \n
    phone: ${user.customerwhatsapp}.\n
    city: ${user.customercity}.\n
    Building No: ${user.customerbuildingno}.\n
    Street No: ${user.customerstreetno}.\n
    Unit No: ${user.customerunitno}.\n
    Zone No: ${user.customerzoneno}.\n
    `
    //checking mobile 
    let ua = req.headers['user-agent'];
    let isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
    //assign url for whatsapp
    let url;

    if (isMobile) {
      // Works on both iOS + Android (WhatsApp app must be installed)
      url = `whatsapp://send?phone=${store.whatsapp}&text=${encodeURIComponent(message)}`;
    } else {
      // Works on desktop browsers (WhatsApp Web)
      url = `https://wa.me/${store.whatsapp}?text=${encodeURIComponent(message)}`;
    }
    //sending order to whatsapp
    res.send({ url });

    }
    
})

export default router;
