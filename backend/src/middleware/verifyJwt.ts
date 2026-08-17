import { Request, Response, NextFunction } from "express";
import { getAccessTokenSecret } from "../utils/getEnv.js";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: PayloadType;
    }
  }
}

interface PayloadType {
  user_id: number;
  iat: number;
  exp: number;
}

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ msg: "not jwt in athHeader" });
  }

  const token = authHeader.split(" ")[1];

  const accessTokenSecret = getAccessTokenSecret();
  try {
    const payload = jwt.verify(token, accessTokenSecret) as PayloadType;
    req.user = payload;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success_verify_token: false,
      msg: `verify token error ${error}`,
    });
  }
};

export default verifyJwt;
