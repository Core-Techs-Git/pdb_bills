/**
 * A service configuration properties
 * @typedef {Object} ServiceConfiguration
 */
export declare type ServiceConfiguration = {
    name: string;
    protocol: string;
    host: string;
    port?: number;
    proxy: boolean;
    user: string;
    password: string;
    [prop: string]: any;
};
