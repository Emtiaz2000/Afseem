import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    customerusername: {
        type: String,
        required: [true, 'Name is Required'],
        minlength: [3, 'Name must be longer than 3 characters'],
        trim: true,
        validate: {
            validator: function(value) {
                return value.toLowerCase() !== 'admin';
            },
            message: 'Name Admin is not allowed!'
        }
    },
    customerprofilephoto: {
        type: String,
        required: [false, 'Store Photo is Required']
    },
    customeremail: {
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
    countryisd:{
        type: String,
        required: [true, 'WhatsApp Number is Required']
    },
    customerwhatsappnumber:{
        type: Number,
        required: [true, 'WhatsApp Number is Required']
    },
    customerwhatsapp: {
        type: String,
        required: [true, 'WhatsApp Number is Required']
    },
    customerunitno: {
        type: String,
        required: [true, 'Store Unit No. is Required'],
        trim: true
    },
    customerbuildingno: {
        type: String,
        required: [true, 'Store Building No. is Required'],
        trim: true
    },
    customerstreetno: {
        type: String,
        required: [true, 'Store Street No. is Required'],
        trim: true
    },
    customerzoneno: {
        type: String,
        required: [true, 'Store Zone No. is Required'],
        trim: true
    },
    customercountry: {
        type: String,
        enum: {
            values: ['Qatar', 'Bahrain', 'Kuwait', 'Oman', 'Saudi Arabia', 'UAE'],
            message: 'Select Country from Option'
        },
        required: true
    },
    customercity: {
        type: String,
        required: [true, 'Store City is Required'],
        trim: true
    },
    customerlocation: {
        type: String,
        required: [true, 'Map Location is Required'],
        trim: true
    },
    trackpassword:String,
    isVerified: { 
        type: Boolean,
        default: false 
    },
    resetPasswordOTP:String,
    resetPasswordOTPExpiry:String,
    otp: String,
    otpExpiry: Date,
    role:String,
    customerpassword: {
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

export const userSchema= mongoose.model('Customer', customerSchema);