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
| Forecasting | What will happen? | `@nestly/planning-core`, UI via `processes/forecasting` |

`projectMonthBudget()`, `sumPlannedExpenseCommitments()`, `buildMonthProjection()` live in:

- **Source of truth:** `packages/planning-core` (`@nestly/planning-core`)
- **Client facade:** `apps/client/src/processes/forecasting` (re-export for FSD)
- **Server:** `ProjectionService` delegates to `@nestly/planning-core`

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

- Client and server must depend on `@nestly/planning-core`; build workspace packages before app build/dev (as with `@nestly/shared`).
- Migrations required for `reserved_amount` and `carry_over_policy`.
- Next: `buildForecastChain`, liquidity policy in planning-core, `ProjectionSnapshot` on month close.
