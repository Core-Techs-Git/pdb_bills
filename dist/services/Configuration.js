"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const error_1 = require("@pdb_bills/services/error");
let Configuration = class Configuration {
    constructor(serviceName, configPath) {
        this.setServiceConfiguration(serviceName, configPath);
    }
    /**
     * Set service configuration property.
     * @param {string} serviceName Name of the service configuration to look for.
     * @param {string} configPath Path of the configuration to be used.
     */
    setServiceConfiguration(serviceName, configPath) {
        if (!serviceName)
            throw new error_1.ConfigurationError('Missing configuration service name.');
        if (typeof serviceName !== 'string')
            throw new error_1.ConfigurationError('Invalid configuration service name.');
        if (!configPath)
            throw new error_1.ConfigurationError('Missing configuration file path.');
        if (typeof configPath !== 'string')
            throw new error_1.ConfigurationError('Invalid configuration file path.');
        let config;
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            config = require(configPath);
        }
        catch (err) {
            throw new error_1.ConfigurationError(err);
        }
        serviceName = serviceName.toLowerCase();
        if (config.hasOwnProperty(serviceName)) {
            this.serviceConfig = {
                name: serviceName,
                protocol: config[serviceName].protocol,
                host: config[serviceName].host,
                port: config[serviceName].port,
                path: config[serviceName].path,
                proxy: config[serviceName].proxy,
                user: config[serviceName].user,
                password: config[serviceName].password,
            };
        }
        else
            throw new error_1.ConfigurationError(`Missing entry '${serviceName}' in configuration file '${configPath}'.`);
    }
    getServiceConfiguration() {
        return this.serviceConfig;
    }
};
Configuration = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String, String])
], Configuration);
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map