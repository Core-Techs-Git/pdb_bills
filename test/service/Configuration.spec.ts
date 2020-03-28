/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {get, has} from 'config';

import {Configuration} from '../../src/service/Configuration';
import {ConfigurationError} from '../../src/error/ConfigurationError';
import {ServiceConfiguration} from '../../src/model/ServiceConfiguration';

jest.mock('config', () => ({
  has: jest.fn(),
  get: jest.fn(),
}));

describe('Configuration service', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test('Should return service proxy config if correctly configured', () => {
    const configObject = {
      proxy: false,
      protocol: 'https',
      host: 'hostname.com',
      path: 'something',
      user: 'user',
      password: 'password',
    };

    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue(configObject);

    const config: ServiceConfiguration = new Configuration('test').getServiceConfiguration();

    expect(config).toEqual(configObject);
  });

  test('Should throw an error if service name is missing', done => {
    try {
      new Configuration(undefined);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Missing configuration service name`);
      done();
    }
  });

  test('Should throw an error if service name type is not string', done => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      new Configuration(1);
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Invalid configuration service name`);
      done();
    }
  });

  test("Should throw an error if service protocol config isn't http or https", done => {
    (has as any).mockReturnValue(true);
    (get as any).mockReturnValue({
      protocol: 'wrong',
    });
    try {
      new Configuration('test');
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Invalid protocol for entry 'test' in configuration`);
      done();
    }
  });

  test('Should throw an error if service name entry in config is missing', done => {
    (has as any).mockReturnValue(false);
    try {
      new Configuration('test');
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toBe(`Missing entry 'test' in configuration`);
      done();
    }
  });

  test('Should throw an error if anything goes wrong', done => {
    (has as any).mockReturnValue(true);
    (get as any).mockImplementation(() => {
      throw new Error('test');
    });
    try {
      new Configuration('test');
    } catch (err) {
      expect(err).toBeInstanceOf(ConfigurationError);
      expect(err.message).toMatch(/^An error occured when loading configuration — Error: test/);
      done();
    }
  });

  afterAll(() => {
    jest.unmock('config');
  });
});
