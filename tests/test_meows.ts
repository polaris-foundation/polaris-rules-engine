/* global describe test */
import request from "supertest";
import app from "../src/server/app";
import {MeowsInputs, MeowsResponse} from "dhos-scoring-engine/dist/interfaces";

import diastolic_blood_pressure from './cases/meows/diastolic_blood_pressure.json';
import systolic_blood_pressure from './cases/meows/systolic_blood_pressure.json';
import failures from './cases/meows/failures.json';
import nurse_concern from './cases/meows/nurse_concern.json';
import overall from './cases/meows/overall.json';
import refusedall from './cases/meows/refusedall.json';
import temperature from './cases/meows/temperature.json';
import consciousness from './cases/meows/consciousness.json';
import heart_rate from './cases/meows/heart_rate.json';
import oxygen_saturation from './cases/meows/oxygen_saturation.json';
import respiratory_rate from './cases/meows/respiratory_rate.json';

interface MeowsTestData {
  id: string;
  data: Partial<MeowsInputs>;
  expected: MeowsResponse | string;
  error?: number;
  filename?: string;
}

function tname(tests: MeowsTestData[], filename: string): MeowsTestData[] {
  return tests.map((t): MeowsTestData => ({...t, filename}));
}

const allTestCases: MeowsTestData[] = [
    ...tname(diastolic_blood_pressure, 'diastolic_blood_pressure'),
    ...tname(systolic_blood_pressure, 'systolic_blood_pressure'),
    ...tname(consciousness, 'consciousness'),
    ...tname(failures, 'failures'),
    ...tname(heart_rate, 'heart_rate'),
    ...tname(nurse_concern, 'nurse_concern'),
    ...tname(overall, 'overall'),
    ...tname(oxygen_saturation, 'oxygen_saturation'),
    ...tname(refusedall, 'refusedall'),
    ...tname(respiratory_rate, 'respiratory_rate'),
    ...tname(temperature, 'temperature')
];

allTestCases.forEach(testCase => {
  describe(`Test the /meows path using case ${testCase.id}`, () => {
    test("It should match the expected output", () => {
      return request(app)
        .post("/meows")
        .set("x-request-id", testCase.id)
        .send(testCase.data)
        .expect(testCase.error || 200, testCase.expected);
    });
  });
});
