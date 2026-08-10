import { sql } from "../../config/database.js";
import { checkOwner, checkListInGroupOwner } from "../../utils/checkOwner.js";

const getTaskList = async (req, res) => {
  try {
    const user = req.user;

    const results = await sql`
    SELECT
    gl.group_id,
    gl.group_name,
    gl.group_color,
    t.task_id,
    t.task_name,
    t.task_status
    FROM group_list as gl
    INNER JOIN tasks as t
    ON gl.group_id = t.group_id
    WHERE gl.user_id = ${user.user_id}
    `;

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function add to do list to group list
const addTaskList = async (req, res) => {
  try {
    const user = req.user;
    const { group_id, task_name, task_status } = req.body;

    // check required
    if (!group_id || !task_name || !task_status) {
      return res.sendStatus(401);
    }

    // check that user is owner of  group list
    const results = await checkOwner(group_id, user.user_id);
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    await sql`
    INSERT INTO tasks (group_id,task_name,task_status)
    VALUES (${group_id},${task_name},${task_status})
    `;

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function undo list inside group list
const deleteTask = async (req, res) => {
  try {
    const user = req.user;
    const { group_id, task_id } = req.params;

    // check that to do inside group that have
    // that user be owner
    const results = await checkListInGroupOwner(
      group_id,
      user.user_id,
      task_id,
    );
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    await sql`
    DELETE FROM tasks
    WHERE task_id = ${task_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function move to do state to doing state
const moveTo = async (req, res) => {
  try {
    const user = req.user;
    const { group_id, task_id, toState } = req.body;

    // check that to do inside group that have
    // that user be owner
    const results = await checkListInGroupOwner(
      group_id,
      user.user_id,
      task_id,
    );
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    await sql`
    UPDATE tasks
    SET task_status = ${toState}
    WHERE task_id = ${task_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

export { getTaskList, addTaskList, deleteTask, moveTo };
