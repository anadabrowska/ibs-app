import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, message: string) {
  const port = parseInt(process.env.EMAIL_PORT || "465");
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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
