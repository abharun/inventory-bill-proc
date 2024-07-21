import { MESSAGES } from "consts";
import cors from "cors";
import { dbHandler } from "database/config";
import dotenv from "dotenv";
import express, { NextFunction } from "express";
import { Logger } from "utils";

dotenv.config();

const app = express();

app
  .use(cors())
  .use(express.json())
  .use("/health", (_req, res) => res.send("OK"));

const dbConnect = (next: NextFunction) => {
  try {
    dbHandler.initialize();
    Logger.info(MESSAGES.MSG_DB_CONNECT_SUCCESS);
    next();
  } catch (err) {
    Logger.error(MESSAGES.MSG_DB_CONNECT_FAILED);
    Logger.info(err);
  }
};

const PORT = process.env.SERVER_PORT || 4000;

dbConnect(() => {
  app.listen(PORT, () => {
    Logger.log(MESSAGES.MSG_SERVER_STARTED);
  });
});

export default app;
