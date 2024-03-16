import pino from "pino";

let env = process.env.NODE_ENV || "development";

let level;
if (env == "production") {
  level = "info";
} else {
  level = "debug";
}

const logger = pino({
  level: level,
});

export default logger;
