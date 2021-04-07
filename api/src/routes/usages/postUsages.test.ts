import fs from 'fs';
import request from 'supertest';
import path from 'path';
import pool from '../../db/pool';
import app from '../../app';
import { API_KEY_CLIENT_AUTH } from '../../config';

describe('POST /usages', () => {
  test('It should response the POST method', async (done: any) => {
    const sampleShort = path.join(__dirname, '..', '..', '..', '..', 'samples', '2005_short.csv');
    const response = await request(app)
      .post('/usages')
      .type('form')
      .field('apikey', `${API_KEY_CLIENT_AUTH}`)
      .field('file', [fs.createReadStream(sampleShort)]);
    expect(response.status).toBe(200);
    expect(response.body.msg).toBe('File uploaded/import successfully!');
    done();
  });
});

afterAll((done) => {
  pool.end();
  done();
});
