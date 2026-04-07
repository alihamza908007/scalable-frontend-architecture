type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private log(level: LogLevel, message: string, data?: any) {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };

    // In production, send to monitoring service
    if (process.env.NODE_ENV === "production") {
      // Example: send to Sentry, LogRocket, etc.
      console.log(JSON.stringify(entry));
    } else {
      console[level](message, data || "");
    }
  }

  debug(message: string, data?: any) {
    this.log("debug", message, data);
  }

  info(message: string, data?: any) {
    this.log("info", message, data);
  }

  warn(message: string, data?: any) {
    this.log("warn", message, data);
  }

  error(message: string, data?: any) {
    this.log("error", message, data);
  }
}

export const logger = new Logger();
