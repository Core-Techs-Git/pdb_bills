import 'reflect-metadata';

import {ValidationError} from '../../../src/error/ValidationError';
import {SearchOptionsDTOValidator} from '../../../src/service/validator/SearchOptionsDTOValidator';

describe('SearchOptionsDTO validator service', () => {
  test('Should not throw any errors if data is empty', () => {
    const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
    expect(() => {
      validator.validate({});
    }).not.toThrow();
  });

  test('Should throw an error if start date provided is invalid', done => {
    try {
      const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
      validator.validate({start: '-1'});
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe(`Invalid start option – -1`);
      done();
    }
  });

  test('Should throw an error if numDocument provided is invalid', done => {
    try {
      const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
      validator.validate({numDocument: 'wrong'});
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe(`Invalid numDocument option – wrong`);
      done();
    }
  });

  test('Should throw an error if priceFrom provided is invalid', done => {
    try {
      const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
      validator.validate({priceFrom: 'wrong'});
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe(`Invalid priceFrom option – wrong`);
      done();
    }
  });

  test('Should throw an error if priceTo provided is invalid', done => {
    try {
      const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
      validator.validate({priceTo: 'wrong'});
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe(`Invalid priceTo option – wrong`);
      done();
    }
  });

  test('Should throw an error if depot code provided is invalid', done => {
    try {
      const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
      // eslint-disable-next-line @typescript-eslint/camelcase
      validator.validate({code_depot: 'wrong'});
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe(`Invalid code_depot option – wrong`);
      done();
    }
  });

  test('Should throw an error if dateFrom provided is invalid', done => {
    try {
      const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
      validator.validate({dateFrom: 'wrong'});
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe(`Invalid dateFrom option – wrong`);
      done();
    }
  });

  test('Should throw an error if dateTo provided is invalid', done => {
    try {
      const validator: SearchOptionsDTOValidator = new SearchOptionsDTOValidator();
      validator.validate({dateTo: 'wrong'});
    } catch (err) {
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.message).toBe(`Invalid dateTo option – wrong`);
      done();
    }
  });
});
