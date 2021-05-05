/* eslint-disable no-console */

export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug,
  Log,
}

export type LogOutput = (
  source: string | undefined,
  level: LogLevel,
  message: string,
  ...data: unknown[]
) => void;

export class Logger {
  static level = LogLevel.Log;
  static outputs: LogOutput[] = [];
  static showTimestamp = true;

  static enableProductionMode(): void {
    Logger.level = LogLevel.Warning;
  }

  private constructor(protected source?: string) {
    if (source) this.source = source.toUpperCase();
  }

  log(message: string, ...data: unknown[]): void {
    this.doLog(console.log, LogLevel.Log, message, data);
  }

  debug(message: string, ...data: unknown[]): void {
    this.doLog(console.debug, LogLevel.Debug, message, data);
  }

  info(message: string, ...data: unknown[]): void {
    this.doLog(console.info, LogLevel.Info, message, data);
  }

  warn(message: string, ...data: unknown[]): void {
    this.doLog(console.warn, LogLevel.Warning, message, data);
  }

  error(message: string, ...data: unknown[]): void {
    this.doLog(console.error, LogLevel.Error, message, data);
  }

  protected timestamp(): string {
    return `[${new Date().toISOString()}]`;
  }

  private doLog(
    func: (...args: unknown[]) => void,
    level: LogLevel,
    message: string,
    data: unknown[]
  ) {
    if (level > Logger.level) {
      return;
    }

    const log = this.build(level, message, data);

    func.apply(console, log);

    this.applyLoggerOutpus(level, message, data);
  }

  private build(level: LogLevel, message: string, data: unknown[]): unknown[] {
    const title: string = LogLevel[level].toUpperCase();
    let background: string;

    switch (level) {
      case LogLevel.Debug:
        background = '#A8CC8C';
        break;
      case LogLevel.Info:
        background = '#71BEF2';
        break;
      case LogLevel.Warning:
        background = '#DBAB79';
        break;
      case LogLevel.Error:
        background = '#E88388';
        break;
      default:
        background = '#B9BFCA';
        break;
    }

    const result: unknown[] = [];
    const printTime = Logger.showTimestamp ? `${this.timestamp()} ` : '';

    result.push(`${printTime}%c${title}`);
    result.push(
      `background: ${background}; color: #000; padding: 2px 0.5em; border-radius: 0.5em;`
    );
    if (this.source) result.push(`${this.source}:`);
    result.push(message);

    return result.concat(data);
  }

  private applyLoggerOutpus(level: LogLevel, message: string, data: unknown[]) {
    Logger.outputs.forEach((output) => {
      output.apply(output, [this.source, level, message, ...data]);
    });
  }

  static create(name?: string): Logger {
    return new Logger(name);
  }
}
