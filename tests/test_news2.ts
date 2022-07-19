/* global describe test */
import request from 'supertest';
import app from '../src/server/app';

import blood_pressure from './cases/news2/blood_pressure.json';
import failures from './cases/news2/failures.json';
import nurse_concern from './cases/news2/nurse_concern.json';
import overall from './cases/news2/overall.json';
import refusedall from './cases/news2/refusedall.json';
import temperature from './cases/news2/temperature.json';
import consciousness from './cases/news2/consciousness.json';
import heart_rate from './cases/news2/heart_rate.json';
import o2_therapy from './cases/news2/o2_therapy.json';
import oxygen_saturation from './cases/news2/oxygen_saturation.json';
import respiratory_rate from './cases/news2/respiratory_rate.json';
import {News2Inputs, News2Response} from "dhos-scoring-engine/dist/interfaces";

interface News2TestData {
  id: string;
  data: Partial<News2Inputs>;
  expected: News2Response | string;
  error?: number;
  filename?: string;
}

function tname(tests: News2TestData[], filename: string): News2TestData[] {
  return tests.map((t): News2TestData => ({...t, filename}));
}

const allTestCases: News2TestData[] = [
    ...tname(blood_pressure, 'blood_pressure'),
    ...tname(consciousness, 'consciousness'),
    ...tname(failures, 'failures'),
    ...tname(heart_rate, 'heart_rate'),
    ...tname(nurse_concern, 'nurse_concern'),
    ...tname(o2_therapy, 'o2_therapy'),
    ...tname(overall, 'overall'),
    ...tname(oxygen_saturation, 'oxygen_saturation'),
    ...tname(refusedall, 'refusedall'),
    ...tname(respiratory_rate, 'respiratory_rate'),
    ...tname(temperature, 'temperature')
];

allTestCases.forEach(testCase => {
  describe(`Test the /news2 path using case ${testCase.id}`, () => {
    test('It should match the expected output', () => {
      return request(app)
        .post('/news2')
        .set('x-request-id', testCase.id)
        .send(testCase.data)
        .expect(testCase.error || 200, testCase.expected);
    });
  });
});
