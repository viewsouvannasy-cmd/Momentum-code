import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth-route.js";
import refreshTokenRoute from "./routes/refreshToken-route.js";
import userRoute from "./routes/user-route.js";
import groupRoute from "./routes/todo/group-route.js";
import taskRoute from "./routes/todo/task-route.js";
import todoDateRoute from "./routes/todo/todo-date-route.js";
import dataRoute from "./routes/todo/todo-data-route.js";

// this middleware use to verify jwt token
import verifyJwt from "./middleware/verifyJwt.js";

const app: Express = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use("/api/todo-date", todoDateRoute);
app.use("/api/user", userRoute);
app.use("/api/todo", dataRoute);

export default app;
