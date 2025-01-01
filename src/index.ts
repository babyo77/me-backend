import express from "express";
import { errorHandler } from "../handlers/error-handler";
import v1Router from "../router/v1/router";
import { runServer } from "../helper/run-server";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (_req, res) => {
  res.send("Sex");
});
app.use("/api/v1", v1Router);

app.use(errorHandler);

runServer(app);
