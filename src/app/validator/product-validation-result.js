import {validationResult} from 'express-validator'
import { sellerSchema } from '../modules/shop/shopSchema.js';

export const addProductValidationRes=async (req,res,next)=>{
    const error= validationResult(req);
    let store = await sellerSchema.findOne({_id:res.locals.user.id})
    if(error.isEmpty()){
        next()
    }else{
        function isMobileDevice() {
            return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        }
        console.log(error.errors)
        res.render('pages/Store/add-product',{error:error.errors,succes_message:"",category:store.storeCategory,isMobileDevice:isMobileDevice || ''})
    }
}

