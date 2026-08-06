import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth-route.js";
import refreshTokenRoute from "./routes/refreshToken-route.js";
import toDoRoute from "./routes/todo-route.js";
import userRoute from "./routes/user-route.js";

// this middleware use to verify jwt token
import verifyJwt from "./middleware/verifyJWT.js";

const app = express();

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
app.use("/api/todo", toDoRoute);
app.use("/api/user", userRoute);

export default app;
