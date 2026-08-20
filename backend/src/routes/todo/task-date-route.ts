import express, { Router } from "express";
const route: Router = express.Router();

import {
  getTaskDate,
  addDate,
  editDateTime,
  deleteDate,
  deleteAllDate,
} from "../../controllers/todo/task-date/task-date-controller.js";

route.get("/get", getTaskDate);
route.post("/add/:group_id/:task_id", addDate);
route.put("/edit/:group_id/:task_id/:date_id", editDateTime);

route.delete("/delete-all/:group_id/:task_id", deleteAllDate);
route.delete("/delete/:group_id/:task_id/:date_id", deleteDate);

export default route;
