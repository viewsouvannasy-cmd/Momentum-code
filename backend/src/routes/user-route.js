import express from "express";
const route = express.Router();

import {
  createAccount,
  verifyUserOTP,
} from "../controllers/user-controller.js";

route.post("/create-account", createAccount);
route.post("/verify-otp", verifyUserOTP);

export default route;
