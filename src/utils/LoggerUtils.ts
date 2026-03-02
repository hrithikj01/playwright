import winston, { transports } from "winston";
import moment from "moment-timezone";
import path from "path";

const cuurentDir = __dirname;
const srcDir = path.resolve(cuurentDir, "..");
const loggerDir = path.resolve(srcDir, "logging");

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const timezone = "Asia/Kolkata";
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: () => moment().tz(timezone).format() }),
    customFormat,
  ),
  transports: [
    new winston.transports.Console({ level: "debug" }),
    new winston.transports.File({
      filename: path.join(loggerDir, "test_run.log"),
      maxsize: 10 * 1024,
      maxFiles: 1,
      level: "info",
    }),
    new winston.transports.File({
      filename: path.join(loggerDir, "test_error.log"),
      maxsize: 10 * 1024,
      maxFiles: 1,
      level: "error",
    }),
  ],
});

export default logger;
