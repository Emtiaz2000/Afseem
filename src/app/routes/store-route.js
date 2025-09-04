import { Router } from 'express';
import { storeValidationForm,storeEditForm,storeforgetpassField, storeforgetpassForm } from '../validator/store-validation.js';
import { storeRegistrationValidationRes,storeEditProfileValidationRes,storeforgetEmailValidationRes,storeforgetPassValidationRes } from '../validator/store-validation-result.js';
import {productValidationForm} from '../validator/product-validation.js'
import {addProductValidationRes} from '../validator/product-validation-result.js'
import { sellerSchema } from '../modules/shop/shopSchema.js';
import {verifyStore,verifyStoreRole,preventStorePagesForLoggedIn} from '../middlewares/jwt.varification.js'
import {Product} from '../modules/product/productSchema.js'
import {sendOTPEmail} from '../middlewares/mailforOTP.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import {otpValidationFormSeller,otpValidationResSeller} from '../validator/otp-validaton.js';
import {upload,uploadcsv} from '../middlewares/multerFileHandle.js';//multer for image uploading
import sharp from "sharp";//sharp for resizing images
import { join,dirname } from 'path';
import { fileURLToPath } from 'url';
import { commentSchema } from '../modules/comment/commentSchema.js';
import {uploadToCloudinary} from '../middlewares/cloudnary.js'
import {orderSchema} from '../modules/order/orderSchema.js'
import {processGoogleIframe} from '../validator/iframevalidator.js'
import fs from 'fs';
import XLSX from 'xlsx';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();
//getting registration form
router.get('/registration-store',preventStorePagesForLoggedIn, (req, res) => {
  res.render('pages/Store/store-registration', { error: 0 });
});
//register user in database
router.post(
  '/registration-store',upload.single('storePhoto'),
  storeValidationForm,
  storeRegistrationValidationRes,
   async (req, res) => {

    const {
      storeName,
      ownerName,
      storeemail,
      storeCategory,
      whatsapp,
      countryisd,
      storeunitno,
      storebuildingno,
      storestreetno,
      storezoneno,
      country,
      storecity,
      storelocationmap,
      homeDelivery,
      storeopen,
      storeclose,
      storepassword,
      countryisocode,
    } = req.body;
    let propernumber = countryisd + whatsapp
    if(!processGoogleIframe(storelocationmap)){
        req.flash('error_msg',"Need Valid Google Map Location")
       return res.redirect('/registration-store')

    } 
    let googlemaplocation = processGoogleIframe(storelocationmap)
    let trackPass= storepassword
    const hasstorephoto = !!req.file;
    let storeimage;
      if (hasstorephoto) {
          const filename = Date.now() + "-store.jpeg";
          const filepath = join(__dirname, "../../uploads/stores", filename);
          await sharp(req.file.buffer)
            .resize(300, 300, { fit: "cover" })
            .jpeg({ quality: 70 })
            .toFile(filepath);

          storeimage = filename;
        }else{
          req.flash("error_msg", "Please Upload Store Photo!");
          return res.redirect("/registration-store");
        }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) throw new Error(`Problem to Register Seller!`);
      bcrypt.hash(storepassword, salt, async function (err, hash) {
        // Store hash in your password DB.
        if (err) throw new Error(`Problem to Register Seller!`);
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
         let newStore = await  sellerSchema.create({
            storeName:storeName,
            ownerName:ownerName,
            storePhoto:storeimage,
            storeemail:storeemail,
            storeCategory:storeCategory,
            whatsapp:propernumber,
            whatsappnumber:whatsapp,
            countryisd:countryisd,
            storeunitno:storeunitno,
            storebuildingno:storebuildingno,
            storestreetno:storestreetno,
            storezoneno:storezoneno,
            country:country,
            storecity:storecity,
            storelocationmap:googlemaplocation, 
            homeDelivery:homeDelivery,
            countryisocode:countryisocode,
            trackpassword:trackPass,
            storeopen:storeopen,
            storeclose:storeclose,
            storepassword:hash,
            role:'Seller',
            otp:otp,
            otpExpiry:otpExpiry,
            activestatus:true
         })
         sendOTPEmail(storeemail,otp)//sending otp to user email
         res.render('pages/otpseller',{useremail:storeemail,msg:`We have Send a OTP to ${storeemail} mail Please varify your OTP`,error:[]})
      });
    });
  }
);

