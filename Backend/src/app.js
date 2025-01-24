//? This file contains all the configuration for the express app

//? Import modules
import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
import logger from "./utils/logger.utils.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

//? Import routers
import userRouter from "./routes/user.routes.js";

//? Initialize express app
const app = express();

const morganFormat = ":method :url :status :response-time ms";

//? Inject application level middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
//? Logger configuration for better logging info
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/users", userRouter);

//? Error handler
app.use(errorHandler);

//? Export the configured app
export default app;
