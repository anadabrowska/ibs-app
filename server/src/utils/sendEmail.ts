import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, message: string) {
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: '"IBS-App" <ibs-app@example.com>', //TODO: maybe change later
    to: to,
    subject: subject,
    text: message,
    html: message,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
