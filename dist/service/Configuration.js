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
const config_1 = require("config");
const inversify_1 = require("inversify");
const error_1 = require("../error");
let Configuration = class Configuration {
    constructor(serviceName) {
        this.setServiceConfiguration(serviceName);
    }
    setServiceConfiguration(serviceName) {
        if (!serviceName)
            throw new error_1.ConfigurationError('Missing configuration service name');
        if (typeof serviceName !== 'string')
            throw new error_1.ConfigurationError('Invalid configuration service name');
        try {
            serviceName = serviceName.toLowerCase();
            if (config_1.has(serviceName)) {
                const config = config_1.get(serviceName);
                if (!/^https?$/.test(config.protocol))
                    throw new error_1.ConfigurationError(`Invalid protocol for entry '${serviceName}' in configuration`);
                this.serviceConfig = {
                    proxy: config.proxy || false,
                    protocol: config.protocol,
                    host: config.host,
                    port: config.port,
                    path: config.path,
                    user: config.user,
                    password: config.password,
                };
            }
            else
                throw new error_1.ConfigurationError(`Missing entry '${serviceName}' in configuration`);
        }
        catch (err) {
            if (err instanceof error_1.ConfigurationError)
                throw err;
            throw new error_1.ConfigurationError(`An error occured when loading configuration — ${err.stack}`);
        }
    }
    getServiceConfiguration() {
        return this.serviceConfig;
    }
};
Configuration = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String])
], Configuration);
exports.Configuration = Configuration;
//# sourceMappingURL=Configuration.js.map