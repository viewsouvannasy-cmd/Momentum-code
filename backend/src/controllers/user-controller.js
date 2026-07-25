import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { vaildateFormatEamil, checkDomainEamil } from "../utils/validation.js";
import { sentOtpEmail, genrateOtp } from "../service/emailService.js";
import { sql } from "../config/database.js";

const createAccount = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    // check provide info
    if (!user_name || !user_email || !user_password) {
      return res.status(401).json({ msg: "please provide all info" });
    }

    // vaildate email
    const checkForrmatEmail = vaildateFormatEamil(user_email);
    if (!checkForrmatEmail) {
      return res.status(401).json({ msg: "we can not find your email" });
    }

    // check email domain
    const checkDomain = await checkDomainEamil(user_email);
    if (!checkDomain) {
      return res.status(401).json({ msg: "we can not find your email" });
    }

    // genrate Opt code and set time out
    const otp = genrateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000;

    // encrypt the user_password
    const hashPassword = await bcrypt.hash(user_password, 10);

    //store otp to a database
    const results =
      await sql`INSERT INTO user_otps('user_name','user_email','password_hash','otp_code','expire_at')
      VALUES (${user_name},${user_email},${hashPassword},${otp},${expiresAt})
    `;

    // sending email
    const isSend = await sentOtpEmail(user_email, otp);
    console.log(isSend);
    if (!isSend) {
      return res.status(500).json({ msg: "we're can not send email" });
    }

    res.status(200).json({ msg: "we have send OTP to your email" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

export { createAccount };
