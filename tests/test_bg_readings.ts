/* global describe test */
import request from 'supertest';
import app from '../src/server/app';
import allTestCases from './cases/bg_readings/cases.json';
import 'dhos-scoring-engine/dist/blood-glucose-banding/interfaces';

allTestCases.forEach(testCase => {
  describe(`Test the /bg_reading path using case ${testCase.id}`, () => {
    test('It should match the expected output', () => {
      return request(app)
        .post('/bg_reading')
        .send(testCase.data)
        .expect(200, testCase.expected);
    });
  });
});

describe(`Test the /bg_reading requires thresholds`, () => {
  test('It should fail a bad call', () => {
    return request(app)
      .post('/bg_reading')
      .send({
        id: 'bg8',
        data: {
          blood_glucose_value: 7.8,
          prandial_tag_id: 'PRANDIAL-TAG-AFTER-BREAKFAST'
        }
      })
      .expect(400);
  });
});
