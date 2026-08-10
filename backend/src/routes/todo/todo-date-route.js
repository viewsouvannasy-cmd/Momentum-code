import express from "express";
const route = express.Router();

import {
  getDate,
  addDate,
  editDateTime,
  deleteDate,
} from "../../controllers/todo/todo-date-controller.js";

route.get("/get", getDate);
route.post("/add/:group_id/:todo_id", addDate);
route.put("/edit/:group_id/:todo_id/:date_id", editDateTime);
route.delete("/delete/:group_id/:todo_id/:date_id", deleteDate);

export default route;
