/* eslint-disable no-undef */
import '../../src/setup.js';
import supertest from 'supertest';
import faker from 'faker';

import { createUser } from '../factories/userFactory.js';
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

describe('POST /sign-up', () => {
  function generateBody({ name, email, password } = {}) {
    return {
      name: name || faker.name.findName(),
      email: email || faker.internet.email(),
      password: password || '123456',
    };
  }
  it('should answer with status 400 when body is invalid', async () => {
    const response = await supertest(app).post('/sign-up').send(invalidBody);
    expect(response.status).toEqual(400);
  });
  it('should answer with status 409 when email is already registered', async () => {
    const email = 'testing@testing.com';

    const body = generateBody({ email });

    await createUser({ email });

    const response = await supertest(app).post('/sign-up').send(body);
    expect(response.status).toEqual(409);
  });
  it('should answer with status 201 when body is valid', async () => {
    const body = generateBody();

    const response = await supertest(app).post('/sign-up').send(body);
    expect(response.status).toEqual(201);
  });
});

describe('POST /sign-in', () => {
  function generateBody({ name, email, password } = {}) {
    return {
      name: name || faker.name.findName(),
      email: email || faker.internet.email(),
      password: password || '123456',
    };
  }
  it('should answer with status 400 when body is invalid', async () => {
    const response = await supertest(app).post('/sign-in').send(invalidBody);
    expect(response.status).toEqual(400);
  });
  it('should answer with status 401 when email is not registered', async () => {
    const body = generateBody();

    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toEqual(401);
  });
  it('should answer with status 401 when email registered but the user gives an wrong password', async () => {
    const body = generateBody();

    await createUser({ email: body.email, password: '12' });

    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toEqual(401);
  });
  it('should answer with status 200 when email exists and password is correct', async () => {
    const body = generateBody();

    await createUser(body);

    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toEqual(200);
  });
});
