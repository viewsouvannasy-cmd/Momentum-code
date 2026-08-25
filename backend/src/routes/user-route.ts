import express, { Router } from "express";
import multer from "multer";
const route: Router = express.Router();

const upload = multer();

import { getUserInfo, uploadProfile } from "../controllers/user-controller.js";

route.get("/info", getUserInfo);
route.post("/upload-profile", upload.single("filePhoto"), uploadProfile);

export default route;
