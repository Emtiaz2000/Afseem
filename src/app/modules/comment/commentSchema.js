import mongoose from "mongoose";

const userCommentSchema = new mongoose.Schema({
     store: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Store", // must match the model name of your Store schema
           required: true,
         },
    authname:{
        type:String,
        required:true
    },
    auth: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "Customer", // must match the model name of your Store schema
           required: true,
         },
    comment:{
        type:String,
        required:[true,"You need to Write Comment before Posting"]
    },
    stars:{
        type:Number,
        required:true
    }
    
    
}, { timestamps: true });

export const commentSchema= mongoose.model('Comment', userCommentSchema);