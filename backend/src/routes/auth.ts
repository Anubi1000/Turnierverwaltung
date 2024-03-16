import express from "express";
import logger from "../logger";

const router = express.Router();

router.post("/", (req, res) => {
  logger.debug(`Received auth request from ${req.hostname}`);
  const body: { password: string } = req.body;
  if (!body.password) {
    logger.debug("Auth request didn't contain password");
    res.status(400).send("Password is missing from request");
    return;
  }

  if (body.password === "abc") {
    logger.debug("Auth request contained correct password");
    res.status(200).json({ valid: true });
    return;
  }

  logger.debug("Auth request contained invalid password");
  res.status(401).send("Password is invalid");
});

export default router;
