type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

class Logger {
  private log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
  ) {
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

  debug(message: string, data?: Record<string, unknown>) {
    this.log("debug", message, data);
  }

  info(message: string, data?: Record<string, unknown>) {
    this.log("info", message, data);
  }

  warn(message: string, data?: Record<string, unknown>) {
    this.log("warn", message, data);
  }

  error(message: string, data?: Record<string, unknown>) {
    this.log("error", message, data);
  }
}

export const logger = new Logger();
