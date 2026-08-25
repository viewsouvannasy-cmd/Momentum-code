import { Request, Response } from "express";
import { checkPayload } from "../utils/checkPayload.js";
import cloudinary from "../config/cloudinary.js";
import { sql } from "../config/database.js";
import { resourceLimits } from "node:worker_threads";

interface findUserType {
  user_name: string;
  user_email: string;
  create_at: string;
  user_profile: string;
}

const getUserInfo = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);

    const findUser = (await sql`
    SELECT
    user_name,
    user_email,
    created_at,
    user_profile
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

// this is use to upload user profile
const uploadProfile = async (req: Request, res: Response) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const file = req.file;

    if (!file) {
      return res.status(401).json({ msg: "file is not upload" });
    }

    // check that user is already have one profile
    const checkProfile = await sql`
    SELECT
    user_profile,
    image_public_id
    FROM users
    `;
    // if have delete profile from cloudinary
    if (checkProfile[0].user_profile || checkProfile[0].image_public_id) {
      await cloudinary.uploader.destroy(checkProfile[0].image_public_id);
    }

    // convent to base64 and to cloudinary save in folder profiles
    const b64 = file.buffer.toString("base64");
    const dataURI = `data:${file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "profiles",
    });

    // save to database
    await sql`
    UPDATE users
    SET user_profile = ${result.secure_url},
        image_public_id = ${result.public_id}
    WHERE user_id = ${user_id}
    `;

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "internal server error", error });
  }
};

export { getUserInfo, uploadProfile };
