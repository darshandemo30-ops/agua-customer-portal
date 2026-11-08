'use strict';

const request = require('supertest');
const { createApp } = require('../src/app');

describe('GET /api/customers/:customerId/usage', () => {
  const app = createApp();

  it('returns a usage summary for a known customer', async () => {
    const res = await request(app).get('/api/customers/RES-10042/usage');
    expect(res.status).toBe(200);
    expect(res.body.unit).toBe('L');
    expect(res.body.current.litres).toBe(23600);
  });

  it('applies an inclusive date range', async () => {
    const res = await request(app).get('/api/customers/RES-10042/usage?from=2026-08-01&to=2026-10-01');
    expect(res.status).toBe(200);
    expect(res.body.history.map((r) => r.periodStart)).toEqual(['2026-08-01', '2026-09-01', '2026-10-01']);
  });

  it('rejects a malformed date', async () => {
    const res = await request(app).get('/api/customers/RES-10042/usage?from=01-08-2026');
    expect(res.status).toBe(400);
  });

  it('returns 404 for an unknown customer', async () => {
    const res = await request(app).get('/api/customers/RES-00000/usage');
    expect(res.status).toBe(404);
  });
});
