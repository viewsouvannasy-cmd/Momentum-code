import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { vaildateFormatEamil, checkDomainEamil } from "../utils/validation.js";
import { sentOtpEmail, genrateOtp } from "../service/emailService.js";
import { sql } from "../config/database.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";

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

    // hash otp
    const otpHash = await bcrypt.hash(otp, 10);

    // generate otp token
    const otpToken = jwt.sign(
      { user_name: user_name, otp_code_hash: otpHash },
      process.env.OTP_TOKEN_SECRET,
      { expiresIn: "5m" },
    );

    res.cookie("jwt_otp", otpToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 5 * 60 * 1000,
    });

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
  try {
    const { user_name, user_email, user_password, otp_code } = req.body;

    const cookieOtp = req.cookies.jwt_otp;

    //check cookie
    if (!cookieOtp) {
      return res.status(404).json({
        success: false,
        point: "verify",
        msg: "the OTP code has expired",
      });
    }

    // check valid otp code
    const payload = jwt.verify(cookieOtp, process.env.OTP_TOKEN_SECRET);
    const compareOtp = await bcrypt.compare(otp_code, payload.otp_code_hash);
    if (payload.user_name !== user_name || !compareOtp) {
      return res.status(401).json({
        success: false,
        point: "verify",
        msg: "Otp code is incorrect",
      });
    }

    //hashing password and refresh token before store
    const hashPassword = await bcrypt.hash(user_password, 10);

    //store user into database
    const [{ user_id }] = await sql`
    INSERT INTO users(user_name,user_email,user_password,refresh_token,created_at)
    VALUES (
    ${user_name},
    ${user_email},    
    ${hashPassword},
    'null',
    CURRENT_TIMESTAMP
    )
    RETURNING user_id
    `;

    // genrate access token and refresh token
    const accessToken = generateAccessToken(user_id);
    const refreshToken = generateRefreshToken(user_id);

    //hash refresh token
    const hasdRefreshToken = await bcrypt.hash(refreshToken, 10);

    // update refresh_token in a database
    await sql`
    UPDATE users
    SET refresh_token = ${hasdRefreshToken}
    WHERE user_id = ${user_id}
    `;

    res.clearCookie("jwt_otp", {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// validate user login
const handleLogin = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    // find user
    const findUser = await sql`
    SELECT
    *
    FROM users
    WHERE user_name = ${user_name}
    `;
    if (findUser.length === 0) {
      return res.status(401).json({
        success: false,
        msg: "name or password is wrong try again",
      });
    }

    // compare hash password
    const comparePassword = await bcrypt.compare(
      user_password,
      findUser[0].user_password,
    );
    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        msg: "name or password is wrong try again",
      });
    }

    // generate refresh token and hast it
    const refreshToken = generateRefreshToken(findUser[0].user_id);
    const hasdRefreshToken = await bcrypt.hash(refreshToken, 10);

    // update refreshToken in database
    await sql`
    UPDATE users
    SET refresh_token = ${hasdRefreshToken}
    WHERE user_id = ${findUser[0].user_id}
    `;

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      msg: "login successful",
      results: {
        user_name: findUser[0].user_name,
        user_email: findUser[0].user_email,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// handle log out
const handleLogout = async (req, res) => {
  try {
    const cookie = req.cookies;

    if (!cookie?.jwt) {
      return res.status(404).json({ success: false, msg: "jwt is not fount" });
    }

    // find user
    const payload = jwt.verify(cookie.jwt, process.env.REFRESH_TOKEN_SECRET);

    const findUser = await sql`
    SELECT
    * 
    FROM users
    WHERE user_id = ${payload.user_id}
    `;
    if (findUser.length === 0) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
      });
      return res.status(404).json({
        success: false,
        msg: "user is not found",
      });
    }

    // remove refresh token from database
    await sql`
    UPDATE users
    SET refresh_token = ''
    WHERE user_id = ${payload.user_id}
  `;

    res.clearCookie("jwt", { httpOnly: true, sameSite: "Lax", secure: false });

    res.status(200).json({ success: true, msg: "log out" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this funciton use to check user is already in system
// if in, will send that user to app page or user refresh token is not expires
const checkUser = async (req, res) => {
  try {
    const cookie = req.cookies;

    // check that token jwt is exist
    if (!cookie?.jwt) {
      res.clearCookie("jwt", { httpOnly: true });
      return res
        .status(401)
        .json({ success: false, msg: "cookie jwt is not found" });
    }

    // find user
    const payload = jwt.verify(cookie.jwt, process.env.REFRESH_TOKEN_SECRET);
    const findUser = await sql`
    SELECT
    user_name,
    user_email
    FROM users
    WHERE user_id = ${payload.user_id}
    `;
    if (findUser.length === 0) {
      res.status(404).json({
        success: false,
        msg: "user is not found",
      });
    }

    res.status(202).json({ success: true, results: findUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: `internal server error ${error}` });
  }
};

export { createAccount, verifyUserOTP, handleLogin, handleLogout, checkUser };
