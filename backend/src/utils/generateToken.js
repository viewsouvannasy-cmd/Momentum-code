import jwt from "jsonwebtoken";

function generateAccessToken(user_name) {
  return jwt.sign({ user_name: user_name }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
}

function generateRefreshToken(user_name) {
  return jwt.sign({ user_name: user_name }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "15d",
  });
}

export { generateAccessToken, generateRefreshToken };
