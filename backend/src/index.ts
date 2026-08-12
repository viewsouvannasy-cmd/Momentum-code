import { connectDB } from "./config/database.js";
import { getPort } from "./utils/getEnv.js";
import app from "./add.js";

const server = async () => {
  try {
    await connectDB();

    const port = getPort();
    app.listen(port || 3000, () => {
      console.log(`server is runing on port ${port}`);
    });
  } catch (error) {
    console.log("NeonBD connection ERROR!!!", error);
  }
};

server();
