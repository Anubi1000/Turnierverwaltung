import express from "express";
import logger from "../logger.js";

const router = express.Router();

router.get("/", (req, res) => {
  logger.debug(`Received ping from ${req.hostname}`);
  res.send("Pong");
});

export default router;
