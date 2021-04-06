// we will use supertest to test HTTP requests/responses
import request from 'supertest';
// we also need our app for the correct routes!
import app from '../../app';
import pool from '../../db/pool';

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
      .get('/usages?apikey=i4%230R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd')
      .then((response) => {
        expect(response.status).toBe(200);
        done();
      });
  });
});

describe('GET /usages - return json', () => {
  test('It should respond with an array of usages', async (done) => {
    const response = await request(app).get('/usages?apikey=i4%230R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd');
    expect(IsJsonString(JSON.stringify(response.body))).toBe(true);
    expect(response.status).toBe(200);
    done();
  });
});

/* describe('GET /usages - return json', () => {
     test('It should respond with an array of usages', async () => {
       return request(app).get('/usages?apikey=i4%230R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd&limit=1').expect(200);
     });
   }); */

/* describe('GET /usages - return 20 results per default', () => {
     test('It should respond with an array of usages', async (done) => {
       const response = await request(app).get('/usages?apikey=i4%230R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd');
       expect(response.body.length).toBe(20);
       expect(response.status).toBe(200);
       done();
     });
   }); */

describe('GET /usages - return 1 result with limit=1', () => {
  test('It should respond with an array of usages', async (done) => {
    const response = await request(app).get('/usages?apikey=i4%230R2brAF9q0E$swOjtS0mBNY3lM8w3YUJQSSd&limit=1');
    expect(response.body.length).toBe(1);
    expect(response.status).toBe(200);
    done();
  });
});

describe('GET /usages - apikey missing', () => {
  test(`It should respond with an http 400, and 'No API key has been provided!'`, async (done) => {
    const response = await request(app).get('/usages');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No API key has been provided!');
    done();
  });
});

afterAll((done) => {
  pool.end();
  done();
});
