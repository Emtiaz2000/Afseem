import {validationResult} from 'express-validator'
import {userSchema} from '../modules/user/userSchema.js'

export const userRegistrationValidationRes=async (req,res,next)=>{
    const error= validationResult(req)
    const user = await userSchema.findOne({customeremail:req.body.customeremail})
    if(!user){
        if(error.isEmpty()){
            next()
        }else{
            //console.log(error.errors)
            res.render('pages/Customer/customer-registration',{error:error.errors})
        }
    }else{
        res.render('pages/Customer/customer-registration',{error:[{msg:"User Already Exist with this mail!"}]})
    }
    
}


export const userEditFormValidationRes=async (req,res,next)=>{
    const error= validationResult(req)
    //console.log(res.locals.user)
    const user = await userSchema.findOne({customeremail:res.locals.user.email})
    //console.log(user)
    if(user){
        if(error.isEmpty()){
            next()
        }else{
            //console.log(error.errors)
            res.render('pages/Customer/customer-edit-profile',{user,error:error.errors})
        }
    }else{
        res.redirect('/profile')
    }
    
}

export const forgetEmailValidationRes =async (req,res,next)=>{
    const error= validationResult(req)
    //console.log(res.locals.user)
    const user = await userSchema.findOne({customeremail:req.body.useremail})
    if(user){
        if(error.isEmpty()){
            next()
        }else{
            //console.log(error.errors)
            res.render('pages/Customer/checkusermail',{error:error.errors})
        }
    }else{
        res.render('pages/Customer/checkusermail',{error:[{msg:"Invalid User!"}]})
    }
}


export const forgetPassValidationRes =async (req,res,next)=>{
    const error= validationResult(req)
    //console.log(res.locals.user)
    const user = await userSchema.findOne({customeremail:req.body.useremail})
    if(user){
        if(error.isEmpty()){
            next()
        }else{
            //console.log(error.errors)
            res.render('pages/Customer/changepassword',{useremail:user.customeremail,error:error.errors,msg:"Try Again!"})
        }
    }else{
        res.render('pages/Customer/checkusermail',{error:[{msg:"Invalid User!"}]})
    }
}
