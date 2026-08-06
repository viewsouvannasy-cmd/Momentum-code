import { sql } from "../config/database.js";

const getUserInfo = async (req, res) => {
  try {
    const user = req.user;

    const findUser = await sql`
    SELECT
    user_name,
    user_email
    FROM users
    WHERE user_id = ${user.user_id}
    `;

    if (findUser.length === 0) {
      return res.status(404).json({ success: false, msg: "user it not found" });
    }

    res.status(202).json({ success: true, results: findUser });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { getUserInfo };
