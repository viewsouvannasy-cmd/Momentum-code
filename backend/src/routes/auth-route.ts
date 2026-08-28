import express from "express";
const route = express.Router();

import {
  createAccount,
  verifyUserOTP,
  handleLogin,
  handleLogout,
  checkUser,
  userForgetPassowrd,
  resetResetPasssword,
} from "../controllers/auth-controller.js";

route.post("/create-account", createAccount);
route.post("/verify-otp", verifyUserOTP);
route.post("/login", handleLogin);
route.get("/logout", handleLogout);
route.get("/check-user", checkUser);
route.post("/forgot-password", userForgetPassowrd);
route.post("/reset-password/:reset_password_token", resetResetPasssword);

export default route;
