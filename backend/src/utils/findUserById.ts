import { sql } from "../config/database.js";

interface findUserByIdType {
  user_id: number;
  user_name: string;
  user_email: string;
  refresh_token: string;
}

export const findUserById = async (user_id: number) => {
  return (await sql`
    SELECT
    *
    FROM users
    WHERE user_id = ${user_id}
    `) as findUserByIdType[];
};
