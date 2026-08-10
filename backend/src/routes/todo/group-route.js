import express from "express";
const route = express.Router();

import {
  getGroupList,
  createGroupList,
  deleteGroupList,
  renameGroupList,
  changeColorGroupList,
} from "../../controllers/todo/group-controller.js";

route.get("/get", getGroupList);
route.post("/create", createGroupList);
route.delete("/delete/:group_id", deleteGroupList);
route.put("/rename/:group_id", renameGroupList);
route.put("/change-color/:group_id", changeColorGroupList);

export default route;
