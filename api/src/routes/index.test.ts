import request from 'supertest';
import encodeUrl from '../helpers/encodeurl';
import app from '../app';
import pool from '../db/pool';
import { API_KEY_CLIENT_AUTH } from '../config';

const API_KEY_CLIENT_AUTH_ESCAPED = encodeUrl(API_KEY_CLIENT_AUTH);

/* beforeAll((done) => {
     done();
   }); */

const IsJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (err) {
    return false;
  }
  return true;
};

describe('GET /', () => {
  test('It should response the GET method with status 200, type success, and json format', (done) => {
    request(app)
      .get(`/?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}`)
      .then((response) => {
        expect(response.status).toBe(200);
        expect(IsJsonString(JSON.stringify(response.body))).toBe(true);
        done();
      });
  });
});

describe('GET / - apikey missing', () => {
  test(`It should respond with an http 400, and 'No API key has been provided!'`, async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(400);
    expect(response.body.response.detail).toBe('No API key has been provided!');
  });
});

describe('GET / - apikey invalid', () => {
  test(`It should respond with an http 400, and 'No API key has been provided!'`, async () => {
    const response = await request(app).get(`/?apikey=WrongAPIKey`);
    expect(response.status).toBe(400);
    expect(response.body.response.detail).toBe('The API key provided is not valid!');
  });
});

describe('GET / - apikey undefined', () => {
  test(`It should respond with an http 400, and 'No API key has been provided!'`, async () => {
    const response = await request(app).get(`/?apikey=undefined`);
    expect(response.status).toBe(400);
    expect(response.body.response.detail).toBe('No API key has been provided!');
  });
});

describe('GET /notexists - Route does not exist', () => {
  test(`It should respond with an http 404, and '/notexists endpoint does not exist'`, async () => {
    const response = await request(app).get(`/notexists?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}`);
    expect(response.status).toBe(404);
    expect(response.body.response.detail).toBe('/notexists endpoint does not exist');
  });
});

afterAll((done) => {
  pool.end();
  done();
});
