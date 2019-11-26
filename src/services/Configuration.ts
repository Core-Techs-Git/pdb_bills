import {injectable} from 'inversify';

import {ServiceConfiguration} from '@pdb_bills/models';
import {ConfigurationError} from '@pdb_bills/services/error';

@injectable()
export class Configuration implements ConfigurationInterface {
  /**
   * Configuration the specify service.
   * @typedef ServiceConfiguration
   * @access protected
   */
  protected serviceConfig: ServiceConfiguration;

  constructor(serviceName: string, configPath: string) {
    this.setServiceConfiguration(serviceName, configPath);
  }

  /**
   * Set service configuration property.
   * @param {string} serviceName Name of the service configuration to look for.
   * @param {string} configPath Path of the configuration to be used.
   */
  protected setServiceConfiguration(serviceName: string, configPath: string): void {
    if (!serviceName) throw new ConfigurationError('Missing configuration service name.');
    if (typeof serviceName !== 'string') throw new ConfigurationError('Invalid configuration service name.');
    if (!configPath) throw new ConfigurationError('Missing configuration file path.');
    if (typeof configPath !== 'string') throw new ConfigurationError('Invalid configuration file path.');

    let config;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      config = require(configPath);
    } catch (err) {
      throw new ConfigurationError(err);
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
    } else throw new ConfigurationError(`Missing entry '${serviceName}' in configuration file '${configPath}'.`);
  }

  getServiceConfiguration(): ServiceConfiguration {
    return this.serviceConfig;
  }
}

/**
 * Configuration loader.
 */
export interface ConfigurationInterface {
  /**
   * Read the parameters for a service.
   * @returns {ServiceConfiguration} Configuration of the specify service.
   */
  getServiceConfiguration(): ServiceConfiguration;
}
