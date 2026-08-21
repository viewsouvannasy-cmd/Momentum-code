import express, { Router } from "express";
const route: Router = express.Router();

import {
  getTaskDate,
  addDate,
  editDateTime,
  moveStatusTaskDate,
  deleteDate,
  deleteAllDate,
  deleteRemainderStatus,
} from "../../controllers/todo/task-date/task-date-controller.js";

route.get("/get", getTaskDate);
route.post("/add/:group_id/:task_id", addDate);
route.put("/edit/:group_id/:task_id/:date_id", editDateTime);
route.put("/move/:group_id/:task_id/:date_id", moveStatusTaskDate);

route.delete("/delete-all/:group_id/:task_id", deleteAllDate);
route.delete("/delete/:group_id/:task_id", deleteDate);
route.delete(
  "/delete-status/:group_id/:task_id/:status",
  deleteRemainderStatus,
);

export default route;
