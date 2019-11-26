/**
 * A service configuration properties
 * @typedef {Object} ServiceConfiguration
 */
export type ServiceConfiguration = {
  name: string;
  protocol: string;
  host: string;
  port?: number;
  proxy: boolean;
  user: string;
  password: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;
};
