const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('alchemy-app routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
});

it('gets list of phantom troupe members', async () => {
  const expected = [{ id: 1, name: 'chrollo', number: 0 }];
  const res = await request(app).post('/api/v1/members').send(expected);

  expected(res.body).toEqual(expected);
});
