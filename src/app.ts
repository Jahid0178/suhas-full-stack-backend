import express from "express";
import type { Application } from "express";
import router from "./routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./utils/errorHandler";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(router);

// global error handler
app.use(errorHandler);

export default app;
