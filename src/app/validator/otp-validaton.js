
import { body, validationResult } from 'express-validator';
import { userSchema } from '../modules/user/userSchema.js';
import { sellerSchema } from '../modules/shop/shopSchema.js';

// =========================
// OTP VALIDATION RULES
// =========================

const otpRules = (field) => [
    body(field)
        .isString()
        .withMessage('OTP must be a valid string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('OTP is required')
        .bail()
        .matches(/^\d{6}$/)
        .withMessage('OTP must be exactly 6 digits')
];

export const otpValidationForm = otpRules('otpfromemail');

export const otpValidationFormSeller = otpRules('otpfromemail');

export const otpValidationFormAdmin = otpRules('otp');


// =========================
// CUSTOMER OTP VALIDATION RESPONSE
// =========================

export const otpValidationRes = async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    try {
        const user = await userSchema.findOne({
            customeremail: req.body.useremail
        });

        console.log(errors.array());

        return res.status(422).render('pages/checkmail', {
            error: errors.array(),
            useremail: user?.customeremail || req.body.useremail || '',
            msg: user
                ? `We have sent an OTP to ${user.customeremail} mail. Please verify your OTP.`
                : 'Unable to find your registered email address. Please try again.'
        });

    } catch (error) {
        next(error);
    }
};


// =========================
// SELLER OTP VALIDATION RESPONSE
// =========================

export const otpValidationResSeller = async (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    try {
        const user = await sellerSchema.findOne({
            storeemail: req.body.useremail
        });

        console.log(errors.array());

        return res.status(422).render('pages/checkmail', {
            error: errors.array(),
            useremail: user?.storeemail || req.body.useremail || '',
            msg: user
                ? `We have sent an OTP to ${user.storeemail} mail. Please verify your OTP.`
                : 'Unable to find your registered email address. Please try again.'
        });

    } catch (error) {
        next(error);
    }
};


// =========================
// ADMIN OTP VALIDATION RESPONSE
// =========================

export const adminOtpValidationRes = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }

    console.log(errors.array());

    return res.status(422).render('pages/Admin/confirmpass', {
        layout: 'layouts/admin-layouts',
        error: errors.array(),
        msg: 'We have sent an OTP to the admin email. Please verify your OTP.'
    });
};
