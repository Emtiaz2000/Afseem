import {body} from 'express-validator'


export const storeValidationForm = [
    body('storeName')
        .notEmpty().withMessage('Store Name is Required')
        .isLength({min:3}).withMessage('Store name must be longer than 3 Character')
        .escape()
        .trim()
        ,
    body('ownerName')
        .notEmpty().withMessage('Owner Name is Required')
        .isLength({min:3}).withMessage('Owner name must be longer than 3 Character')
        .escape()
        .trim()
        ,
    body('storePhoto')
        /* .notEmpty()
        .withMessage('Store Photo is Required') */,
    body('storeemail')
        .notEmpty().withMessage('Email is Required')
        .isEmail()
        .withMessage("Enter Valid Email Address"),
    body('storeCategory')
        .isIn(['grocery','restaurant'])
        .withMessage('Select Category From Option!'),
    body('whatsapp')
        .notEmpty().withMessage('WhatsApp Number is Required')
        .isNumeric().withMessage('Only Numaric value is acceptable!')
        .isLength({min:8,max:8}).withMessage('Enter Valid Phone number'),
    body('storeunitno')
        .notEmpty().withMessage('Store Unit No. is Required')
        .isNumeric().withMessage('Unit No must be a Numaric value!')
        .trim(),
    body('storebuildingno')
        .notEmpty().withMessage('Store Building No. is Required')
        .isNumeric().withMessage('Building No must be a Numaric value!')
        .trim(),
    body('storestreetno')
        .notEmpty().withMessage('Store Street No. is Required')
        .isNumeric().withMessage('Street No must be a Numaric value!')
        .trim(),
    body('storezoneno')
        .notEmpty().withMessage('Store Zone No. is Required')
        .isNumeric().withMessage('Zone No must be a Numaric value!')
        .trim(),
    body('country')
        .isIn(['Qatar','Bahrain','Kuwait','Oman','Saudi Arabia','UAE'])
        .withMessage('Select Country from Option'),
    body('storecity')
        .notEmpty().withMessage('Store City is Required')
        .trim()
        .escape(),
    body('storelocationmap')
        .notEmpty().withMessage('Store Location is Required'),
    body('storeopen')
        .notEmpty().withMessage('Store Working Hour is Required')
        .trim(),
    body('storeclose')
        .notEmpty().withMessage('Store Working Hour is Required')
        .trim(),
    body('homeDelivery')
        .trim()
        .custom(value => {
            const allowed = ['Available', 'Not Available']; // exactly match your HTML values
            if (!allowed.includes(value)) {
            throw new Error('Select Delivery Option');
            }
            return true;
        }),
    body('storepassword')
        .notEmpty().withMessage('Password is Required')
        .isLength({min:8}).withMessage('Password must contain mininum 8 chars, at least one uppercase, at least one special character and one Number!')
        .isStrongPassword(),
]

export const storeEditForm = [
 body('storeName')
        .notEmpty().withMessage('Store Name is Required')
        .isLength({min:3}).withMessage('Store name must be longer than 3 Character')
        .escape()
        .trim()
        ,
    body('ownerName')
        .notEmpty().withMessage('Owner Name is Required')
        .isLength({min:3}).withMessage('Owner name must be longer than 3 Character')
        .escape()
        .trim()
        ,
    body('whatsapp')
        .notEmpty().withMessage('WhatsApp Number is Required')
        .isNumeric().withMessage('Only Numaric value is acceptable!')
        .isLength({min:8,max:8}).withMessage('Enter Valid Phone number'),
    body('storeunitno')
        .notEmpty().withMessage('Store Unit No. is Required')
        .isNumeric().withMessage('Unit No must be a Numaric value!')
        .trim(),
    body('storebuildingno')
        .notEmpty().withMessage('Store Building No. is Required')
        .isNumeric().withMessage('Building No must be a Numaric value!')
        .trim(),
    body('storestreetno')
        .notEmpty().withMessage('Store Street No. is Required')
        .isNumeric().withMessage('Street No must be a Numaric value!')
        .trim(),
    body('storezoneno')
        .notEmpty().withMessage('Store Zone No. is Required')
        .isNumeric().withMessage('Zone No must be a Numaric value!')
        .trim(),
    body('country')
        .isIn(['Qatar','Bahrain','Kuwait','Oman','Saudi Arabia','UAE'])
        .withMessage('Select Country from Option'),
    body('storecity')
        .notEmpty().withMessage('Store City is Required')
        .trim()
        .escape(),
    body('storelocationmap')
        .notEmpty().withMessage('Store Location is Required'),
    body('storeopen')
        .notEmpty().withMessage('Store Opening Hour is Required')
        .trim(),
    body('storeclose')
        .notEmpty().withMessage('Store Closing Hour is Required')
        .trim(),
    body('homeDelivery')
        .trim()
        .custom(value => {
            const allowed = ['Available', 'Not Available']; // exactly match your HTML values
            if (!allowed.includes(value)) {
            throw new Error('Select Delivery Option');
            }
            return true;
        }),
]

export const storeforgetpassField = [
    body('useremail')
        .notEmpty().withMessage('Email is Required')
        .isEmail()
        .withMessage("Enter Valid Email Address")
        .normalizeEmail()
        ,
]


export const storeforgetpassForm = [
    body('useremail')
        .notEmpty().withMessage('Email is Required')
        .isEmail()
        .withMessage("Enter Valid Email Address")
        .normalizeEmail(),
    
    body('otp')
    .notEmpty().withMessage("Product Name is required")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage('OTP must be exactly 6 characters')
    .isNumeric()
    .withMessage('OTP must be numbers only'),

    body('newpassword')
        .notEmpty().withMessage('Password is Required')
        .isLength({min:8}).withMessage('Password must contain mininum 8 chars, at least one uppercase, at least one special character and one Number!')
        .isStrongPassword(),
]
