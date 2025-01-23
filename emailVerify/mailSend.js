import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohit@itobuz.com",
    pass: "oyls ajch qtfg axzv",
  },
});

export const mailSend = (token, email) => {
  const mailConfigurations = {
    from: "rohit@itobuz.com",
    to: email,
    subject: "Email Verification",
    text: `Please follow the given link to verify your email http://localhost:3000/user/verify/${token}`,
  };

  transporter.sendMail(mailConfigurations, (error, info) => {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
