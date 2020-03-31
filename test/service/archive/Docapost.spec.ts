/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import {get, has} from 'config';

import {Docapost} from '../../../src/service/archive/Docapost';
import {ServiceConfiguration} from '../../../src/model/ServiceConfiguration';
import {authenticate, searchOne} from '../../fixture/docapost/data';
import {ValidationError} from '../../../src/error/ValidationError';

jest.mock('config', () => ({
  has: jest.fn(),
  get: jest.fn(),
}));

describe('Docapost service', () => {
  describe('searchOne', () => {
    test('Should return the requested document', done => {
      const conf = {
        proxy: false,
        protocol: 'https',
        host: 'hostname.com',
        path: 'something',
        user: 'user',
        password: 'password',
      };

      (has as any).mockReturnValue(true);
      (get as any).mockReturnValue(conf);

      const config = {
        getServiceConfiguration: (): ServiceConfiguration => conf,
      };

      const requester = jest.fn(() => ({
        post: jest
          .fn()
          .mockImplementationOnce((uri, cb) => {
            cb(null, null, authenticate.ok);
          })
          .mockImplementationOnce((uri, cb) => {
            cb(null, null, searchOne.docapostResponse.ok);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive.searchOne(1).then(doc => {
        expect(doc).toEqual(searchOne.billsResponse.ok);
        done();
      });
    });

    test('Should throw an error if docID is invalid', done => {
      const config = {
        getServiceConfiguration: jest.fn(() => ({user: 'user', password: 'password'})),
      };

      const requester = jest.fn(() => ({
        post: jest
          .fn()
          .mockImplementationOnce((uri, cb) => {
            cb(null, null, authenticate.ok);
          })
          .mockImplementationOnce((uri, cb) => {
            cb(null, null, searchOne.docapostResponse.ok);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .searchOne('wrong')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((doc: string) => {
          done('No error was thrown');
        })
        .catch(err => {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.message).toBe('Invalid docID — wrong');
          done();
        });
    });
  });
});
