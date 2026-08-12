import { sql } from "../../config/database.js";
import { Request, Response } from "express";
import { checkPayload } from "../../utils/checkPayload.js";
import {
  checkListInGroupOwner,
  checkDateInListInGroupOwner,
} from "../../utils/checkOwner.js";

// this function is use to get to-do date
const getDate = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);

    const results = await sql`
    SELECT
    gl.group_id,
    gl.group_name,
    td.todo_id,
    td.todo_name,
    tdd.date_id,
    tdd.todo_date,
    tdd.start_time,
    tdd.end_time
    FROM group_list as gl
    INNER JOIN to_do as td
    ON gl.group_id = td.group_id
    INNER JOIN to_do_date as tdd
    ON td.todo_id = tdd.todo_id
    WHERE user_id = ${user_id}
    AND todo_status = 'doing'
    `;
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function use add date to to-do list
const addDate = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, todo_id } = req.params;

    // date it will be a array
    const { dates } = req.body;

    // check that to-do inside group that have
    // that user be owner
    const results = await checkListInGroupOwner(
      Number(group_id),
      user_id,
      Number(todo_id),
    );
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    for (const date of dates) {
      await sql`
      INSERT INTO to_do_date (todo_id, todo_date, start_time, end_time)
      VALUES (${todo_id},${date.todo_date},${date.start_time},${date.end_time})
      `;
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function is use to edit date
const editDateTime = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, todo_id, date_id } = req.params;
    const { start_time, end_time } = req.body;

    // check user owner
    const results = await checkDateInListInGroupOwner(
      Number(group_id),
      user_id,
      Number(todo_id),
      Number(date_id),
    );
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    await sql`
    UPDATE to_do_date
    SET start_time = ${start_time},
        end_time = ${end_time}
    WHERE date_id = ${date_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this function is use to delete date to-do
const deleteDate = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, todo_id, date_id } = req.params;

    // check user owner
    const results = await checkDateInListInGroupOwner(
      Number(group_id),
      user_id,
      Number(todo_id),
      Number(date_id),
    );
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    await sql`
    DELETE FROM to_do_date
    WHERE date_id = ${date_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { getDate, addDate, editDateTime, deleteDate };
