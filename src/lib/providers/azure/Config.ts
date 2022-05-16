import { Config } from "../Config";


export class AzureConfig extends Config {
    public static AZURE_LOGS_FORMAT: string;

    public init(): Promise<void> {
        AzureConfig.AZURE_LOGS_FORMAT = '';
    }
}