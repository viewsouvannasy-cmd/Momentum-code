import { sql } from "../config/database.js";

// this function is use to check that use it owner of group list
const checkOwner = async (group_id, user_id) => {
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
const checkListInGroupOwner = async (group_id, user_id, todo_id) => {
  return await sql`
    SELECT
    *
    FROM group_list as gl
    INNER JOIN to_do as td
    ON gl.group_id = td.group_id
    WHERE gl.group_id = ${group_id}
    AND gl.user_id = ${user_id}
    AND td.todo_id = ${todo_id}
    `;
};

// this function is use to check that user is try to edit
// is date of to-do list of group that user be owner
const checkDateInListInGroupOwner = async (
  group_id,
  user_id,
  todo_id,
  date_id,
) => {
  return await sql`
    SELECT
    *
    FROM group_list as gl
    INNER JOIN to_do as td
    ON gl.group_id = td.group_id
    INNER JOIN to_do_date as tdd
    ON td.todo_id = tdd.todo_id
    WHERE gl.group_id = ${group_id}
    AND gl.user_id =${user_id}
    AND td.todo_id = ${todo_id}
    AND tdd.date_id = ${date_id}
    `;
};

export { checkOwner, checkListInGroupOwner, checkDateInListInGroupOwner };
