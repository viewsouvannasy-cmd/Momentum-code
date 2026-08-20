import { sql } from "../../../config/database.js";
import { Request, Response } from "express";
import { checkPayload } from "../../../utils/checkPayload.js";

import {
  checkListInGroupOwner,
  checkDateInListInGroupOwner,
} from "../../../utils/checkOwner.js";
import {
  getFilterMonth,
  getFilterYear,
  getFilterMonthAndYear,
} from "./task-date-query.js";

interface DateType {
  date: string;
  start_time: string;
  end_time: string;
}

interface AddDateTypeBody {
  dates: DateType[];
}

// get task date function
const getTaskDate = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { month, year, status } = req.query as {
      month: string | null;
      year: string | null;
      status: string | null;
    };

    // get filter month
    if (month && !year) {
      const results = await getFilterMonth(user_id, month, status);
      return res.status(202).json({ results });
    }

    // get filter year
    if (!month && year) {
      const results = await getFilterYear(user_id, year, status);
      return res.status(202).json({ results });
    }

    // get filter year and month
    if (month && year) {
      const results = await getFilterMonthAndYear(user_id, year, month, status);
      return res.status(202).json({ results });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

// this function use add date to to-do list
const addDate = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, task_id } = req.params;

    // date it will be a array
    const { dates } = req.body as AddDateTypeBody;

    // check that task inside group that have
    // that user be owner
    const results = await checkListInGroupOwner(
      Number(group_id),
      user_id,
      Number(task_id),
    );
    if (results.length === 0) {
      return res.sendStatus(401);
    }

    // loop add
    for (const item of dates) {
      await sql`
      INSERT INTO task_dates (task_id, task_date, start_time, end_time)
      VALUES (${task_id},${item.date},${item.start_time},${item.end_time})
      `;
    }

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

// this function is use to edit date
const editDateTime = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, task_id, date_id } = req.params;
    const { start_time, end_time } = req.body;

    // check user owner
    const results = await checkDateInListInGroupOwner(
      Number(group_id),
      user_id,
      Number(task_id),
      Number(date_id),
    );
    if (results.length === 0) {
      return res.sendStatus(404);
    }

    await sql`
    UPDATE task_dates
    SET start_time = ${start_time},
        end_time = ${end_time}
    WHERE date_id = ${date_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

// this function is use to delete date to-do
const deleteDate = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, task_id, date_id } = req.params;

    // check user owner
    const results = await checkDateInListInGroupOwner(
      Number(group_id),
      user_id,
      Number(task_id),
      Number(date_id),
    );
    if (results.length === 0) {
      return res.status(401).json({ msg: "You are not able access" });
    }

    await sql`
    DELETE FROM task_dates
    WHERE date_id = ${date_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

const deleteAllDate = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, task_id } = req.params;

    // check user owner
    const results = await checkListInGroupOwner(
      Number(group_id),
      user_id,
      Number(task_id),
    );
    if (results.length === 0) {
      return res.sendStatus(401);
    }

    await sql`
    DELETE FROM task_dates
    WHERE task_id = ${task_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

export { getTaskDate, addDate, editDateTime, deleteDate, deleteAllDate };
