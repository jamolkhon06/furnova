import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

mongoose
  .connect(process.env.MONGO_URL as string, {})
  .then((data) => {
    console.log("Successfully connected to MongoDB");
    const PORT = process.env.PORT ?? 3005;
    app.listen(PORT, () => {
      console.info(`The server is running successfully on PORT: ${PORT}`);
      console.info(
        `Admin Project is running on http://localhost:${PORT}/admin \n`,
      );
    });
  })
  .catch((err) => console.error(`ERROR on connection to MongoDB: ${err}`));
