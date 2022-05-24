import { CloudContainer } from "./Container";
import { ILogger, AbstractLogger } from "../common/Logging"

export class LoggerFactory extends CloudContainer {
    public static resolve(provider: string, args: { [key: string]: any; } = {}): ILogger {
        return CloudContainer.resolve(provider, AbstractLogger, args) as ILogger;
    }
}
