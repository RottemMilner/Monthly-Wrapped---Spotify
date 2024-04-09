import pino from "pino";

const logger = pino({
  level: "debug",
  // level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
    },
  },
});

export default logger;
