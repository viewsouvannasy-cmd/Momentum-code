import { connectDB } from "./config/database.js";
import app from "./add.js";

const server = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    app.listen(process.env.PORT || 3000, () => {
      console.log(`server is runing on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("NeonBD connection ERROR!!!", error);
  }
};

server();
