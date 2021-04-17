import fs from 'fs';
import request from 'supertest';
import path from 'path';
import pool from '../../db/pool';
import app from '../../app';
import { API_KEY_CLIENT_AUTH } from '../../config';

describe('POST /usages', () => {
  test('It should response the POST method', async (done: any) => {
    const sampleShort = path.join(__dirname, '..', '..', '..', '..', 'samples', 'momentum_2005_short.csv');
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

describe('POST /usages', () => {
  test('It should fail the POST method - filenotfound', async (done: any) => {
    const sampleShort = path.join(__dirname, '..', '..', '..', '..', 'samples', 'not_valid.csv');
    const response = await request(app)
      .post('/usages')
      .type('form')
      .field('apikey', `${API_KEY_CLIENT_AUTH}`)
      .field('file', [fs.createReadStream(sampleShort)]);
    expect(response.status).toBe(500);
    expect(response.body.error.title).toBe('Cannot post usages');
    done();
  });
});

afterAll((done) => {
  pool.end();
  done();
});
