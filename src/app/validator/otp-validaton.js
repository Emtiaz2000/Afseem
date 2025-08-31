import {body,validationResult} from 'express-validator'
import { userSchema } from '../modules/user/userSchema.js';
import { sellerSchema } from '../modules/shop/shopSchema.js';
export const otpValidationForm = [
  body("otpfromemail")
    .notEmpty().withMessage("OTP is required")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be exactly 6 characters')
    .isNumeric()
    .withMessage('OTP must be numbers only')
]

export const otpValidationFormSeller = [
  body("otpfromemail")
    .notEmpty().withMessage("OTP is required")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be exactly 6 characters')
    .isNumeric()
    .withMessage('OTP must be numbers only')
]

export const otpValidationFormAdmin = [
  body("otp")
    .notEmpty().withMessage("OTP is required")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be exactly 6 characters')
    .isNumeric()
    .withMessage('OTP must be numbers only')
]


export const otpValidationResSeller=async (req,res,next)=>{
    const error= validationResult(req);
    let user = await sellerSchema.findOne({storeemail:req.body.useremail})
    if(error.isEmpty()){
        next()
    }else{
        console.log(error.errors)
        res.render('pages/checkmail',{error:error.errors,useremail:user.storeemail,msg:`We have Send a OTP to ${user.storeemail} mail Please varify your OTP`});
    }
}
export const otpValidationRes=async (req,res,next)=>{
    const error= validationResult(req);
    let user = await userSchema.findOne({customeremail:req.body.useremail})
    if(error.isEmpty()){
        next()
    }else{
        console.log(error.errors)
        res.render('pages/checkmail',{error:error.errors,useremail:user.customeremail,msg:`We have Send a OTP to ${user.customeremail} mail Please varify your OTP`});
    }
}

export const adminOtpValidationRes=async (req,res,next)=>{
    const error= validationResult(req);
    if(error.isEmpty()){
        next()
    }else{
        console.log(error.errors)
        res.render('pages/Admin/confirmpass',{layout:'layouts/admin-layouts',error:error.errors,msg:`We have Send a OTP to Admin mail Please varify your OTP`})
    }
}