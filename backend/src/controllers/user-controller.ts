// library
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import cloudinary from "../config/cloudinary.js";
import { sql } from "../config/database.js";

// helper function
import { checkPayload } from "../utils/checkPayload.js";
import { checkUserPassword } from "../utils/validation.js";

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
      return res.status(401).json({ success: false, msg: "user it not found" });
    }

    res.status(202).json({ results: findUser });
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

// chnage user name
const changeUserName = async (
  req: Request<{}, {}, { new_name: string }>,
  res: Response,
) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { new_name } = req.body;

    // check duplicate name
    const dupicateName = await sql`
        SELECT 
        *
        FROM users
        WHERE user_name = ${new_name}
        `;
    if (dupicateName.length > 0) {
      return res.status(400).json({
        success: false,
        point: "name",
        msg: "This name is already taken",
      });
    }

    await sql`
    UPDATE users
    SET user_name = ${new_name}
    WHERE user_id = ${user_id}
    `;

    res.status(202).json({ success: true, msg: "rename successful" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error", error });
  }
};

// this use to check user password
const checkPassword = async (
  req: Request<
    {},
    { success: boolean; msg: string },
    { user_password: string }
  >,
  res: Response,
) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { user_password } = req.body;

    const checkPwd = await checkUserPassword(user_id, user_password);
    if (!checkPwd) {
      return res
        .status(401)
        .json({ success: false, msg: "password is incorrent" });
    }

    res.status(202).json({ success: true, msg: "corrent password" });
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

const changePassword = async (
  req: Request<{}, {}, { old_password: string; new_password: string }>,
  res: Response,
) => {
  try {
    const user_id = checkPayload(req.user?.user_id);
    const { old_password, new_password } = req.body;

    if (!old_password || !new_password) {
      return res
        .status(400)
        .json({ success: false, point: "all", msg: "input can not be empty" });
    }

    if (old_password.length < 8) {
      return res.status(400).json({
        success: false,
        point: "old-pwd",
        msg: "your password should have characters more then 8 ",
      });
    }

    if (new_password.length < 8) {
      return res.status(400).json({
        success: false,
        point: "new-pwd",
        msg: "your new password should have characters more then 8 ",
      });
    }

    if (old_password.length > 50) {
      return res.status(400).json({
        success: false,
        point: "old-pwd",
        msg: "password can not have characters more then 100 ",
      });
    }

    if (new_password.length > 50) {
      return res.status(400).json({
        success: false,
        point: "old-pwd",
        msg: "password can not have characters more then 100 ",
      });
    }

    // check hash password
    const checkPwd = await checkUserPassword(user_id, old_password);
    if (!checkPwd) {
      return res.status(400).json({
        success: false,
        point: "old-pwd",
        msg: "password is incorrent",
      });
    }

    // hash new password and save to database
    const hashPassword = await bcrypt.hash(new_password, 10);
    await sql`
    UPDATE users
    SET user_password = ${hashPassword}
    WHERE user_id = ${user_id}
    `;

    res.status(202).json({ success: true, point: "btn", msg: "SuccessFul" });
  } catch (error) {
    res.status(500).json({ msg: `internal server error ${error}` });
  }
};

export {
  getUserInfo,
  uploadProfile,
  changeUserName,
  changePassword,
  checkPassword,
};
