export declare type ServiceConfiguration = {
    proxy: boolean;
    protocol: string;
    host: string;
    port?: number;
    path?: string;
    user: string;
    password: string;
    [prop: string]: any;
};
