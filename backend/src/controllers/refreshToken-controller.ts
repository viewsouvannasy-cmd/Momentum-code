import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateToken.js";
import { getRefreshTokenSecret } from "../utils/getEnv.js";
import { sql } from "../config/database.js";
import { findUserById } from "../utils/findUserById.js";

interface PayloadType {
  user_id: number;
  iat: number;
  exp: number;
}

const refreshToken = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies;

    // check that token jwt is exist
    if (!cookie?.jwt) {
      return res
        .status(401)
        .json({ success: false, msg: "cookie jwt is not found" });
    }

    // find user
    const refreshTokenSecret = getRefreshTokenSecret();
    const payload = jwt.verify(cookie.jwt, refreshTokenSecret) as PayloadType;
    const findUser = await findUserById(payload.user_id);
    if (findUser.length === 0) {
      return res.status(401).json({ success: false, msg: "user is not exist" });
    }

    const refreshToken: string = cookie.jwt;
    // check refresh token
    const checkRefreshToken = await bcrypt.compare(
      refreshToken,
      findUser[0].refresh_token,
    );
    if (!checkRefreshToken) {
      return res
        .status(401)
        .json({ success: false, msg: "refresh token is invalid" });
    }

    // generate access token and send to client
    const accessToken = generateAccessToken(payload.user_id);

    res.status(200).json({ success: true, accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

export { refreshToken };
