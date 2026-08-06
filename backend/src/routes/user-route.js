import express from "express";
const route = express.Router();

import { getUserInfo } from "../controllers/user-controller.js";

route.get("/info", getUserInfo);

export default route;
