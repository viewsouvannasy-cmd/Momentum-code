import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { vaildateFormatEamil, checkDomainEamil } from "../utils/validation.js";
import { sentOtpEmail, genrateOtp } from "../service/emailService.js";
import { sql } from "../config/database.js";

// this function is use to check valid info of user
// and check that user email is truly have
const createAccount = async (req, res) => {
  try {
    const { user_name, user_email } = req.body;

    // check provide info
    if (!user_name || !user_email) {
      return res
        .status(401)
        .json({ msg: "Please provide all required information" });
    }

    // check dupicate name
    const dupicateName = await sql`
        SELECT 
        *
        FROM users
        WHERE user_name = ${user_name}
        `;
    if (dupicateName.length > 0) {
      return res.status(401).json({
        success: false,
        point: "name",
        msg: "This name is already taken",
      });
    }

    // check valid email format
    const checkForrmatEmail = vaildateFormatEamil(user_email);
    if (!checkForrmatEmail) {
      return res.status(401).json({ msg: "Invilid email format" });
    }

    // check email domain
    const checkMailDoamin = await checkDomainEamil(user_email);
    if (!checkMailDoamin) {
      return res.status(401).json({
        success: false,
        point: "email",
        msg: "Email domin does not exist",
      });
    }

    // check dupicate email
    const dupicateEmail = await sql`
    SELECT
    *
    FROM users
    WHERE user_email = ${user_email}
    `;
    if (dupicateEmail.length > 0) {
      return res.status(401).json({
        success: false,
        point: "email",
        msg: "This email is already in use",
      });
    }

    // genrate opt code
    const otp = genrateOtp();

    // sending email
    const isSend = await sentOtpEmail(user_email, otp);
    if (!isSend) {
      return res.status(500).json({ msg: "we're can not send email" });
    }

    //store otp to a database for compareing
    await sql`INSERT INTO user_otps(user_name,user_email,otp_code,expires_at)
      VALUES (
      ${user_name},
      ${user_email},
      ${otp},
      CURRENT_TIMESTAMP + INTERVAL '5 minutes'
      )
    `;

    res
      .status(200)
      .json({ success: true, msg: "we have send OTP to your email" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this actucl function that use to store a user to
// datebase after verify otp code
const verifyUserOTP = async (req, res) => {
  const { user_name, user_email, user_password, otp_code } = req.body;

  // check valid otp
  const checkOtp = await sql`
  SELECT
   * 
  FROM user_otps 
  WHERE user_name = ${user_name}
    AND user_email = ${user_email} 
    AND otp_code = ${otp_code}
  `;

  if (checkOtp.length === 0) {
    return res
      .status(401)
      .json({ success: false, point: "verify", msg: "Otp code is incorrect" });
  }

  // check expire
  const expireAtMs = new Date(checkOtp[0].expires_at).getTime();
  if (Date.now() > expireAtMs) {
    return res.status(404).json({
      success: false,
      point: "verify",
      msg: "the OTP code has expired",
    });
  }

  // genrate access token and refresh token
  const accessToken = jwt.sign(
    { user_name: user_name },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" },
  );
  const refreshToken = jwt.sign(
    { user_name: user_name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "15d" },
  );

  //hashing password and refresh token before store
  const hashPassword = await bcrypt.hash(user_password, 10);
  const hasdRefreshToken = await bcrypt.hash(refreshToken, 10);

  //store user into database
  await sql`
  INSERT INTO users(user_name,user_email,user_password,refresh_token,created_at)
  VALUES (
  ${user_name},
  ${user_email},    
  ${hashPassword},
  ${hasdRefreshToken},
  CURRENT_TIMESTAMP
  )
  `;

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    msg: `create account user name: ${user_name} successful`,
    accessToken: accessToken,
  });
};

const getInfoUser = async (req, res) => {
  const { user_name } = req.params;
  res.status(200).json({ msg: `hello ${user_name}` });
};

export { createAccount, verifyUserOTP, getInfoUser };
