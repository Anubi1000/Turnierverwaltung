import { closeDb } from "./db.js";
import logger from "./logger.js";
import app from "./app.js";

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
