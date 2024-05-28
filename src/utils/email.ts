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
    from: 'daffaputranarendra9@gmail.com',
    to: 'reqyan1103@gmail.com',
    subject: 'Please Verify email to Sign in into our app',
    html: `<a href="http://localhost:3000/verification?token=${verificationToken}">Click here to verify your email</a>`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return false;
    } else {
      return true;
    }
  });
};

export { sendVerificationEmail };
