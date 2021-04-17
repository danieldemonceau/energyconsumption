import request from 'supertest';
import encodeUrl from '../../helpers/encodeurl';
import app from '../../app';
import pool from '../../db/pool';
import { API_KEY_CLIENT_AUTH } from '../../config';

const API_KEY_CLIENT_AUTH_ESCAPED = encodeUrl(API_KEY_CLIENT_AUTH);

/* beforeAll((done) => {
     done();
   }); */

const IsJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

describe('GET /usages', () => {
  test('It should response the GET method', (done) => {
    request(app)
      .get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}`)
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });
});

describe('GET /usages - return json', () => {
  test('It should respond with an array of usages', async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}`);
    expect(IsJsonString(JSON.stringify(response.body))).toBe(true);
    expect(response.status).toBe(200);
    done();
  });
});

/* describe('GET /usages - return json', () => {
     test('It should respond with an array of usages', async () => {
       return request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&limit=1`).expect(200);
     });
   }); */

/* describe('GET /usages - return 20 results per default', () => {
     test('It should respond with an array of usages', async (done) => {
       const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}`);
       expect(response.body.length).toBe(20);
       expect(response.status).toBe(200);
       done();
     });
   }); */

describe('GET /usages - return 1 result with limit=1', () => {
  test('It should respond with an array of usages', async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&limit=1`);
    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
    done();
  });
});

describe('GET /usages - apikey missing', () => {
  test(`It should respond with an http 400, and 'No API key has been provided!'`, async (done) => {
    const response = await request(app).get('/usages');
    expect(response.status).toBe(400);
    expect(response.body.error.detail).toBe('No API key has been provided!');
    done();
  });
});

describe('GET /usages - limit is not int', () => {
  test(`It should respond with an http 400, and 'Parameter limit is not zero or a positive integer'`, async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&limit=-1`);
    expect(response.status).toBe(400);
    expect(response.body.error.detail).toBe('Parameter limit is not zero or a positive integer');
    done();
  });
});

describe('GET /usages - offset is not int', () => {
  test(`It should respond with an http 400, and 'Parameter offset is not zero or a positive integer'`, async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&offset=-1`);
    expect(response.status).toBe(400);
    expect(response.body.error.detail).toBe('Parameter offset is not zero a positive integer');
    done();
  });
});

describe('GET /usages - from well formatted', () => {
  test(`It should respond with an http 200`, async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&from=2020/01/01 00:00`);
    expect(response.status).toBe(200);
    done();
  });
});

describe('GET /usages - from not well formatted', () => {
  test(`It should respond with an http 400, and 'Parameter from is not in YYYY/MM/DD HH24:MI format'`, async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&from=01/01/2020 00:00`);
    expect(response.status).toBe(400);
    expect(response.body.error.detail).toBe('Parameter from is not in YYYY/MM/DD HH24:MI format');
    done();
  });
});

describe('GET /usages - to well formatted', () => {
  test(`It should respond with an http 200`, async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&to=2021/01/01 00:00`);
    expect(response.status).toBe(200);
    done();
  });
});

describe('GET /usages - to not well formatted', () => {
  test(`It should respond with an http 400, and 'Parameter to is not in YYYY/MM/DD HH24:MI format'`, async (done) => {
    const response = await request(app).get(`/usages?apikey=${API_KEY_CLIENT_AUTH_ESCAPED}&to=01/01/2021 00:00`);
    expect(response.status).toBe(400);
    expect(response.body.error.detail).toBe('Parameter to is not in YYYY/MM/DD HH24:MI format');
    done();
  });
});

afterAll((done) => {
  pool.end();
  done();
});
