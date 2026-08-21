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

interface ParamForValid {
  group_id: number;
  task_id: number;
  date_id: number;
}

interface DeleteRemainderStatus extends ParamForValid {
  status: string;
}

interface FilterTaskDateData {
  month: string | undefined;
  year: string | undefined;
  status?: string | undefined;
}

// get task date function
const getTaskDate = async (
  req: Request<{}, {}, {}, FilterTaskDateData>,
  res: Response,
) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { month, year, status } = req.query;

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
const addDate = async (
  req: Request<ParamForValid, {}, AddDateTypeBody>,
  res: Response,
) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, task_id } = req.params;

    // date it will be a array
    const { dates } = req.body;

    // check that task inside group that have
    // that user be owner
    const results = await checkListInGroupOwner(
      Number(group_id),
      user_id,
      Number(task_id),
    );
    if (results.length === 0) {
      return res.status(401).json({ msg: "You are not allow to do" });
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
const editDateTime = async (
  req: Request<ParamForValid, {}, { start_time: string; end_time: string }>,
  res: Response,
) => {
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
      return res.status(401).json({ msg: "You are not allow to do" });
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

// move status task date
const moveStatusTaskDate = async (
  req: Request<ParamForValid, {}, { toStatus: "completed" | "miss" }>,
  res: Response,
) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, task_id, date_id } = req.params;
    const { toStatus } = req.body;

    if (toStatus !== "completed" && toStatus !== "miss") {
      return res
        .status(400)
        .json({ msg: "toStatis must be completed or miss" });
    }

    // check user owner
    const results = await checkDateInListInGroupOwner(
      Number(group_id),
      user_id,
      Number(task_id),
      Number(date_id),
    );
    if (results.length === 0) {
      return res.status(401).json({ msg: "You are not allow to do" });
    }

    await sql`
    UPDATE task_dates
    SET date_status = ${toStatus}
    WHERE date_id = ${date_id}
    
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

// this function is use to delete date to-do
const deleteDate = async (
  req: Request<ParamForValid, {}, {}>,
  res: Response,
) => {
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
      return res.status(401).json({ msg: "You are not allow to do" });
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

const deleteAllDate = async (
  req: Request<ParamForValid, {}, {}>,
  res: Response,
) => {
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
      return res.status(401).json({ msg: "You are not allow to do" });
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

// this use to remove remainder status like when user submit
// task but they still have date to do in the calendar but they already done with
// we will auto remove that remain date for them
const deleteRemainderStatus = async (
  req: Request<DeleteRemainderStatus, {}, {}>,
  res: Response,
) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { group_id, task_id, status } = req.params;

    // check user owner
    const results = await checkListInGroupOwner(
      Number(group_id),
      user_id,
      Number(task_id),
    );
    if (results.length === 0) {
      return res.status(401).json({ msg: "You are not allow to do" });
    }

    await sql`
    DELETE FROM task_dates
    WHERE task_id = ${task_id}
      AND date_status = ${status}
    `;

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

export {
  getTaskDate,
  addDate,
  editDateTime,
  moveStatusTaskDate,
  deleteDate,
  deleteAllDate,
  deleteRemainderStatus,
};
