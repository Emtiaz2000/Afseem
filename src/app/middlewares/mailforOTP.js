import nodemailer from 'nodemailer';

export const sendOTPEmail = async (email, otp)=> {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any email service
        auth: {
            user: process.env.OTP_SENT_MAIL,
            pass: process.env.OTP_SENT_MAIL_PASS // or app password
        }
    });

    const mailOptions = {
        from: process.env.VERIFICATION_EMAIL || process.env.OTP_SENT_MAIL,
        to: email,
        subject: 'Afseem.Com – Verify Your Account',
        text: `Your OTP for account verification is ${otp}. It will expire in 5 minutes.`
    };

    await transporter.sendMail(mailOptions);
}