import { getEndDate } from "../../../utils/calculateDateAndTime.js";
import { sql } from "../../../config/database.js";

const getFilterMonth = async (
  user_id: number,
  month: string,
  status: string | undefined,
) => {
  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, Number(month), 0).getDate();

  const startDate = `'${year}-${month}-01'`;
  const endDate = `'${year}-${month}-${daysInMonth}'`;

  if (status) {
    return await sql`
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
    td.end_time,
    td.date_status
    FROM task_dates AS td
    INNER JOIN tasks AS t
      ON td.task_id = t.task_id
    INNER JOIN group_list AS gl
      ON gl.group_id = t.group_id
    WHERE gl.user_id = ${user_id}
    AND task_date >= ${startDate}
    AND task_date <= ${endDate}
    AND task_status = ${status}
    `;
  }

  return await sql`
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
    td.end_time,
    td.date_status
    FROM task_dates AS td
    INNER JOIN tasks AS t
      ON td.task_id = t.task_id
    INNER JOIN group_list AS gl
      ON gl.group_id = t.group_id
    WHERE gl.user_id = ${user_id}
    AND task_date >= ${startDate}
    AND task_date <= ${endDate}
    `;
};

const getFilterYear = async (
  user_id: number,
  year: string,
  status: string | undefined,
) => {
  const startDate = `'${year}-01-01'`;
  const endDate = `'${Number(year) + 1}-01-01'`;

  if (status) {
    return await sql`
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
    td.end_time,
    td.date_status
    FROM task_dates AS td
    INNER JOIN tasks AS t
      ON td.task_id = t.task_id
    INNER JOIN group_list AS gl
      ON gl.group_id = t.group_id
    WHERE gl.user_id = ${user_id}
    AND task_date >= ${startDate}
    AND task_date <= ${endDate}
    AND task_status = ${status}
    `;
  }

  return await sql`
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
    td.end_time,
    td.date_status
    FROM task_dates AS td
    INNER JOIN tasks AS t
      ON td.task_id = t.task_id
    INNER JOIN group_list AS gl
      ON gl.group_id = t.group_id
    WHERE gl.user_id = ${user_id}
    AND task_date >= ${startDate}
    AND task_date <= ${endDate}
    `;
};

const getFilterMonthAndYear = async (
  user_id: number,
  year: string,
  month: string,
  status: string | undefined,
) => {
  const startDate = `'${year}-${month}-01'`;
  const endDate = getEndDate(month, year);

  if (status) {
    return await sql`
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
        td.end_time,
        td.date_status
        FROM task_dates AS td
        INNER JOIN tasks AS t
          ON td.task_id = t.task_id
        INNER JOIN group_list AS gl
          ON gl.group_id = t.group_id
        WHERE gl.user_id = ${user_id}
        AND td.task_date > ${startDate}
        AND td.task_date < ${endDate}
        AND task_status = ${status}
        `;
  }

  return await sql`
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
        td.end_time,
        td.date_status
        FROM task_dates AS td
        INNER JOIN tasks AS t
          ON td.task_id = t.task_id
        INNER JOIN group_list AS gl
          ON gl.group_id = t.group_id
        WHERE gl.user_id = ${user_id}
        AND td.task_date > ${startDate}
        AND td.task_date < ${endDate}
       
        `;
};

export { getFilterMonth, getFilterYear, getFilterMonthAndYear };
