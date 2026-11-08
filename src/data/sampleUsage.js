'use strict';

// Sample meter readings for demo purposes only. Not real customer data.
// Units: litres. One reading per billing month, keyed by period start date.
const sampleUsage = {
  'RES-10042': {
    customerId: 'RES-10042',
    segment: 'residential',
    meterId: 'MTR-55871',
    unit: 'L',
    readings: [
      { periodStart: '2025-11-01', litres: 14200 },
      { periodStart: '2025-12-01', litres: 15800 },
      { periodStart: '2026-01-01', litres: 17100 },
      { periodStart: '2026-02-01', litres: 16400 },
      { periodStart: '2026-03-01', litres: 14900 },
      { periodStart: '2026-04-01', litres: 13800 },
      { periodStart: '2026-05-01', litres: 13100 },
      { periodStart: '2026-06-01', litres: 12900 },
      { periodStart: '2026-07-01', litres: 13300 },
      { periodStart: '2026-08-01', litres: 13700 },
      { periodStart: '2026-09-01', litres: 14100 },
      { periodStart: '2026-10-01', litres: 23600 }
    ]
  }
};

module.exports = { sampleUsage };
