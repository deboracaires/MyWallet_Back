/* eslint-disable no-bitwise */
/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker';

import { createToken } from '../factories/userFactory.js';
import { createFinancialEvent } from '../factories/financialEventFactory.js';
import { clearDatabase, closeConnection } from '../utils/database.js';

import app from '../../src/app.js';

const invalidBody = {};

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

describe('POST /financial-events', () => {
  function generateBody({ value, type, description } = {}) {
    return {
      value: value || ((Math.random() * 1000000000) << 0),
      type: type || ['INCOME', 'OUTCOME'][((Math.random() * 2) << 0)],
      description: description || faker.lorem.words(6),
    };
  }
  it('should answer with status 401 when no token is given', async () => {
    const body = generateBody();

    const response = await supertest(app).post('/financial-events').send(body);
    expect(response.status).toEqual(401);
  });
  it('should answer with status 401 when token is given but is invalid', async () => {
    const body = generateBody();

    const response = await supertest(app).post('/financial-events').send(body).set('Authorization', 'Bearer invalid_token');
    expect(response.status).toEqual(401);
  });
  it('should answer with status 400 when body is invalid and is given a valid token', async () => {
    const { token } = await createToken();

    const response = await supertest(app).post('/financial-events').send(invalidBody).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });
  it('should answer with status 400 when type of event is invalid', async () => {
    const { token } = await createToken();

    const body = generateBody({ type: 'invalid' });
    const response = await supertest(app).post('/financial-events').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });
  it('should answer with status 400 when value given is negative', async () => {
    const { token } = await createToken();

    const body = generateBody({ value: -25 });
    const response = await supertest(app).post('/financial-events').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(400);
  });
  it('should answer with status 201 when body and token are valid', async () => {
    const { token } = await createToken();

    const body = generateBody();
    const response = await supertest(app).post('/financial-events').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
});

describe('GET /financial-events', () => {
  it('should answer with status 401 when no token is given', async () => {
    const response = await supertest(app).get('/financial-events-history');
    expect(response.status).toEqual(401);
  });
  it('should answer with status 401 when invalid token is given', async () => {
    const response = await supertest(app).get('/financial-events-history').set('Authorization', `Bearer ${'ata'}`);
    expect(response.status).toEqual(401);
  });
  it('should answer with status 200 when token is valid and given', async () => {
    const { token } = await createToken();

    const response = await supertest(app).get('/financial-events-history').set('Authorization', `Bearer ${token}`);
    expect(response.status).toEqual(200);
  });
  it('should answer with all financial events when token is valid and given', async () => {
    const { user, token } = await createToken();
    const event = await createFinancialEvent(user);
    const response = await supertest(app).get('/financial-events-history').set('Authorization', `Bearer ${token}`);

    expect(response.body).toEqual([event]);
  });
});
