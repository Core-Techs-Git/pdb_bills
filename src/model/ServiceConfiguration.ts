/**
 * @module model
 * @packageDocumentation
 */

/**
 * A service configuration properties
 * @typedef {Object} ServiceConfiguration
 */
export type ServiceConfiguration = {
  proxy: boolean;
  protocol: string;
  host: string;
  port?: number;
  path?: string;
  user: string;
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
};
