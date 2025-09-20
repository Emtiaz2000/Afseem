import {validationResult} from 'express-validator'
import { sellerSchema } from '../modules/shop/shopSchema.js';
import { Category } from '../modules/product/categorySchema.js';

export const addProductValidationRes=async (req,res,next)=>{
    const error= validationResult(req);
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    let storecategory = store.storeCategory;
    let oldData= req.body
    if(error.isEmpty()){
        next()
    }else{
        function isMobileDevice() {
            return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        }
        let categories = await Category.find()
        let subcategories;
        if(storecategory == 'grocery'){
        subcategories = categories[0].grocery
        }else if(storecategory == 'restaurent'){
        subcategories=categories[0].restaurent
        }
        res.render('pages/Store/add-product',{subcategories,oldData,error:error.errors,succes_message:"",category:store.storeCategory,isMobileDevice:isMobileDevice || ''})
    }
}

export const editProductValidationRes=async (req,res,next)=>{
    const error= validationResult(req);
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    //console.log()
    if(error.isEmpty()){
        next()
    }else{
        req.flash('error_msg',error.errors[0].msg)
        res.redirect(`/edit-product/${req.params.productid}`)
    }
}