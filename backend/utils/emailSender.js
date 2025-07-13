import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,       
      pass: process.env.GMAIL_PASS,       
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};
