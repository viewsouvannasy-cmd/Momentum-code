import express from "express";
const route = express.Router();

import { createAccount } from "../controllers/user-controller.js";

route.post("/create-account", createAccount);

export default route;
