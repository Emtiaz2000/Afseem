import nodemailer from 'nodemailer';

export const sendOTPEmail = async (email, otp)=> {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any email service
        auth: {
            user: 'emtiazemon0@gmail.com',
            pass: 'jafxppvzbbiujrfv' // or app password
        }
    });

    const mailOptions = {
        from: 'emtiazemon0@gmail.com',
        to: email,
        subject: 'Verify your account',
        text: `Your OTP for account verification is ${otp}. It will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
}