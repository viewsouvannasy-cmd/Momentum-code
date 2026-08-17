import { Request, Response } from "express";
import { checkPayload } from "../utils/checkPayload.js";
import { sql } from "../config/database.js";

interface findUserType {
  user_name: string;
  user_email: string;
}

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);

    const findUser = (await sql`
    SELECT
    user_name,
    user_email,
    created_at
    FROM users
    WHERE user_id = ${user_id}
    `) as findUserType[];
    if (findUser.length === 0) {
      return res.status(404).json({ success: false, msg: "user it not found" });
    }

    res.status(202).json({ success: true, results: findUser });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { getUserInfo };
