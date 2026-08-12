import express, { Router } from "express";
const route: Router = express.Router();

import {
  getTaskList,
  addTaskList,
  deleteTask,
  moveTo,
} from "../../controllers/todo/task-controller.js";

route.get("/get", getTaskList);
route.post("/add", addTaskList);
route.delete("/delete/:group_id/:task_id", deleteTask);
route.put("/move", moveTo);

export default route;
