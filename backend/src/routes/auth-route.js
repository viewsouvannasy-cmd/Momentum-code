import express from "express";
const route = express.Router();

import {
  createAccount,
  verifyUserOTP,
  handleLogin,
  handleLogout,
  checkUser,
  getInfoUser,
} from "../controllers/auth-controller.js";

import verifyJwt from "../middleware/verifyJWT.js";

route.post("/create-account", createAccount);
route.post("/verify-otp", verifyUserOTP);
route.post("/login", handleLogin);
route.get("/logout", handleLogout);
route.get("/check-user", checkUser);

route.get("/get/:user_name", verifyJwt, getInfoUser);

export default route;
