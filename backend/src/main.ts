import express from "express";
import { closeDb } from "./db.js";
import logger from "./logger.js";
import ping from "./routes/ping.js";
import auth from "./routes/auth.js";
import tournaments from "./routes/tournaments.js";

const app = express();
app.use(express.json());

app.use("/ping", ping);
app.use("/auth", auth);
app.use("/tournaments", tournaments);

const server = app.listen(8080, () => {
  logger.info("Started");
});

process.on("SIGINT", async () => {
  logger.info("Stopping (SIGINT)");
  server.close();
  await closeDb();
});
process.on("SIGTERM", async () => {
  logger.info("Stopping (SIGTERM)");
  server.close();
  await closeDb();
});
