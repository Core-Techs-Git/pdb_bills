/**
 * @module service
 * @packageDocumentation
 */

import {has, get} from 'config';
import {injectable} from 'inversify';

import {ServiceConfiguration} from '@/model';
import {ConfigurationError} from '@/error';

@injectable()
export class Configuration implements ConfigurationInterface {
  /**
   * Configuration the specify service.
   * @typedef ServiceConfiguration
   * @access protected
   */
  protected serviceConfig: ServiceConfiguration;

  constructor(serviceName: string) {
    this.setServiceConfiguration(serviceName);
  }

  /**
   * Set service configuration property.
   * @param {string} serviceName Name of the service configuration to look for.
   */
  protected setServiceConfiguration(serviceName: string): void {
    if (!serviceName) throw new ConfigurationError('Missing configuration service name');
    if (typeof serviceName !== 'string') throw new ConfigurationError('Invalid configuration service name');
    try {
      serviceName = serviceName.toLowerCase();
      if (has(serviceName)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const config: {[prop: string]: any} = get(serviceName);

        if (!/^https?$/.test(config.protocol)) throw new ConfigurationError(`Invalid protocol for entry '${serviceName}' in configuration`);

        this.serviceConfig = {
          proxy: config.proxy || false,
          protocol: config.protocol,
          host: config.host,
          port: config.port,
          path: config.path,
          user: config.user,
          password: config.password,
        };
      } else throw new ConfigurationError(`Missing entry '${serviceName}' in configuration`);
    } catch (err) {
      if (err instanceof ConfigurationError) throw err;
      throw new ConfigurationError(`An error occured when loading configuration — ${err.stack}`);
    }
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