//check opt
router.post('/verify-otp-seller',preventStorePagesForLoggedIn,otpValidationFormSeller,otpValidationResSeller, async (req, res) => {
    const { useremail, otpfromemail } = req.body;
    //console.log(useremail)
    const user = await sellerSchema.findOne({ storeemail:useremail });
    //console.log(user)
    if (!user) return res.render('pages/404',{msg:"No user Found"});
    if (user.isVerified) return res.redirect('/store-login');
    if (user.otp !== otpfromemail) return res.render('pages/404',{msg:"In Valid OTP!"});
    if (user.otpExpiry < new Date()){
          const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
          const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
          user.otp=otp;
          user.otpExpiry=otpExpiry;
          await user.save();
          sendOTPEmail(user.storeemail,otp)
          res.render('pages/otpseller',{useremail:user.storeemail,error:[],msg:`Otp Expired ! We have Send a New OTP to ${user.storeemail} mail Please varify your OTP`})
    }else{
      user.isVerified = true;
      user.otp = null;
      user.otpExpiry = null;
      await user.save();

      res.redirect('/store-login');
    }
    
});
//logout store
router.get('/store-logout',verifyStore,verifyStoreRole("Seller"),(req,res)=>{
  res.cookie('token','')
  res.redirect('/')
})

//store login form
router.get('/store-login',preventStorePagesForLoggedIn,(req,res)=>{
  res.render('pages/Store/store-login',{error:[]})
})
//store login process
router.post('/store-login', async(req,res)=>{
   const user = await sellerSchema.findOne({storeemail:req.body.loginuseremail})
   //console.log(user.role)
   if(!user){
    res.render('pages/Store/store-login',{error:[{msg:"Invalid User!"}]})
   }else{
    if(!user.isVerified) return res.render('pages/otpseller',{error:[],useremail:user.storeemail,msg:`We have Send a OTP to ${user.storeemail} mail Please varify your OTP`});
     bcrypt.compare(req.body.loginuserpass,user.storepassword,function (err,result){
      if(err) res.render('pages/Store/store-login',{error:[{msg:"Invalid User!"}]});
        if(result){
          let token = jwt.sign({id: user._id,email:user.storeemail,role:"Seller"},process.env.JWT_SECRET,{ expiresIn: "7d" })
          res.cookie('token',token)
          res.redirect('/store-dashboard')
        }else{
          res.render('pages/Store/store-login',{error:[{msg:"Invalid login!"}]})
        }
      
     })
   }
})

//get profile
router.get('/store-profile',verifyStore,verifyStoreRole("Seller"), async (req, res) => {
  const store = await sellerSchema.findOne({_id:res.locals.user.id})
  //console.log(store)
  if(!store) throw new Error('Something Went Wrong!')
  res.render('pages/Store/store-profile',{store})
});


