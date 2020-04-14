/* eslint-disable @typescript-eslint/no-explicit-any */
import {serviceDoc, serviceSearch} from '../src';
import {ValidationError} from '../src/error/ValidationError';
import {searchOne, authenticate, searchMany} from './fixture/docapost/data';

jest.mock('config', () => ({
  has: jest.fn().mockReturnValue(true),
  get: jest.fn().mockReturnValue({
    proxy: false,
    protocol: 'https',
    user: 'user',
    password: 'password',
  }),
}));

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
jest.mock('@core-techs-git/pdb_requester', () => () => ({
  post: jest
    .fn()
    .mockImplementationOnce((uri, cb) => {
      cb(null, null, authenticate.ok);
    })
    .mockImplementationOnce((uri, cb) => {
      cb(null, null, searchOne.docapostResponse.ok);
    })
    .mockImplementationOnce((uri, cb) => {
      cb(null, null, authenticate.ok);
    })
    .mockImplementationOnce((uri, cb) => {
      cb(null, null, searchMany.docapostResponse.ok);
    }),
}));

describe('PDB Bills', () => {
  describe('serviceDoc', () => {
    test('Should return the requested document', (done) => {
      serviceDoc(1, (err, doc) => {
        expect(doc).toEqual(searchOne.billsResponse.ok);
        done(err);
      });
    });

    test('Should throw an error if required archive name is missing', (done) => {
      serviceDoc(
        1,
        (err) => {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.message).toBe('Invalid archiveName option – missing');
          done();
        },
        'missing',
      );
    });

    test('Should throw an error if something went wrong on archive searchOne', (done) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      serviceDoc('wrong', (err) => {
        expect(err).toBeInstanceOf(ValidationError);
        expect(err.message).toBe('Invalid docID — wrong');
        done();
      });
    });
  });

  describe('serviceSearch', () => {
    test('Should return the requested documents', (done) => {
      serviceSearch(searchMany.queries.ok, (err, docs) => {
        expect(docs).toEqual(searchMany.billsResponse.ok);
        done(err);
      });
    });

    test('Should throw an error if required archive name is missing', (done) => {
      serviceSearch(
        {},
        (err) => {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.message).toBe('Invalid archiveName option – missing');
          done();
        },
        'missing',
      );
    });

    test('Should throw an error if something went wrong on archive searchMany', (done) => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      serviceSearch({code_depot: 'wrong'}, (err) => {
        expect(err).toBeInstanceOf(ValidationError);
        done();
      });
    });
  });
});
