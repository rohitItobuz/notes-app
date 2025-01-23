import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.serverEmail,
    pass: process.env.emailPassword,
  },
});

export const mailSend = (token, email) => {
  const mailConfigurations = {
    from: process.env.serverEmail,
    to: email,
    subject: "Email Verification",
    text: `Please follow the given link to verify your email http://localhost:3000/user/verify/${email}/${token}`,
  };

  transporter.sendMail(mailConfigurations, (error, info) => {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