//get edit store profile page
router.get('/edit-store-profile/:storeid',verifyStore,verifyStoreRole("Seller"), async (req, res) => {

  let storeid= mongoose.Types.ObjectId.isValid(req.params.storeid)  
  if(!storeid) throw new Error('Store Id is not Valid!')
  let store = await sellerSchema.findOne({_id:res.locals.user.id})
  if(!store) throw new Error('Store not Found!')
  res.render('pages/Store/store-edit-profile',{store,error:[]});
});
//store edit profile page process
router.put('/edit-store-profile/:storeid',verifyStore,verifyStoreRole("Seller"),upload.single('storePhoto'),storeEditForm,storeEditProfileValidationRes,async (req, res) => {

  let storeid= mongoose.Types.ObjectId.isValid(req.params.storeid)  
  if(!storeid) throw new Error('Store Id is not Valid!')
  //image processing
  const hasstorephoto = !!req.file;
  if(!processGoogleIframe(req.body.storelocationmap)){
        req.flash('error_msg',"Need Valid Google Map Location")
        return res.redirect(`/edit-store-profile/${req.params.storeid}`)

    } 
  let properphonenum = req.body.countryisd+req.body.whatsapp
  let storeimage;
  let updateData;
  if (hasstorephoto) {
      const filename = Date.now() + "-stores.jpeg";
      const filepath = join(__dirname, "../../uploads/stores", filename);
      await sharp(req.file.buffer)
            .resize(300, 300, { fit: "cover" })
            .jpeg({ quality: 70 })
            .toFile(filepath);

          storeimage = filename;
          
          updateData = {
            storeName: req.body.storeName,
            ownerName: req.body.ownerName,
            whatsappnumber: req.body.whatsapp,
            whatsapp:properphonenum,
            storePhoto:storeimage,
            storeemail:req.body.storeemail,
            storeunitno: req.body.storeunitno,
            storebuildingno: req.body.storebuildingno,
            storestreetno: req.body.storestreetno,
            storezoneno: req.body.storezoneno,
            country:req.body.country,
            storecity: req.body.storecity,
            countryisd:req.body.countryisd,
            storelocationmap: req.body.storelocationmap,
            storeopen:req.body.storeopen,
            storeclose:req.body.storeclose,
            homeDelivery: req.body.homeDelivery,
            countryisocode:req.body.countryisocode,
          };

          let store = await sellerSchema.findById({_id:res.locals.user.id})
          if (!store) {
              return res.status(404).send("Store not found");
            }
          fs.unlink(`/root/Afseem/src/uploads/stores/${store.storePhoto}`,(err)=>{
                      if(err){
                        console.log(err)
                      }
          })
        }else{
           updateData = {
            storeName: req.body.storeName,
            ownerName: req.body.ownerName,
            whatsapp:properphonenum,
            whatsappnumber: req.body.whatsapp,
            countryisd:req.body.countryisd,
            storeemail:req.body.storeemail,
            storeunitno: req.body.storeunitno,
            storebuildingno: req.body.storebuildingno,
            storestreetno: req.body.storestreetno,
            storezoneno: req.body.storezoneno,
            country:req.body.country,
            storecity: req.body.storecity,
            storelocationmap: req.body.storelocationmap,
            storeopen:req.body.storeopen,
            storeclose:req.body.storeclose,
            homeDelivery: req.body.homeDelivery,
            countryisocode:req.body.countryisocode,
          };
        }
  
  await sellerSchema.findOneAndUpdate({_id:res.locals.user.id},updateData)
  res.redirect('/store-profile')
});
//geting product from product
router.get('/store-dashboard',verifyStore,verifyStoreRole("Seller"), async(req, res) => {
  try {
    let productContainer;
    const page = parseInt(req.query.page) || 1;   // default page = 1
    const limit = parseInt(req.query.limit) || 9; // default 10 per page
    const skip = (page - 1) * limit;
    //console.log(req.query.subcategory)
    const store = await sellerSchema.findOne({_id:res.locals.user.id}) 
    if(!store) throw new Error('Something went wrong!')
    let filter = { store: store._id , };
    if (req.query.subcategory) {
      filter.subcategory = req.query.subcategory; // applies only if category is selected
    }
    
      productContainer = await Product.find(filter)
                              .skip(skip)
                              .limit(limit)
                              .sort({ createdAt: -1 })
    const totalProducts = await Product.countDocuments(req.query.subcategory ? { subcategory: req.query.subcategory, store: store._id } : { store: store._id },);
    const totalPages = Math.ceil(totalProducts / limit);
    const result = await Product.aggregate([
      {
        $match: { store: new mongoose.Types.ObjectId(store._id) } // filter by store
      },
      {
        $group: {
          _id: "$subcategory",             // group by category
          totalProducts: { $sum: 1 }    // count
        }
      },
       { $sort: { _id: 1 } }
    ]);

    // console.log(result)
    //console.log(subcategory)
    let activeUrl =req.query.subcategory
    //console.log(activeUrl)
    res.render('pages/Store/master-data',{
      products:productContainer,
      result,
      activeUrl,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    console.log(error.message)
  }
  
});
//get add product page
router.get('/add-product',verifyStore,verifyStoreRole("Seller"),async (req, res) => {
  let store = await sellerSchema.findOne({_id:res.locals.user.id})
  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  res.render('pages/Store/add-product',{error:[],category:store.storeCategory,isMobileDevice:isMobileDevice ||''});
});


//add product process
router.post('/add-product',verifyStore,verifyStoreRole("Seller"),upload.fields([{ name: "productimage", maxCount: 1 },{ name: "takephoto", maxCount: 1 } ]),productValidationForm,addProductValidationRes,
 async (req,res)=>{
   
  try {
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    function isMobileDevice() {
      return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
  if(Number(req.body.productprice) < Number(req.body.productofferprice)){
     return res.render('pages/Store/add-product',{error:[{msg:"Offer Price Must be Smaller than Regular Price!"}],category:store.storeCategory,isMobileDevice:isMobileDevice || " "});
  }
  const {productname,subcategory,productprice,productofferprice='',currency,sku}=req.body
  //sharp configration
    const hasproductuploadimage = !!req.files.productimage;
    const hastakephotoimage = !!req.files.takephoto;
    
    if ((hasproductuploadimage && hastakephotoimage) || (!hasproductuploadimage && !hastakephotoimage)) {
      req.flash("error_msg", "Please Upload or Click Photo, not both!");
      return res.redirect("/add-product");
    }else{
      let productimageurl;
      //productuploadingimage
      if (hasproductuploadimage) {
          const processedImage = await sharp(req.files.productimage[0].buffer)
              .resize(300, 340, { fit: "cover" })
              .jpeg({ quality: 70 })
              .toBuffer();

            productimageurl = await uploadToCloudinary(processedImage);
          }
      if (hastakephotoimage) {
            const processedImage =  await sharp(req.files.takephoto[0].buffer)
              .resize(300, 340, { fit: "cover" })
              .jpeg({ quality: 70 })
              .toBuffer();

            productimageurl = await uploadToCloudinary(processedImage);
          }

    
        //creating product
      let product = await Product.create({
          productname: productname,
          store: store._id,
          subcategory:subcategory ,
          productimage:productimageurl,
          productprice: productprice,
          productofferprice:productofferprice,
          currency: currency,
          sku:sku,
    })
      req.flash("success_msg", "Product added successfully!");
      res.redirect('/add-product')
    }
  
  
  } catch (error) {
    req.flash("error_msg", error.message);
    console.log(error.message)
    
  }
  
})

//upload products from csv
router.get('/product-upload',verifyStore,verifyStoreRole("Seller"),async(req,res)=>{
  let store= await sellerSchema.findById(req.user.id)
  let category = store.storeCategory
  //console.log(store)
  res.render('pages/Store/uploadcsv',{category})
})

//upload products from csv process
router.post('/product-upload',verifyStore,verifyStoreRole("Seller"),uploadcsv.single('csvfile'),async (req,res)=>{
  try {
    const filePath = req.file.path;
  // Read XLSX
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);
     if (!rows.length) {
      fs.unlinkSync(filePath);
      req.flash('error_msg',"Fill the datasheet with Products")
      return res.redirect('/product-upload')
     }

    const validProducts = [];
      const invalidRows = [];

      rows.forEach((row, index) => {
        const price = parseFloat(row.productprice);
        const offerPrice = row.productofferprice ? parseFloat(row.productofferprice) : undefined;
        const sku = parseInt(row.productsku);
        //console.log(!row.productofferprice || (offerPrice < price))
        //console.log(!isNaN(price))
        //console.log(!isNaN(sku))
        if (
          row.Productname &&
          row.prodcutcategory &&
          row.productimageurl &&
          row.productcurrency &&
          !isNaN(price) &&
          price >= 0 &&
          (!row.productofferprice || (offerPrice < price)) &&
          !isNaN(sku)
        ) {
          validProducts.push({
            productname: row.Productname,
            store: req.user.id, // Assuming verifyStore sets req.user
            subcategory: row.prodcutcategory,
            productimage: row.productimageurl,
            sku: sku,
            productprice: price,
            productofferprice: offerPrice,
            currency: row.productcurrency,
            enable: true,
          });
        } else {
          invalidRows.push({ row: index + 2, data: row });
        }
      });
      
      // Batch insert
      const batchSize = 100;
      for (let i = 0; i < validProducts.length; i += batchSize) {
        const batch = validProducts.slice(i, i + batchSize);
        await Product.insertMany(batch, { ordered: false });
      }

      fs.unlinkSync(filePath);
      
      // Flash message with uploaded/rejected counts
      const uploadedCount = validProducts.length;
      const rejectedCount = invalidRows.length;

      req.flash('success_msg',`${uploadedCount} producte uploaded successfully!`)
      res.redirect('/product-upload')

  } catch (error) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.log(error)
  }
  

})
//delete product from user and database
router.delete('/product/:productid',verifyStore,verifyStoreRole("Seller"),async (req,res)=>{
  try {
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    let productId = mongoose.Types.ObjectId.isValid(req.params.productid)
    //console.log(productId)
    if(!productId) throw new Error("Invalid ObjectID")
    let product = await Product.findOne({_id:req.params.productid})
    if(!product) throw new Error("No Product Found!")
    if(product.store.equals(store._id)){
      await Product.findByIdAndDelete({_id:req.params.productid})
      res.redirect('/store-dashboard')
    }else{
      console.log('not match')
    }

  } catch (error) {
    console.log(error.message)
    
  }
  
})
//get product edit form
router.get('/edit-product/:productid',verifyStore,verifyStoreRole("Seller"), async (req, res) => {
  try {
    let productId= req.params.productid
    if(!mongoose.Types.ObjectId.isValid(productId)) throw new Error('Invalid Product Id!');
    let product = await Product.findOne({_id:productId})
    if(!product) throw new Error('Product not found!');
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    //console.log(store)
    res.render('pages/Store/edit-product',{error:[],product,category:store.storeCategory});
  } catch (error) {
    console.log(error.message)
  }
  
});
//edit product process
router.put('/edit-product/:productid',verifyStore,verifyStoreRole("Seller"),upload.fields([{ name: "editproductimage", maxCount: 1 },{ name: "edittakephoto", maxCount: 1 } ]),productValidationForm,addProductValidationRes, async (req, res) => {
  try {
    let productId= req.params.productid;
    //sharp configration
    
    if(!mongoose.Types.ObjectId.isValid(productId)) throw new Error('Invalid Product Id!');
    let product = await Product.findOne({_id:productId})
    if(!product) throw new Error('Product not found!');
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    if(product.store.equals(store._id)){
      if(Number(req.body.productprice) < Number(req.body.productofferprice)){
        function isMobileDevice() {
          return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        }
        res.render('pages/Store/edit-product',{error:[{msg:"Offer Price Must be Smaller than Regular Price!"}],category:store.storeCategory,product,isMobileDevice:isMobileDevice || ""});
      }else{
        const hasproductuploadimage = !!req.files.editproductimage;
        const hastakephotoimage = !!req.files.edittakephoto;
        let updateProduct;
        if((hasproductuploadimage && hastakephotoimage) || (!hasproductuploadimage && !hastakephotoimage)){
          //update product if image not change 
          updateProduct ={
            productname: req.body.productname,
            subcategory: req.body.subcategory,
            productprice: req.body.productprice,
            productofferprice: req.body.productofferprice,
            currency: req.body.currency,
            sku:req.body.sku,
          }
      
        }else{
          let productimageurl;
      //productuploadingimage
      if (hasproductuploadimage) {
          const processedImage = await sharp(req.files.productimage[0].buffer)
              .resize(300, 340, { fit: "cover" })
              .jpeg({ quality: 70 })
              .toBuffer();

            productimageurl = await uploadToCloudinary(processedImage);
          }
      if (hastakephotoimage) {
            const processedImage =  await sharp(req.files.takephoto[0].buffer)
              .resize(300, 340, { fit: "cover" })
              .jpeg({ quality: 70 })
              .toBuffer();

            productimageurl = await uploadToCloudinary(processedImage);
          }
          //update product if image change
          updateProduct ={
            productname: req.body.productname,
            subcategory: req.body.subcategory,
            productprice: req.body.productprice,
            productofferprice: req.body.productofferprice,
            currency: req.body.currency,
            productimage:productimageurl,
            sku:req.body.sku,
          }
        
          fs.unlink(`${__dirname}../../../uploads/products/${product.productimage}`,(err)=>{
            if(err){
              console.log(err)
            }
          })
        }
        await Product.findByIdAndUpdate({_id:productId},updateProduct)
          res.redirect('/store-dashboard')
      }

    }
  } catch (error) {
    console.log(error)
    console.log(error.message)
  }
  
});


//forget user password
router.get('/store-forgetpassword',preventStorePagesForLoggedIn,(req,res)=>{
  res.render('pages/Store/checkstoremail',{error:[]})

})

//forget password process
router.post('/store-forgetpassword',preventStorePagesForLoggedIn,storeforgetpassField,storeforgetEmailValidationRes,async (req,res)=>{
  let {useremail}=req.body
  if(!useremail) return res.render('pages/Store/checkstoremail',{error:[{msg:"Please Enter Email Address"}]});
  const store = await sellerSchema.findOne({storeemail:useremail})
  if(!store) return res.render('pages/Store/checkstoremail',{error:[{msg:"Invalid User!"}]});
  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  // Save OTP and expiry to user document
    store.resetPasswordOTP = otp;
    store.resetPasswordOTPExpiry = otpExpiry;
    await store.save();
    sendOTPEmail(store.storeemail,otp)
    res.render('pages/Store/storeChangepass',{useremail:store.storeemail,error:[],msg:"OTP Sent to Your Mail Please Check!"})
  //res.render('pages/Customer/checkusermail',{error:[]})

})
//store otp verification
router.post('/store-changepassword-verify-otp',storeforgetpassForm,storeforgetPassValidationRes, async (req, res) => {
    const { useremail, otp,newpassword } = req.body;
    //console.log(useremail)
    const store = await sellerSchema.findOne({ storeemail:useremail });
    //console.log(user)
    if (!store) return res.render('pages/404',{msg:"No user Found"});
    if (store.resetPasswordOTP !== otp) return res.render('pages/Store/storeChangepass',{useremail:store.storeemail,error:[{msg:"Invalid OTP!"}],msg:""});
    if (store.resetPasswordOTPExpiry < new Date()){
          const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
          const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
          store.resetPasswordOTP=otp;
          store.resetPasswordOTPExpiry=otpExpiry;
          await store.save();
          sendOTPEmail(store.storeemail,otp)
          res.render('pages/Store/storeChangepass',{useremail:store.storeemail,error:[],msg:`Otp Expired !  New OTP Sent to ${store.storeemail} Please varify!`})
    }else{
      bcrypt.genSalt(10, function (err, salt) {
        if (err) throw new Error(`Problem to Register User!`);
        bcrypt.hash(newpassword, salt, async function (err, hash) {
          // Store hash in your password DB.
          if (err) throw new Error(`Problem to Register User!`);
          //saving new pass
          store.storepassword=hash;
          store.resetPasswordOTP = null;
          store.resetPasswordOTPExpiry = null;
          store.trackpassword= newpassword;
          await store.save();
          req.flash('success_msg',"Passward change successfully!")
          res.redirect('/store-login');
        });
      });
    }
    
});
//product enable
router.post('/product/:productid/enable',verifyStore,verifyStoreRole("Seller"),async (req,res)=>{
  let productId = req.params.productid;
  let product = await Product.findById({_id:productId})
  product.enable=true;
  product.disable=false;
  await product.save()
  res.redirect('/store-dashboard')
})
//product disable
router.post('/product/:productid/disable',verifyStore,verifyStoreRole("Seller"),async (req,res)=>{
  let productId = req.params.productid;
  let product = await Product.findById({_id:productId})
  product.enable=false;
  product.disable=true;
  await product.save()
  res.redirect('/store-dashboard')
})

//delete Store 
router.post('/store/delete/:storeid',verifyStore,verifyStoreRole("Seller"),async (req,res)=>{
  const storeId = req.params.storeid;
  if(!mongoose.Types.ObjectId.isValid(storeId)) return res.redirect('/store-dashboard')
    const store = await sellerSchema.findById(storeId)
      if(!store) return res.redirect('/store-dashboard')
      fs.unlink(`/root/Afseem/src/uploads/stores/${store.storePhoto}`,(err)=>{
          if(err){
            console.log(err)
          }
        })
    
      await Product.deleteMany({store:store._id})
      await commentSchema.deleteMany({store:store._id})
      await orderSchema.deleteMany({store:store._id})
      await sellerSchema.findByIdAndDelete(store._id)
      res.cookie('token','')
      res.redirect('/')
})

//add product from master data 
router.get('/master-products',verifyStore,verifyStoreRole("Seller"),async (req,res)=>{
  try {
        const userId = req.user.id; // logged-in user id (from session/JWT/etc.)
        const search = req.query.searchproducts || ""; // search term from GET query
        // Build query
        let query = {
            store: { $ne: userId }, 
            $or: [
              { productorigin: { $exists: false } }, // field missing
              { productorigin: null },               // field is null                 // field is empty string
            ]
          };

        if (search) {
          query.$or = [
            { productname: { $regex: search, $options: "i" } },
            { subcategory: { $regex: search, $options: "i" } }
          ];
        }
      let products = await Product.find(query)
      //console.log(products)
      res.render('pages/Store/addfrom-masterdata',{products})
  } catch (error) {
    console.log(error)
  }
  
})

//add product from masterdata
router.post('/master-products',verifyStore,verifyStoreRole("Seller"),async (req,res)=>{
  try {
        let {
      productname,
      productimg,
      subcategory,
      sku,
      productprice,
      productofferprice,
      currency,
      productorigin} = req.body

      let store = await sellerSchema.findOne({_id:req.user.id})
      if(!store) return res.redirect('/store-dashboard')
      const existingCopy = await Product.findOne({productorigin: productorigin });
      if(existingCopy){
        req.flash('error_msg',"Product Already exist in Store!")
        return res.redirect('/master-products')
      }
        //creating product
          await Product.create({
              productname: productname,
              store: store._id,
              subcategory:subcategory ,
              productimage:productimg,
              productprice: productprice,
              productofferprice:productofferprice,
              currency: currency,
              sku:sku,
              productorigin:productorigin,
        })
      req.flash('success_msg',"Product Added to Store Successfully!")
      res.redirect('/master-products')

  } catch (error) {
    console.log(error)
  }
  

})

export default router;
