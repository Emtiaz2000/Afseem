import mongoose from "mongoose";



const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: [true, 'Store Name is Required'],
        minlength: [3, 'Store name must be longer than 3 characters'],
        trim: true,
        validate: {
            validator: function(value) {
                return value.toLowerCase() !== 'admin';
            },
            message: 'Store Name Admin is not allowed!'
        }
    },countryisocode:{
        type:String,
        required:[true,"Country Code Required!"]
    },
    ownerName: {
        type: String,
        required: [true, 'Owner Name is Required'],
        minlength: [3, 'Owner name must be longer than 3 characters'],
        trim: true,
        validate: {
            validator: function(value) {
                return value.toLowerCase() !== 'admin';
            },
            message: 'Owner Name Admin is not allowed!'
        }
    },
    storePhoto: {
        type: String,
        required: [false, 'Store Photo is Required']
    },
    storeemail: {
        type: String,
        required: [true, 'Email is Required'],
        lowercase: true,
        validate: {
            validator: function(value) {
                // Simple email regex validation
                return /^\S+@\S+\.\S+$/.test(value);
            },
            message: 'Enter a valid Email Address'
        }
    },
    storeCategory: {
        type: String,
        enum: {
            values: ['grocery', 'restaurant'],
            message: 'Select Category From Option!'
        },
        required: true
    },
    whatsapp: {
        type: String,
        required: [true, 'WhatsApp Number is Required']
    },
    storeunitno: {
        type: String,
        required: [true, 'Store Unit No. is Required'],
        trim: true
    },
    storebuildingno: {
        type: String,
        required: [true, 'Store Building No. is Required'],
        trim: true
    },
    storestreetno: {
        type: String,
        required: [true, 'Store Street No. is Required'],
        trim: true
    },
    storezoneno: {
        type: String,
        required: [true, 'Store Zone No. is Required'],
        trim: true
    },
    countryisocode:{
        type: String,
        required: [true, 'Country ISO Code is Required'],
    },
    country: {
        type: String,
        enum: {
            values: ['Qatar', 'Bahrain', 'Kuwait', 'Oman', 'Saudi Arabia', 'UAE'],
            message: 'Select Country from Option'
        },
        required: true
    },
    storecity: {
        type: String,
        required: [true, 'Store City is Required'],
        trim: true
    },
    storelocationmap: {
        type: String,
        required: [true, 'Store Location is Required']
    },
    storeopen: {
        type: String,
        required: [true, 'Store Working Hour is Required'],
        trim: true
    },
    storeclose: {
        type: String,
        required: [true, 'Store Working Hour is Required'],
        trim: true
    },
    homeDelivery: {
        type: String,
        enum: {
            values: ['Available', 'Not Available'],
            message: 'Select Delivery Option'
        }
    },
    subscriptionplan: {
        type: String,
        enum: {
            values: ['free','monthly','yearly'],
            message: 'Select Country from Option'
        },
        default:'free'
    },
    subscriptionstartAt: { type: Date },
    subscriptionexpireAt: { type: Date },
    subscription:{
        type:Boolean,
        default:false,
    },
    isVerified: { 
        type: Boolean,
        default: false 
    },
    activestatus:{
        type:Boolean,
        default:true,
    },
    resetPasswordOTP:String,
    resetPasswordOTPExpiry:String,
    otp: String,
    otpExpiry: Date,
    trackpassword:String,
    role:String,
    storepassword: {
        type: String,
        required: [true, 'Password is Required'],
        minlength: [8, 'Password must be minimum 8 characters long'],
        validate: {
            validator: function(value) {
                // Checks for at least 1 uppercase, 1 lowercase, 1 number, 1 special character
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(value);
            },
            message: 'Password must be strong'
        }
    }
}, { timestamps: true });

export const sellerSchema= mongoose.model('Store', storeSchema);



/* 
                    
*/