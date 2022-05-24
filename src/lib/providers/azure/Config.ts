import { Config } from "../Config";

export class AzureConfig extends Config {
    public static AZURE_LOG_LEVEL: string = 'debug';
    public static AZURE_LOG_FORMAT: string = '[%d{yyy-MM-dd hh:mm:ss}] %p: %m%n';

    public async init(): Promise<void> {
        AzureConfig.AZURE_LOG_LEVEL = process.env.AZURE_LOG_LEVEL || AzureConfig.AZURE_LOG_LEVEL;
        AzureConfig.AZURE_LOG_FORMAT = process.env.AZURE_LOG_FORMAT || AzureConfig.AZURE_LOG_FORMAT;
    }
}
