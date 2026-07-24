import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const sql = neon(process.env.NEONDB_URL);

const connectDB = async () => {
  try {
    const result = await sql`SELECT NOW()`;

    console.log("NeonBD connected!!", result[0].now);
  } catch (error) {
    console.log("NeonBD connection ERROR!!!", error);
    process.exit(1);
  }
};

export { connectDB, sql };
