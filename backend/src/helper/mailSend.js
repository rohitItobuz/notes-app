import dotenv from "dotenv";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.serverEmail,
    pass: process.env.emailPassword,
  },
});

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extName: ".hbs",
      partialsDir: "./src/views/",
      layoutsDir: "./src/views/",
      defaultLayout: "",
    },
    viewPath: "./src/views/",
    extName: ".hbs",
  })
);

export const mailSend = async(token, email) => {
  const mailConfigurations = {
    from: process.env.serverEmail,
    to: email,
    subject: "Email Verification",
    template: "emailFormat",
    context: {
      token: token,
    },
  };

  transporter.sendMail(mailConfigurations, (error) => {
    if (error) throw Error(error);
  });
};
