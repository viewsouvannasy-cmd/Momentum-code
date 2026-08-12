import { Request, Response } from "express";
import { formatData } from "../../utils/formatData.js";
import { sql } from "../../config/database.js";
import { checkPayload } from "../../utils/checkPayload.js";

interface DataType {
  group_id: number;
  group_name: string;
  group_color: string;
  task_id: number;
  task_name: string;
  task_status: string;
  date_id: number;
  task_date: string;
  start_time: string;
  end_time: string;
}

const getTodoData = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);

    const results = (await sql`
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
    WHERE user_id = ${user_id}
    `) as DataType[];

    const newFomat = formatData(results);

    res.status(200).json({ results: newFomat });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { getTodoData };
