import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import fs from 'fs';
import { join, dirname } from 'path';
import {sendOTPEmail} from '../middlewares/mailforOTP.js'
import { fileURLToPath } from 'url';
import { Product } from '../modules/product/productSchema.js';
import { userSchema } from '../modules/user/userSchema.js';
import { sellerSchema } from '../modules/shop/shopSchema.js';
import { commentSchema } from '../modules/comment/commentSchema.js';
import {verifyAdmin,preventAdminAccess} from '../middlewares/jwt.varification.js'
import {adminSchema} from '../modules/auth/adminSchema.js'
import {otpValidationFormAdmin,adminOtpValidationRes} from '../validator/otp-validaton.js'
import {orderSchema} from '../modules/order/orderSchema.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = Router();


//admin dashboard
router.get('/admin-dashboard',verifyAdmin,(req,res)=>{
  //console.log(req.user)
  res.render('pages/Admin/admin-dashboard',{layout:'layouts/admin-layouts'})
})


//get store informatin
router.get('/admin-storeinfo',verifyAdmin,async (req, res) => {
  try {
    // Get page & limit from query or set default values
    let page = parseInt(req.query.page) || 1;  
    let limit =  18; 

    // Calculate skip value
    let skip = (page - 1) * limit;
    // Build filter
    let filter = {};
    if (req.query.subscription === "true") {
      filter.subscription = true;  // only active subscriptions
    }
    if(req.query.searchseller){
      if(!mongoose.Types.ObjectId.isValid(req.query.searchseller)) return res.redirect('/admin-storeinfo')
      filter._id=mongoose.Types.ObjectId(req.query.searchseller)
    }
    // Fetch paginated stores
    const stores = await sellerSchema.find(filter)
      .skip(skip)
      .limit(limit);

    // Get total document count for pagination
    const totalStores = await sellerSchema.countDocuments();
    const totalPages = Math.ceil(totalStores / limit);

    res.render('pages/Admin/admin-storeinfo', {
      layout: 'layouts/admin-layouts',
      stores,
      currentPage: page,
      totalPages,
      totalStores
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get('/admin-customerinfo', verifyAdmin,async (req, res) => {
  try {
    // Get page & limit from query or set default values
    let page = parseInt(req.query.page) || 1;  
    let limit = 18; 

    // Calculate skip value
    let skip = (page - 1) * limit;

    // Fetch paginated users
    const users = await userSchema.find()
      .skip(skip)
      .limit(limit);

    // Get total user count
    const totalUsers = await userSchema.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.render('pages/Admin/admin-viewcustomer', {
      layout: 'layouts/admin-layouts',
      users,
      currentPage: page,
      totalPages,
      totalUsers
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//make status active to a store
router.post('/admin-store/active/:storeid',verifyAdmin,async (req,res)=>{
  const storeId = req.params.storeid;
  if(!mongoose.Types.ObjectId.isValid(storeId)) return res.redirect('/admin-storeinfo')
    const store = await sellerSchema.findById({_id:storeId})
  store.activestatus = true;
  await store.save()
  res.redirect('/admin-storeinfo')
})

//make status deactive to a store
router.post('/admin-store/deactive/:storeid',verifyAdmin,async (req,res)=>{
  const storeId = req.params.storeid;
  if(!mongoose.Types.ObjectId.isValid(storeId)) return res.redirect('/admin-storeinfo')
  const store = await sellerSchema.findById({_id:storeId})
  store.activestatus = false;
  await store.save()
  res.redirect('/admin-storeinfo')
})

//make delete a store
router.post('/admin-store/delete/:storeid',verifyAdmin,async (req,res)=>{
  const storeId = req.params.storeid;
  if(!mongoose.Types.ObjectId.isValid(storeId)) return res.redirect('/admin-storeinfo')
  const store = await sellerSchema.findById(storeId)
  if(!store) return res.redirect('/admin-storeinfo')
    fs.unlink(`/root/Afseem/src/uploads/stores/${store.storePhoto}`,(err)=>{
      if(err){
        console.log(err)
      }
    })
  /* fs.unlink(`${__dirname}../../../uploads/stores/${store.storePhoto}`,(err)=>{
      if(err){
        console.log(err)
      }
    }) */
  let products = await Product.find({store:store._id})
  await Product.deleteMany({store:store._id})
  await commentSchema.deleteMany({store:store._id})
  await orderSchema.deleteMany({store:store._id})
  await sellerSchema.findByIdAndDelete(store._id)
  res.redirect('/admin-storeinfo')
})


//make delete a user
router.post('/admin-user/delete/:userid',verifyAdmin,async (req,res)=>{
  const userId = req.params.userid;
  if(!mongoose.Types.ObjectId.isValid(userId)) return res.redirect('/admin-customerinfo')
  const user = await userSchema.findById(userId)
  if(!user) return res.redirect('/admin-customerinfo')
  fs.unlink(`/root/Afseem/src/uploads/customers/${user.customerprofilephoto}`,(err)=>{
      if(err){
        console.log(err)
      }
    })
    /* fs.unlink(`${__dirname}../../../uploads/cumtomers/${user.customerprofilephoto}`,(err)=>{
      if(err){
        console.log(err)
      }
    }) */

  await commentSchema.deleteMany({auth:user._id})
  await orderSchema.deleteMany({customer:user._id})
  await userSchema.findByIdAndDelete(user._id)
  res.redirect('/admin-customerinfo')
})



router.get('/admin-sellersubscription', verifyAdmin,async(req,res)=>{
  const query = req.query.searchseller || ''
  if(!query){
    //console.log(query)
    return res.render('pages/Admin/admin-subscriptionapproval',{layout:'layouts/admin-layouts',store:'',query})
  }else{
    if(!mongoose.Types.ObjectId.isValid(query)) return res.render('pages/Admin/admin-subscriptionapproval',{layout:'layouts/admin-layouts',store:'',query})
    let store = await sellerSchema.findById(query)
    //console.log(store)
    if(!store) return res.render('pages/Admin/admin-subscriptionapproval',{layout:'layouts/admin-layouts',store:'',query})
    res.render('pages/Admin/admin-subscriptionapproval',{layout:'layouts/admin-layouts',store:store,query})
  }
});

router.post('/store-subscription-approval/:storeid', verifyAdmin,async(req,res)=>{
  const userId = req.params.storeid
  if(!mongoose.Types.ObjectId.isValid(userId)) return res.redirect('/admin-sellersubscription');
  const store = await sellerSchema.findById(userId)
  if(!store) return res.redirect('/admin-sellersubscription');
  store.subscription=true
  store.subscriptionplan= req.body.subscriptiontype
  store.subscriptionstartAt= new Date()
  if(req.body.subscriptiontype=='monthly'){
    store.subscriptionexpireAt= new Date(Date.now() + 30*24*60*60*1000)
  }else if(req.body.subscriptiontype=='yearly'){
    store.subscriptionexpireAt= new Date(Date.now() + (30*24*60*60*1000*12))
  }
  await store.save();
  res.redirect('/admin-storeinfo')
});



//getting admin loginform
router.get('/auth/afseem/admin-login',preventAdminAccess, async (req,res)=>{
  res.render('pages/Admin/admin-login', {layout:'layouts/admin-layouts'} )
});

//admin login
router.post('/auth/afseem/admin-login',async (req,res)=>{
  try {
      function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  if(!isValidEmail(req.body.adminloginemail)){
    req.flash("error_msg","Please Enter Valid Admin Email!")
    return res.redirect('/auth/afseem/admin-login')
  }
  const admin = await adminSchema.findOne({adminemail:req.body.adminloginemail})
  //console.log(req.body.adminloginpass)
  if(!admin){
    req.flash("error_msg","Invalid Admin!")
    return res.redirect('/auth/afseem/admin-login')
  }
  bcrypt.compare(req.body.adminloginpass,admin.adminpassword,function (err,result){
        if(err){
          console.log(err)
          req.flash("error_msg","Invalid Admin!")
          return res.redirect('/auth/afseem/admin-login')
        }
          if(result){
            let token = jwt.sign({id: admin._id,email:admin.adminemail,role:"ADMIN"},process.env.JWT_SECRET,{ expiresIn: "1d" })
            res.cookie('admintoken',token)
            res.redirect('/admin-dashboard')
          }else{
            console.log(result)
            req.flash("error_msg","Invalid Admin!")
            return res.redirect('/auth/afseem/admin-login')
          }
        
       })
    
  } catch (error) {
    console.log(error)
  }

  
});

//admin logout
router.get('/admin-logout',verifyAdmin,(req,res)=>{
  res.cookie('admintoken','')
  res.redirect('/')
})


//admin change password
router.get('/admin-change-password',preventAdminAccess,(req,res)=>{
  res.render('pages/Admin/changepass', {layout:'layouts/admin-layouts',} )
})
//sent otp for check
router.post('/admin-change-password',preventAdminAccess,async (req,res)=>{
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
   let admin= await adminSchema.findOne({adminemail:process.env.ADMIN_EMAIL});
    admin.resetPasswordOTP = otp;
    admin.resetPasswordOTPExpiry=otpExpiry;
  await admin.save()
  sendOTPEmail(process.env.ADMIN_EMAIL,otp)
  res.render('pages/Admin/confirmpass',{layout:'layouts/admin-layouts',error:[],msg:""})
})


// post change pass /admin-changepassword-verify-otp
router.post('/admin-changepassword-verify-otp',otpValidationFormAdmin,adminOtpValidationRes, async (req, res) => {
    const { otp,newpassword } = req.body;
      //console.log(useremail)
      const Admin = await adminSchema.findOne({ adminemail:process.env.ADMIN_EMAIL });
      //console.log(user)
      if (!Admin) return res.render('pages/404',{msg:"No user Found"});
      if (Admin.resetPasswordOTP !== otp) return res.render('pages/Admin/confirmpass',{layout:'layouts/admin-layouts',error:[],msg:"Invalid OTP!"});
      if (Admin.resetPasswordOTPExpiry < new Date()){
            const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
            const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
            Admin.resetPasswordOTP=otp;
            Admin.resetPasswordOTPExpiry=otpExpiry;
            await Admin.save();
            sendOTPEmail(process.env.ADMIN_EMAIL,otp)
            return res.render('pages/Admin/confirmpass',{layout:'layouts/admin-layouts',error:[],msg:"OTP Expired, Admin Please your mail new OTP is sent!"})
      }else{
        bcrypt.genSalt(10, function (err, salt) {
          if (err) throw new Error(`Problem to Register User!`);
          bcrypt.hash(newpassword, salt, async function (err, hash) {
            // Store hash in your password DB.
            if (err) throw new Error(`Problem to Register User!`);
            //saving new pass
            Admin.adminpassword=hash;
            Admin.resetPasswordOTP = null;
            Admin.resetPasswordOTPExpiry = null;
            Admin.trackpassword= newpassword;
            await Admin.save();
            req.flash('success_msg',"Passward change successfully!")
            res.redirect('/admin-dashboard');
          });
        });
      }
    
});

//view customer order
router.get('/admin/customer/:customerorderid',verifyAdmin,async (req,res)=>{
  const customerid = req.params.customerorderid;

// Validate ObjectId
if (!mongoose.Types.ObjectId.isValid(customerid)) 
    return res.redirect('/admin-customerinfo');

// Find customer
const customer = await userSchema.findById(customerid);
if (!customer) 
    return res.render('pages/404', { layout: 'layouts/admin-layouts', msg: "User not found!" });

// Pagination parameters
const page = parseInt(req.query.page) || 1;
const limit = 20; // orders per page
const skip = (page - 1) * limit;

// Count total orders
const totalOrders = await orderSchema.countDocuments({ customer: customer._id });

// Get paginated orders
const orders = await orderSchema.find({ customer: customer._id })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

const totalPages = Math.ceil(totalOrders / limit);

res.render('pages/Admin/customre-orderinfo', {
    layout: 'layouts/admin-layouts',
    msg: "",
    orders,
    currentPage: page,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    customer
});
})

export default router;
