'use strict';

const { getUsageSummary, filterByDateRange, flagUnusual } = require('../src/services/usageService');

describe('usageService', () => {
  it('returns null for an unknown customer', () => {
    expect(getUsageSummary('RES-00000')).toBeNull();
  });

  it('returns 12 months of history by default', () => {
    const summary = getUsageSummary('RES-10042');
    expect(summary.history).toHaveLength(12);
    expect(summary.current.periodStart).toBe('2026-10-01');
  });

  it('includes the period that starts on the "to" date', () => {
    const readings = [
      { periodStart: '2026-08-01', litres: 1 },
      { periodStart: '2026-09-01', litres: 2 },
      { periodStart: '2026-10-01', litres: 3 }
    ];
    const result = filterByDateRange(readings, '2026-09-01', '2026-10-01');
    expect(result.map((r) => r.periodStart)).toEqual(['2026-09-01', '2026-10-01']);
  });

  it('flags a spike against the preceding average', () => {
    const readings = [
      { periodStart: '2026-01-01', litres: 100 },
      { periodStart: '2026-02-01', litres: 100 },
      { periodStart: '2026-03-01', litres: 100 },
      { periodStart: '2026-04-01', litres: 200 }
    ];
    expect(flagUnusual(readings).map((r) => r.unusual)).toEqual([false, false, false, true]);
  });

  it('identifies October 2026 as unusual for the sample customer', () => {
    expect(getUsageSummary('RES-10042').unusualPeriods).toEqual(['2026-10-01']);
  });
});
