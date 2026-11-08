# Contributing — delivery conventions

These conventions keep every branch, commit and pull request traceable to the ClickUp task it delivers.

Tasks in the **Product & Engineering** Space use ClickUp Custom Task IDs with the prefix `AGUA` (for example `AGUA-101`). Any branch name, commit message, PR title or PR description that contains the ID is linked to that task by the ClickUp GitHub integration.

## Branches

| Branch | Purpose |
|---|---|
| `main` | Released code. Merges come from `develop` via release PRs. |
| `develop` | Integration branch for Phase 1. Feature PRs target here. |
| `feature/<ClickUp task ID>-<short-slug>` | One branch per ClickUp task. |

Example: `feature/AGUA-101-customer-usage-dashboard`

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) and include the ClickUp task ID so the commit links to the task:

```
feat: add customer usage dashboard API endpoint AGUA-101
test: add usage history service tests AGUA-101
fix: correct date range filtering in usage chart AGUA-101
```

## Pull requests

- Title: `[<ClickUp task ID>] <imperative summary>` — e.g. `[AGUA-101] Add customer usage dashboard API`
- Fill in the pull request template, including the linked ClickUp task.
- Feature PRs target `develop`. CI must pass before merge.

## Labels

| Label | Meaning |
|---|---|
| `feature` | New customer-facing capability |
| `bugfix` | Defect fix |
| `release` | `develop` → `main` release PR |
| `needs-product-review` | Product owner sign-off required before merge |
