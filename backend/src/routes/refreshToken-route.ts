import express, { Router } from "express";
const route: Router = express.Router();

import { refreshToken } from "../controllers/refreshToken-controller.js";

route.get("/", refreshToken);

export default route;
