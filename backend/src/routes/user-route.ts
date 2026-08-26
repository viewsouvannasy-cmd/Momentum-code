import express, { Router } from "express";
import multer from "multer";
const route: Router = express.Router();

const upload = multer();

import {
  getUserInfo,
  uploadProfile,
  changeUserName,
  changePassword,
  checkPassword,
} from "../controllers/user-controller.js";

route.get("/info", getUserInfo);
route.post("/upload-profile", upload.single("filePhoto"), uploadProfile);
route.post("/change-name", changeUserName);
route.post("/change-password", changePassword);
route.post("/check/password", checkPassword);

export default route;
