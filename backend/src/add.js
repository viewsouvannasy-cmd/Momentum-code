import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user-route.js";
import refreshTokenRoute from "./routes/refreshToken-route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/refresh-token", refreshTokenRoute);

export default app;
