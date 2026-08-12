import { StringDecoder } from "string_decoder";
import { sql } from "../config/database.js";

// this function is use to check that use it owner of group list
const checkOwner = async (group_id: number, user_id: number) => {
  return await sql`
    SELECT
    *
    FROM group_list
    WHERE group_id = ${group_id}
    AND user_id = ${user_id}
    `;
};

// this function it use to check that to do list is inside
// a group list that have that user be a owner
const checkListInGroupOwner = async (
  group_id: number,
  user_id: number,
  task_id: number,
) => {
  return await sql`
    SELECT
    *
    FROM group_list as gl
    INNER JOIN tasks as t
    ON gl.group_id = t.group_id
    WHERE gl.group_id = ${group_id}
    AND gl.user_id = ${user_id}
    AND t.task_id = ${task_id}
    `;
};

// this function is use to check that user is try to edit
// is date of to-do list of group that user be owner
const checkDateInListInGroupOwner = async (
  group_id: number,
  user_id: number,
  task_id: number,
  date_id: number,
) => {
  return await sql`
    SELECT
    *
    FROM group_list as gl
    INNER JOIN task as t
    ON gl.group_id = t.group_id
    INNER JOIN to_do_date as tdd
    ON t.task_id = tdd.task_id
    WHERE gl.group_id = ${group_id}
    AND gl.user_id =${user_id}
    AND t.task_id = ${task_id}
    AND tdd.date_id = ${date_id}
    `;
};

export { checkOwner, checkListInGroupOwner, checkDateInListInGroupOwner };
