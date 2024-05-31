import * as nm from 'nodemailer';
const sendVerificationEmail = async (email: string, verificationToken: string) => {
  const transporter = nm.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_APP_EMAIL,
      pass: process.env.NODEMAILER_APP_PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.NODEMAILER_APP_EMAIL,
    to: email,
    subject: 'Please Verify email to Sign in into our app',
    html: `<a href="${process.env.DEPLOYED_URL}/verification?token=${verificationToken}">Click here to verify your email</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error;
    }
    return info.response;
  });
};

export { sendVerificationEmail };
