# ADR 002: Planning bounded context

## Status

Accepted (2026-05-25)

## Context

Forecasting rules evolve (recurring, carry-over, goals, month close). `@nestly/shared` must stay domain-light (envelope math, period keys).

## Decision

### Projection ≠ reporting

| Layer | Question | Location |
|-------|----------|----------|
| Reporting | What happened? | `entities/budget`, `CurrentBudgetSummary` |
| Forecasting | What will happen? | `processes/forecasting`, `ProjectedBudgetSummary` |

`projectMonthBudget()` lives in:

- Client: `apps/client/src/processes/forecasting/lib/`
- Server: `apps/server/src/planning/` (`ProjectionService`)

Not in `@nestly/shared`.

### Planned expense commitments

- `amount` — цель плана
- `reserved_amount` — замороженная ликвидность (gradual reserve)
- `status` — lifecycle hint; projection uses amounts, not status alone

### Carry-over (prepared)

`Category.carry_over_policy`: `RESET` | `CARRY` | `TRANSFER_TO_FREE`. Used when forecasting includes envelope remainder policy.

### Future: ledger-style events

Prefer `planned_expense_events` over mutable status-only model when adding execute / release / partial reserve audit. Current schema keeps status + `reserved_amount` as a stepping stone.

### Month lifecycle

Close / reopen / validate belong in `planning/month-lifecycle/` (next milestone), not in expense or allocation modules.

## Consequences

- Duplicate projection code client/server until a dedicated `@nestly/planning` package exists.
- Migrations required for `reserved_amount` and `carry_over_policy`.
