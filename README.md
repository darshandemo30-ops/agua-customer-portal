# Agua Customer Portal — Phase 1

Demo repository for the Agua Customer Portal Phase 1 delivery workflow, connected to ClickUp for product-to-engineering execution visibility.

> This is a demonstration repository built for a ClickUp pre-sales scenario. Agua Inc. is a fictional customer and all data is sample data.

## Phase 1 outcome

Give Agua customers a secure self-service portal to:

- view current and historical water usage
- manage subscriptions
- submit support requests
- track service tickets
- access product documentation

## How delivery is tracked

Work is planned in ClickUp (**Product & Engineering → Customer Portal → Phase 1 Delivery**). Each ClickUp task maps to one feature branch. Branches, commits and pull requests include the ClickUp task ID, so the GitHub activity appears on the task and ClickUp Automations can move it through delivery statuses.

See [CONTRIBUTING.md](CONTRIBUTING.md) for branch, commit and PR conventions.

## Run locally

```bash
npm install
npm test
npm start   # http://localhost:3000/health
```

## API

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Service health check |
| GET | `/api/customers/:customerId/usage?from=&to=` | Current and historical water usage, average and unusual-usage periods. Try `RES-10042`. |
