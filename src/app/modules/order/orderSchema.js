import mongoose from "mongoose";

const userOrderSchema = new mongoose.Schema({
     store: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Store", // must match the model name of your Store schema
           required: true,
         },
    customer: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Customer", // must match the model name of your Store schema
           required: true,
         },
    grandtotal:{
        type:Number,
        required:[true,"You need to Send Number in grand Total"]
    },
    currency:{
        type:String,
        required:true
    },
    storecategory:{
        type:String,
        required:true
    },
    productsname:{
        type:Array,
        required:true
    },
    productsid:{
        type:Array,
        required:true
    },
    productsprices:{
        type:Array,
        required:true
    },
    productsquantities:{
        type:Array,
        required:true
    },
    
    
}, { timestamps: true });

export const orderSchema= mongoose.model('Order', userOrderSchema);