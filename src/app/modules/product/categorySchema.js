import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    "grocery":{
        type:Array,
    },
    "restaurent":{
        type:Array
    },
    "giftshop":{
        type:Array
    },

})

export const Category = mongoose.model("Category", categorySchema);