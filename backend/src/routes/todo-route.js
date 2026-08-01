import express from "express";
const route = express.Router();

import { createGroupList } from "../controllers/todo-controller.js";

route.post("/create-group-list", createGroupList);

export default route;
