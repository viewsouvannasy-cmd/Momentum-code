import { Request, Response, NextFunction } from "express";

import { getNodeMode } from "../utils/getEnv.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof Error) {
    return res.status(500).json({
      msg:
        getNodeMode() === "production" ? "internal server error" : err.message,
    });
  }

  res.status(500).json({ msg: "internal server error" });
};
