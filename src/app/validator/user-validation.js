import {body} from 'express-validator'


export const userValidationForm = [
    body('customerusername')
        .notEmpty().withMessage('Store Name is Required')
        .isLength({min:3}).withMessage('Store name must be longer than 3 Character')
        .trim()
        ,
    body('customerprofilephoto')
        /* .notEmpty()
        .withMessage('Store Photo is Required') */,
    body('customeremail')
        .notEmpty().withMessage('Email is Required')
        .isEmail()
        .withMessage("Enter Valid Email Address")
        ,
    body('customerwhatsapp')
        .notEmpty().withMessage('WhatsApp Number is Required')
        .isNumeric().withMessage('Only Numaric value is acceptable!')
        .isLength({min:8,max:8}).withMessage('Enter Valid Phone number'),
    body('customerunitno')
        .notEmpty().withMessage('Store Unit No. is Required')
        .isNumeric().withMessage('Unit No No must be a Numaric value !')
        .trim(),
    body('customerbuildingno')
        .notEmpty().withMessage('Store Building No. is Required')
        .isNumeric().withMessage('Building No must be a Numaric value !')
        .trim(),
    body('customerstreetno')
        .notEmpty().withMessage('Store Street No. is Required')
        .isNumeric().withMessage('Street No must be a Numaric value !')
        .trim(),
    body('customerzoneno')
        .notEmpty().withMessage('Store Zone No. is Required')
        .isNumeric().withMessage('Zone must be a Numaric value !')
        .trim(),
    body('customercountry')
        .isIn(['Qatar','Bahrain','Kuwait','Oman','Saudi Arabia','UAE'])
        .withMessage('Select Country from Option'),
    body('customercity')
        .notEmpty().withMessage('Store City is Required')
        .trim(),
    body('customerlocation')
        .notEmpty().withMessage('Please Select Location!')
        .trim()
        .escape()
    ,
    body('customerpassword')
        .notEmpty().withMessage('Password is Required')
        .isLength({min:8}).withMessage('Password must contain mininum 8 chars, at least one uppercase, at least one special character and one Number!')
        .isStrongPassword(),
]

export const userEditValidationForm = [
    body('customerusername')
        .notEmpty().withMessage('Store Name is Required')
        .isLength({min:3}).withMessage('Store name must be longer than 3 Character')
        .trim()
        ,
    body('customerprofilephoto')
        /* .notEmpty()
        .withMessage('Store Photo is Required') */,
    body('customerwhatsapp')
        .notEmpty().withMessage('WhatsApp Number is Required')
        .isNumeric().withMessage('Only Numaric value is acceptable!')
        .isLength({min:8,max:8}).withMessage('Enter Valid Phone number'),
    body('customerunitno')
        .notEmpty().withMessage('Store Unit No. is Required')
        .isNumeric().withMessage('Unit No No must be a Numaric value !')
        .trim(),
    body('customerbuildingno')
        .notEmpty().withMessage('Store Building No. is Required')
        .isNumeric().withMessage('Building No must be a Numaric value !')
        .trim(),
    body('customerstreetno')
        .notEmpty().withMessage('Store Street No. is Required')
        .isNumeric().withMessage('Street No must be a Numaric value !')
        .trim(),
    body('customerzoneno')
        .notEmpty().withMessage('Store Zone No. is Required')
        .isNumeric().withMessage('Zone must be a Numaric value !')
        .trim(),
    body('customercountry')
        .isIn(['Qatar','Bahrain','Kuwait','Oman','Saudi Arabia','UAE'])
        .withMessage('Select Country from Option'),
    body('customercity')
        .notEmpty().withMessage('Store City is Required')
        .trim()
        ,
    body('customerlocation')
        .notEmpty().withMessage('Please Select Location!')
        .trim()
        .escape()
    ,
]


export const forgetpassField = [
    body('useremail')
        .notEmpty().withMessage('Email is Required')
        .isEmail()
        .withMessage("Enter Valid Email Address")
        ,
]


export const forgetpassForm = [
    body('useremail')
        .notEmpty().withMessage('Email is Required')
        .isEmail()
        .withMessage("Enter Valid Email Address")
        ,
    
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

