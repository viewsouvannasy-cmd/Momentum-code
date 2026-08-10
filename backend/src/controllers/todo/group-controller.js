import { sql } from "../../config/database.js";

// this function get group list
const getGroupList = async (req, res) => {
  try {
    const user = req.user;

    const results = await sql`
    SELECT
    group_id,
    group_name,
    group_color
    FROM group_list
    WHERE user_id = ${user.user_id}
    `;

    res.status(202).json({ results: results });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function create group list
const createGroupList = async (req, res) => {
  try {
    const user = req.user;
    const { group_name, group_color } = req.body;

    // check required
    if (!group_name || !group_color) {
      return res.sendStatus(401);
    }

    await sql`
    INSERT INTO group_list(user_id,group_name,group_color)
    VALUES (
    ${user.user_id},
    ${group_name},
    ${group_color}
    )
     `;

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function delete group list
const deleteGroupList = async (req, res) => {
  try {
    const user = req.user;
    const { group_id } = req.params;

    const results = await sql`
    DELETE FROM group_list
    WHERE group_id = ${group_id} 
    AND user_id = ${user.user_id}
    RETURNING *
    `;
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function use to rename group list
const renameGroupList = async (req, res) => {
  try {
    const user = req.user;
    const { group_new_name } = req.body;
    const { group_id } = req.params;

    const results = await sql`
    UPDATE group_list
    SET group_name = ${group_new_name}
    WHERE group_id = ${group_id} AND user_id = ${user.user_id}
    RETURNING *
    `;
    if (results.length === 0) {
      return res.sendStatus(401);
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function use to change color of group list
const changeColorGroupList = async (req, res) => {
  try {
    const user = req.user;
    const { group_id } = req.params;
    const { group_new_color } = req.body;

    const results = await sql`
    UPDATE group_list
    SET group_color = ${group_new_color}
    WHERE group_id = ${group_id} AND user_id = ${user.user_id}
    RETURNING *
    `;
    if (results.length === 0) {
      return res.sendStatus(401);
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export {
  getGroupList,
  createGroupList,
  deleteGroupList,
  renameGroupList,
  changeColorGroupList,
};
