import { getAccessTokenSecret, getRefreshTokenSecret } from "./getEnv.js";

import jwt from "jsonwebtoken";

function generateAccessToken(user_id: number) {
  return jwt.sign({ user_id: user_id }, getAccessTokenSecret(), {
    expiresIn: "15m",
  });
}

function generateRefreshToken(user_id: number) {
  return jwt.sign({ user_id }, getRefreshTokenSecret(), {
    expiresIn: "15d",
  });
}

export { generateAccessToken, generateRefreshToken };
