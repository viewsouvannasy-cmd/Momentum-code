import express from "express";
const route = express.Router();

import {
  createAccount,
  verifyUserOTP,
  getInfoUser,
} from "../controllers/user-controller.js";

import verifyJwt from "../middleware/verifyJWT.js";

route.post("/create-account", createAccount);
route.post("/verify-otp", verifyUserOTP);

route.get("/get/:user_name", verifyJwt, getInfoUser);

export default route;
