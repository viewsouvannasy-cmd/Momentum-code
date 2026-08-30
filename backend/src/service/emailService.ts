import sgMail from "../config/sendGrid.js";
import { getClientHost, getServerHost } from "../utils/getEnv.js";

function genrateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const sentOtpEmail = async (email: string, otpCode: string) => {
  try {
    // email message
    const msg = {
      to: email,

      from: {
        email: "momentum.v0@gmail.com",
        name: "Momentum",
      },
      subject: "Your Verification Code (OTP)",
      html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
      <img src="${getServerHost()}/public/logo-momentum-black.png" alt="Logo" style="width: 50px; margin: 0 auto 10px auto; display: block;"/>
          <h2>Verify Your Emaill Address</h2>
          <p>Your OTP code for registration is:</p>
          <h1 style="color: #111111; letter-spacing: 5px;">${otpCode}</h1>
          <p>this code will expire in <b>5 minutes</b></p>
          <p>If you did not request this code, please igorne this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error: any) {
    console.log(`Failed to send email otp ${error}`);
    console.log(JSON.stringify(error.response?.body?.errors, null, 2));
    return false;
  }
};

const sendResetPassword = async (email: string, resetUrl: string) => {
  try {
    const msg = {
      to: email,

      from: {
        email: "momentum.v0@gmail.com",
        name: "Momentum",
      },
      subject: "Reset Your Password",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; color: #333333;">
          <img src="${getServerHost()}/public/logo-momentum-black.png" alt="Logo" style="width: 50px; margin: 0 auto 10px auto; display: block;"/>
          <h2>Password Reset Request</h2>
          <p>We received a request to reset your password. Click the button below to choose a new one:</p>
          
          <div style="margin: 30px 0;">
            <a href="${getClientHost()}/reset-password/${resetUrl}" style="background-color: #111111; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>

          <p>This link will expire in <b>15 minutes</b>.</p>
          <p style="color: #666666; font-size: 13px; margin-top: 25px;">
            If you did not request a password reset, please ignore this email. Your password will remain unchanged.
          </p>
        </div>
      `,
    };

    await sgMail.send(msg);
    return true;
  } catch (error) {
    console.log("Failed to send email reset password", error);
    return false;
  }
};

export { sentOtpEmail, genrateOtp, sendResetPassword };
