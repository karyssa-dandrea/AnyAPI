const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Member = require('../lib/models/Member');

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

  it('gets list of phantom troupe members', async () => {
    const expected = await Member.findAll();
    const res = await request(app).get('/api/v1/members');

    expect(res.body).toEqual(expected);
  });

  it('gets a member by id', async () => {
    const expected = await Member.findById(1);
    const res = await request(app).get(`/api/v1/members/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });

  it('updates a member by id', async () => {
    const initial = {
      id: expect.any(String),
      name: 'Chrollo',
      number: 1,
    };
    const troupe = await request(app).post('/api/v1/members').send(initial);
    const expected = {
      id: expect.any(String),
      name: 'Chrollo',
      number: 0,
    };
    const res = await request(app)
      .patch(`/api/v1/members/${troupe.body.id}`)
      .send({ number: 0 });

    expect(res.body).toEqual(expected);
  });
  it('deletes member by id', async () => {
    const expected = await Member.findById(1);
    const res = await request(app).delete(`/api/v1/members/${expected.id}`);

    expect(res.body).toEqual(expected);
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
