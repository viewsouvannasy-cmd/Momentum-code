import express from "express";
const route = express.Router();

import {
  createGroupList,
  getGroupList,
  deleteGroupList,
  getToDoList,
  addToDoList,
  undoList,
  moveToProcess,
  moveToComplete,
  getDate,
  addDate,
  editDateTime,
  deleteDate,
} from "../controllers/todo-controller.js";

route.post("/create-group-list", createGroupList);
route.get("/get-group-list", getGroupList);
route.delete("/delete-group-list/:id", deleteGroupList);

route.get("/get-to-do", getToDoList);
route.post("/add-to-do", addToDoList);
route.delete("/undo/:group_id/:todo_id", undoList);
route.put("/to-process/:group_id/:todo_id", moveToProcess);
route.put("/to-complete/:group_id/:todo_id", moveToComplete);

route.get("/get-date", getDate);
route.post("/add-date/:group_id/:todo_id", addDate);
route.put("/edit-date-time/:group_id/:todo_id/:date_id", editDateTime);
route.delete("/delete-date/:group_id/:todo_id/:date_id", deleteDate);

export default route;
