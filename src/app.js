'use strict';

const express = require('express');
const usageRoutes = require('./routes/usage');

function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'agua-customer-portal' });
  });

  // Feature routes are registered here as they are delivered.
  // Phase 1 backlog: usage dashboard, subscriptions, support requests,
  // service ticket tracking, product documentation.
  app.use('/api', usageRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  return app;
}

module.exports = { createApp };
