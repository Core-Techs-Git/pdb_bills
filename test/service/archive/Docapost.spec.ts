/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

import {DocumentDTO} from '../../../src/model//DocumentDTO';
import {Docapost} from '../../../src/service/archive/Docapost';
import {authenticate, searchOne, searchMany} from '../../fixture/docapost/data';
import {BillError} from '../../../src/error/BillError';
import {ValidationError} from '../../../src/error/ValidationError';
import {AuthenticationError} from '../../../src/error/AuthenticationError';

jest.mock('config', () => ({
  has: jest.fn(),
  get: jest.fn(),
}));

describe('Docapost service', () => {
  describe('searchOne', () => {
    test('Should return the requested document', (done) => {
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
      archive.searchOne(1).then((doc) => {
        expect(doc).toEqual(searchOne.billsResponse.ok);
        done();
      });
    });

    test('Should throw an error if docID is invalid', (done) => {
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
        .catch((err) => {
          expect(err).toBeInstanceOf(ValidationError);
          expect(err.message).toBe('Invalid docID — wrong');
          done();
        });
    });

    test('Should throw an error if request went wrong', (done) => {
      const requestError = 'Something went wrong';

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
            cb(requestError, null, null);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchOne(1)
        .then((doc) => {
          done(`No error was thrown — doc: ${doc}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(BillError);
          expect(err.message).toBe(requestError);
          done();
        });
    });

    test('Should throw an error if parsing requested data went wrong', (done) => {
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
            cb(null, null, null);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchOne(1)
        .then((doc) => {
          done(`No error was thrown — doc: ${doc}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(BillError);
          expect(err.message).toBe("Cannot read property 'toString' of null");
          done();
        });
    });

    test('Should throw an error if authentication token is invalid', (done) => {
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
            cb(null, null, searchOne.docapostResponse.ko);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchOne(1)
        .then((doc) => {
          done(`No error was thrown — doc: ${doc}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(AuthenticationError);
          expect(err.message).toBe('token invalid, authentication failed.');
          done();
        });
    });

    test('Should throw an error if anything went wrong when getting data', (done) => {
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
            cb(null, null, searchOne.docapostResponse.ko2);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchOne(1)
        .then((doc) => {
          done(`No error was thrown — doc: ${doc}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(BillError);
          expect(err.message).toBe("Cannot read property '0' of undefined");
          done();
        });
    });

    test('Should throw an error if anything went wrong when authenticating', (done) => {
      const requestError = 'Something went wrong';

      const config = {
        getServiceConfiguration: jest.fn(() => ({user: 'user', password: 'password'})),
      };

      const requester = jest.fn(() => ({
        post: jest.fn().mockImplementationOnce((uri, cb) => {
          cb(requestError, null, null);
        }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchOne(1)
        .then((doc) => {
          done(`No error was thrown — doc: ${doc}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(AuthenticationError);
          expect(err.message).toBe(requestError);
          done();
        });
    });
  });

  describe('searchMany', () => {
    test('Should return the requested documents', (done) => {
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
            cb(null, null, searchMany.docapostResponse.ok);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive.searchMany(searchMany.queries.ok).then((docs: DocumentDTO[]) => {
        expect(docs).toEqual(searchMany.billsResponse.ok);
        done();
      });
    });

    test('Should return delivery typed documents if none specified', (done) => {
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
            cb(null, null, searchMany.docapostResponse.ok3);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive.searchMany({}).then((docs: DocumentDTO[]) => {
        expect(docs).toEqual(searchMany.billsResponse.ok3);
        done();
      });
    });

    test('Should return an empty array if requested documents were not found', (done) => {
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
            cb(null, null, searchMany.docapostResponse.ok2);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive.searchMany({}).then((docs: DocumentDTO[]) => {
        expect(docs).toEqual([]);
        done();
      });
    });

    test('Should throw an error if query is invalid', (done) => {
      const validationError = 'Validation failed';

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
            cb(null, null, searchMany.docapostResponse.ok);
          }),
      }));

      const validator = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        validate: jest.fn().mockImplementationOnce((query) => {
          throw new Error(validationError);
        }),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        .searchMany({})
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((docs: DocumentDTO[]) => {
          done(`No error was thrown — docs: ${docs}`);
        })
        .catch((err) => {
          expect(err.message).toBe(validationError);
          done();
        });
    });

    test('Should throw an error if request went wrong', (done) => {
      const requestError = 'Something went wrong';

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
            cb(requestError, null, null);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchMany({})
        .then((docs: DocumentDTO[]) => {
          done(`No error was thrown — docs: ${docs}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(BillError);
          expect(err.message).toBe(requestError);
          done();
        });
    });

    test('Should throw an error if parsing requested data went wrong', (done) => {
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
            cb(null, null, null);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchMany({})
        .then((docs: DocumentDTO[]) => {
          done(`No error was thrown — doc: ${docs}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(BillError);
          expect(err.message).toBe("Cannot read property 'toString' of null");
          done();
        });
    });

    test('Should throw an error if authentication token is invalid', (done) => {
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
            cb(null, null, searchMany.docapostResponse.ko);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchMany({})
        .then((docs: DocumentDTO[]) => {
          done(`No error was thrown — doc: ${docs}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(AuthenticationError);
          expect(err.message).toBe('token invalid, authentication failed.');
          done();
        });
    });

    test('Should throw an error if anything went wrong when getting data', (done) => {
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
            cb(null, null, searchMany.docapostResponse.ko2);
          }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchMany({})
        .then((docs: DocumentDTO[]) => {
          done(`No error was thrown — doc: ${docs}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(BillError);
          expect(err.message).toBe("Cannot read property '0' of undefined");
          done();
        });
    });

    test('Should throw an error if anything went wrong when authenticating', (done) => {
      const requestError = 'Something went wrong';

      const config = {
        getServiceConfiguration: jest.fn(() => ({user: 'user', password: 'password'})),
      };

      const requester = jest.fn(() => ({
        post: jest.fn().mockImplementationOnce((uri, cb) => {
          cb(requestError, null, null);
        }),
      }));

      const validator = {
        validate: jest.fn(),
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const archive: Docapost = new Docapost(config, requester('test'), validator);
      archive
        .searchMany({})
        .then((docs: DocumentDTO[]) => {
          done(`No error was thrown — doc: ${docs}`);
        })
        .catch((err) => {
          expect(err).toBeInstanceOf(AuthenticationError);
          expect(err.message).toBe(requestError);
          done();
        });
    });
  });
});
