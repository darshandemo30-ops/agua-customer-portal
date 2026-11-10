'use strict';

const express = require('express');
const { getUsageSummary } = require('../services/usageService');

const router = express.Router();
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/customers/:customerId/usage?from=YYYY-MM-DD&to=YYYY-MM-DD
router.get('/customers/:customerId/usage', (req, res) => {
  const { from, to } = req.query;

  for (const [name, value] of Object.entries({ from, to })) {
    if (value !== undefined && !ISO_DATE.test(value)) {
      return res.status(400).json({ error: `${name} must be YYYY-MM-DD` });
    }
  }

  const summary = getUsageSummary(req.params.customerId, { from, to });
  if (!summary) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  return res.json(summary);
});

module.exports = router;
