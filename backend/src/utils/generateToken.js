import jwt from "jsonwebtoken";

function generateAccessToken(user_id) {
  return jwt.sign({ user_id: user_id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(user_id) {
  return jwt.sign({ user_id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
}

export { generateAccessToken, generateRefreshToken };
