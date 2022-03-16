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

  it('creates a member', async () => {
    const expected = {
      name: 'Shizuku',
      number: 8,
    };
    const res = await request(app).post('/api/v1/members').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  // it('gets list of phantom troupe members', async () => {
  //   const expected = [
  //     { id: 1, name: 'Chrollo', number: 0 },
  //     { id: 2, name: 'Feitan', number: 2 },
  //   ];
  //   const res = await request(app).get('/api/v1/members').send(expected);

  //   expect(res.body).toEqual(expected);
  // });
});
