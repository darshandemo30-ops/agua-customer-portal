'use strict';

const { sampleUsage } = require('../data/sampleUsage');

// A period is flagged as unusual when it exceeds the average of the
// preceding periods by this factor. Threshold to be confirmed with Product.
const UNUSUAL_USAGE_FACTOR = 1.5;

function getCustomer(customerId) {
  return sampleUsage[customerId] || null;
}

function filterByDateRange(readings, from, to) {
  return readings.filter((r) => {
    if (from && r.periodStart < from) return false;
    if (to && r.periodStart >= to) return false;
    return true;
  });
}

function average(values) {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);
}

function flagUnusual(readings) {
  return readings.map((reading, i) => {
    const previous = readings.slice(0, i).map((r) => r.litres);
    const baseline = average(previous);
    const unusual = previous.length >= 3 && reading.litres > baseline * UNUSUAL_USAGE_FACTOR;
    return { ...reading, unusual };
  });
}

function getUsageSummary(customerId, { from, to } = {}) {
  const customer = getCustomer(customerId);
  if (!customer) return null;

  const history = flagUnusual(filterByDateRange(customer.readings, from, to));
  const current = history[history.length - 1] || null;

  return {
    customerId: customer.customerId,
    meterId: customer.meterId,
    unit: customer.unit,
    current,
    averageLitres: average(history.map((r) => r.litres)),
    unusualPeriods: history.filter((r) => r.unusual).map((r) => r.periodStart),
    history
  };
}

module.exports = { getUsageSummary, filterByDateRange, flagUnusual, UNUSUAL_USAGE_FACTOR };
