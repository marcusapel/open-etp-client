import { CloudContainer } from "./Container";

export interface IConfig {
    init(): Promise<void>;
}

export abstract class Config implements IConfig {
    public static CLOUDPROVIDER?: string;

    public abstract init(): Promise<void>;

    public static setCloudProvider(cloudProvider: string | undefined) {
        Config.CLOUDPROVIDER = cloudProvider;
        if (!Config.CLOUDPROVIDER) {
            throw (new Error(
                'The \"CLOUDPROVIDER\" environment variable has not been set'));
        }
    }
}

export class ConfigFactory extends CloudContainer {
    public static build(itemKey: string, args: { [key: string]: any; } = {}): IConfig {
        return CloudContainer.resolve(itemKey, args) as IConfig;
    }
}