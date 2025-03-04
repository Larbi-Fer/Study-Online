import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export async function sendEmailVerification(to: string, code: number, fullname: string) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Verification",
      html: EmailForm({code, fullname})
    });
    return info
  } catch (error) {
    console.error(error);
  }

}

const EmailForm = ({ code, fullname }) => {
  return (
    `<div style="width: 100%; max-width: 600px; margin: auto;">
      <h1 style="text-align: center;">Verify Your E-mail Address</h1>
      <h3>Hi, ${fullname}</h3>
      <p>You're almost ready to get started, Please copy the code below to verify your email address:</p>
      <div>
        <b style="display: block; text-align: center; margin: auto; width: max-content; padding: 5px 25px; background: #eee; border-radius: 5px; font-size: 15px;">${code}</b>
      </div>
    </div>`
  )
}