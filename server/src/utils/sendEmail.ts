import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, message: string) {
  // Only needed if you don't have a real mail account for testing
  // TODO: create real account later
  //   let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    // TODO: use real account later
    auth: {
      user: "rqk7b3qgj3di7ih4@ethereal.email",
      pass: "ajaHzFKDkvYKCwBfVN",
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
