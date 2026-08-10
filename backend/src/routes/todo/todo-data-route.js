import express from "express";
import { getTodoData } from "../../controllers/todo/todo-data-controller.js";
const route = express.Router();

route.get("/get", getTodoData);

export default route;
