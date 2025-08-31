import {validationResult} from 'express-validator'
import {sellerSchema} from '../modules/shop/shopSchema.js'

export const storeRegistrationValidationRes=async (req,res,next)=>{
    
    const error= validationResult(req)
    let store = await sellerSchema.findOne({storeemail:req.body.storeemail})
    if(!store){
        if(error.isEmpty()){
        next()
        }else{
            //console.log(error.errors)
            res.render('pages/Store/store-registration',{error:error.errors})
        }
    }else{
         res.render('pages/Store/store-registration',{error:[{msg:"User Already Exist with this Mail!"}]})
    }
    
}

export const storeEditProfileValidationRes=async (req,res,next)=>{
    const error= validationResult(req)
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    if(error.isEmpty()){
        next()
    }else{
        //console.log(error.errors)
        res.render('pages/Store/store-edit-profile',{store,error:error.errors})
    }
}

export const storeforgetEmailValidationRes =async (req,res,next)=>{
    const error= validationResult(req)
    //console.log(res.locals.user)
    const store = await sellerSchema.findOne({storeemail:req.body.useremail})
    if(store){
        if(error.isEmpty()){
            next()
        }else{
            //console.log(error.errors)
            res.render('pages/Store/checkstoremail',{error:error.errors})
        }
    }else{
        res.render('pages/Store/checkstoremail',{error:[{msg:"Invalid User!"}]})
    }
}


export const storeforgetPassValidationRes =async (req,res,next)=>{
    const error= validationResult(req)
    //console.log(res.locals.user)
    const store = await sellerSchema.findOne({storeemail:req.body.useremail})
    if(store){
        if(error.isEmpty()){
            next()
        }else{
            //console.log(error.errors)
            res.render('pages/Store/storeChangepass',{useremail:store.storeemail,error:error.errors,msg:"Try Again!"})
        }
    }else{
        res.render('pages/Store/checkstoremail',{error:[{msg:"Invalid User!"}]})
    }
}
