/* global describe test */
import request from 'supertest';
import app from '../src/server/app';

describe('Test the /running path', () => {
  test('It should respond to a GET', () => {
    return request(app)
      .get('/running')
      .expect(200);
  });
});

describe('Test the /rule_definition path', () => {
  test('It should return success to a valid GET', () => {
    return request(app)
      .get('/rule_definition/scoreObsSetNews2.bundle.js')
      .expect(200);
  });
});

describe('Test the /rule_definition path', () => {
  test('It should return not found to a bad GET', () => {
    return request(app)
      .get('/rule_definition/scoreObsSetNews2.bundle')
      .expect(404);
  });
});
