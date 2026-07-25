import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sql } from "../config/database.js";

const refreshToken = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cookie = req.cookies;

    // check that token jwt is exist
    if (!cookie?.jwt) {
      return res.status(401).json({ msg: "cookie jwt is not found" });
    }

    // find user
    const findUser = await sql`
    SELECT
    *
    FROM users
    WHERE user_id = ${user_id}
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

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || findUser[0].user_name !== decoded.user_name) {
          return res.status(403).json({ msg: "verify refresh token error" });
        }

        const accessToken = jwt.sign(
          { user_name: decoded.user_name },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" },
        );
        res.status(200).json({ accessToken: accessToken });
      },
    );
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { refreshToken };
