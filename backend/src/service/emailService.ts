import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import { getAppPassword } from "../utils/getEnv.js";

function genrateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sentOtpEmail = async (email: string, otpCode: string) => {
  try {
    //email that use to send
    const appPassword = getAppPassword();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "momentum.v0@gmail.com",
        pass: appPassword,
      },
    });

    // email message
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const mailOptions = {
      from: '"Momentum" momentum.v0@gmail.com',
      to: email,
      subject: "Your Verification Code (OTP)",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
      <img src="cid:logo_id" alt="Logo" style="width: 50px; margin: 0 auto 10px auto; display: block;"/>
          <h2>Verify Your Emaill Address</h2>
          <p>Your OTP code for registration is:</p>
          <h1 style="color: #111111; letter-spacing: 5px;">${otpCode}</h1>
          <p>this code will expire in <b>5 minutes</b></p>
          <p>If you did not request this code, please igrone this email.</p>
        </div>
      `,
      attachments: [
        {
          filename: "logo-momentum-black.png",
          path: path.join(__dirname, "../assets/logo-momentum-black.png"),
          cid: "logo_id",
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Failed to send email", error);
    return false;
  }
};

export { sentOtpEmail, genrateOtp };
