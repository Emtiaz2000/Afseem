import nodemailer from 'nodemailer';

const createTransporter = () => {
  const email = process.env.OTP_SENT_MAIL;
  const password = process.env.OTP_SENT_MAIL_PASS;

  // Log only whether credentials exist. Never log passwords.
  console.log('SMTP user configured:', Boolean(email));
  console.log('SMTP password configured:', Boolean(password));

  if (!email || !password) {
    throw new Error(
      'SMTP credentials missing. Check OTP_SENT_MAIL and OTP_SENT_MAIL_PASS in .env'
    );
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: email,
      pass: password
    }
  });
};

export const sendOTPEmail = async (email, otp) => {
  try {
    if (!email || !otp) {
      throw new Error('Recipient email and OTP are required');
    }

    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: {
        name: 'Afseem.Com',
        address: process.env.OTP_SENT_MAIL
      },
      to: email,
      subject: 'Afseem.Com – Verify Your Account',
      text: `Your Afseem verification OTP is ${otp}. It will expire in 5 minutes.`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:25px;">
          <h2 style="color:#F15A24;">Welcome to Afseem.Com!</h2>
          <p>Your verification OTP is:</p>
          <h1 style="color:#F15A24;letter-spacing:8px;">${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
          <p>Please do not share this OTP with anyone.</p>
        </div>
      `
    });

    console.log('OTP Email Sent Successfully!');
    console.log('Recipient:', email);
    console.log('Message ID:', info.messageId);

    return info;

  } catch (error) {
    console.error('OTP EMAIL ERROR:', error.message);
    throw error;
  }
};