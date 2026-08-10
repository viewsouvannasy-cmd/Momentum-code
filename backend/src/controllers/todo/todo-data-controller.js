import { formatData } from "../../utils/formatData.js";
import { sql } from "../../config/database.js";

const getTodoData = async (req, res) => {
  try {
    const user = req.user;

    const results = await sql`
    SELECT
    gl.group_id,
    gl.group_name,
    gl.group_color,
    t.task_id,
    t.task_name,
    t.task_status,
    td.date_id,
    td.task_date,
    td.start_time,
    td.end_time
    FROM group_list as gl
    LEFT JOIN tasks as t
    on gl.group_id  = t.group_id
    LEFT JOIN task_dates as td
    on td.task_id = t.task_id
    WHERE user_id = ${user.user_id}
    `;

    const newFomat = formatData(results);

    res.status(200).json({ results: newFomat });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { getTodoData };
