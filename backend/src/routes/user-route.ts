import express, { Router } from "express";
const route: Router = express.Router();

import { getUserInfo } from "../controllers/user-controller.js";

route.get("/info", getUserInfo);

export default route;
