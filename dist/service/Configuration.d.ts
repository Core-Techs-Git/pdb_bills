import { ServiceConfiguration } from "../model";
export declare class Configuration implements ConfigurationInterface {
    protected serviceConfig: ServiceConfiguration;
    constructor(serviceName: string);
    protected setServiceConfiguration(serviceName: string): void;
    getServiceConfiguration(): ServiceConfiguration;
}
export interface ConfigurationInterface {
    getServiceConfiguration(): ServiceConfiguration;
}
