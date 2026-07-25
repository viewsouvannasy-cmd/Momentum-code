import express from "express";
const route = express.Router();

import { refreshToken } from "../controllers/refreshToken-controller.js";

route.get("/:user_id", refreshToken);

export default route;
