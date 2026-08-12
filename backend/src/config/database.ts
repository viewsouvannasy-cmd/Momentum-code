import { neon } from "@neondatabase/serverless";
import { getNeonUrl } from "../utils/getEnv.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const neonUrl = getNeonUrl();
const sql = neon(neonUrl);

const connectDB = async () => {
  try {
    console.time();
    const result = await sql`SELECT NOW()`;
    console.timeEnd();

    console.log("NeonBD connected!!", result[0].now);
  } catch (error) {
    console.log("NeonBD connection ERROR!!!", error);
    process.exit(1);
  }
};

export { connectDB, sql };
