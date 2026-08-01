import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/generateToken.js";
import { sql } from "../config/database.js";

const refreshToken = async (req, res) => {
  try {
    const cookie = req.cookies;

    // check that token jwt is exist
    if (!cookie?.jwt) {
      return res.status(401).json({ msg: "cookie jwt is not found" });
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
      return res.status(401).json({ msg: "user is not exist" });
    }

    const refreshToken = cookie.jwt;
    // check refresh token
    const checkRefreshToken = await bcrypt.compare(
      refreshToken,
      findUser[0].refresh_token,
    );
    if (!checkRefreshToken) {
      return res.status(401).json({ msg: "refresh token is invalid" });
    }

    // generate access token and send to client
    const accessToken = generateAccessToken(payload.user_id);

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { refreshToken };
