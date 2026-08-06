import express from "express";
const route = express.Router();

import {
  createAccount,
  verifyUserOTP,
  handleLogin,
  handleLogout,
  checkUser,
} from "../controllers/auth-controller.js";

route.post("/create-account", createAccount);
route.post("/verify-otp", verifyUserOTP);
route.post("/login", handleLogin);
route.get("/logout", handleLogout);
route.get("/check-user", checkUser);

export default route;
