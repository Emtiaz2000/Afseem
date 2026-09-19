import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
    adminemail: {
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
    trackpassword:String,
    adminpassword: {
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
    },
    resetPasswordOTP:{
        type:String,
        default:'',
    },
    resetPasswordOTPExpiry:{
        type:String,
        default:'',
    },
    role:String,
}, { timestamps: true });


export const adminSchema= mongoose.model('Admin', AdminSchema);