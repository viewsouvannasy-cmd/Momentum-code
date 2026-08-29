import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth-route.js";
import refreshTokenRoute from "./routes/refreshToken-route.js";
import userRoute from "./routes/user-route.js";
import groupRoute from "./routes/todo/group-route.js";
import taskRoute from "./routes/todo/task-route.js";
import taskDateRoute from "./routes/todo/task-date-route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getClientHost } from "./utils/getEnv.js";

// this middleware use to verify jwt token
import verifyJwt from "./middleware/verifyJwt.js";

const app: Express = express();

app.use(
  cors({
    origin: getClientHost(),
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/refresh-token", refreshTokenRoute);

app.use(verifyJwt);
app.use("/api/group", groupRoute);
app.use("/api/task", taskRoute);
app.use("/api/task-date", taskDateRoute);
app.use("/api/user", userRoute);

// error handler
app.use(errorHandler);

export default app;
