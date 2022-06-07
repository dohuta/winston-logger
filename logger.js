const os = require("os");
const winston = require("winston");
require("winston-daily-rotate-file");

class LoggerBase {
  /**
   *
   * @param {string} serviceName
   * @param {string} logDir
   */
  constructor(serviceName, logDir) {
    this.hostname = os.hostname();

    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      defaultMeta: { service: serviceName },
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: logDir || "./log",
          filename: "%DATE%_ERROR.log",
          level: "error",
        }),
        new winston.transports.DailyRotateFile({
          dirname: logDir || "./log",
          filename: "%DATE%_ALL.log",
        }),
      ],
    });

    if (
      process.env.NODE_ENV !== "production" ||
      process.env.NODE_ENV !== "staging"
    ) {
      this.logger.add(
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.metadata({
              fillExcept: ["timestamp", "service", "level", "message"],
            }),
            winston.format.colorize(),
            this.winstonConsoleFormat()
          ),
        })
      );
    }
  }

  winstonConsoleFormat() {
    return winston.format.printf(({ timestamp, service, level, message }) => {
      return `[${timestamp}][${level}][${service}@${this.hostname}] ${message}`;
    });
  }

  /**
   *
   * @param {string} message
   * @param {*} metadata
   */
  debug(message, metadata) {
    this.logger.debug(message, metadata);
  }

  /**
   *
   * @param {string} message
   * @param {*} metadata
   */
  info(message, metadata) {
    this.logger.info(message, metadata);
  }

  /**
   *
   * @param {string} message
   * @param {*} metadata
   */
  warn(message, metadata) {
    this.logger.warn(message, metadata);
  }

  /**
   *
   * @param {string} message
   * @param {*} metadata
   */
  error(message, metadata) {
    this.logger.error(message, metadata);
  }

  /**
   *
   * @param {string} message
   * @param {*} metadata
   */
  log(level, message, metadata) {
    const metadataObject = {};
    if (metadata) metadataObject.metadata = metadata;

    this.logger[level](message, metadataObject);
  }
}

module.exports = LoggerBase;
