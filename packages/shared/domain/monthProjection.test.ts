import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  projectMonthBudget,
  sumPlannedExpenseCommitments,
} from './monthProjection.js'

describe('sumPlannedExpenseCommitments', () => {
  it('ignores completed and cancelled', () => {
    const sums = sumPlannedExpenseCommitments([
      { amount: 50_000, status: 'RESERVED' },
      { amount: 120_000, status: 'PLANNED' },
      { amount: 9_000, status: 'COMPLETED' },
      { amount: 1_000, status: 'CANCELLED' },
    ])
    assert.deepEqual(sums, { planned: 120_000, reserved: 50_000 })
  })
})

describe('projectMonthBudget', () => {
  it('matches intentional budgeting example', () => {
    const projection = projectMonthBudget({
      available: 200_000,
      spentTotal: 0,
      commitments: { planned: 120_000, reserved: 50_000 },
    })
    assert.equal(projection.projectedFree, 30_000)
  })

  it('subtracts commitments from available pool only', () => {
    const projection = projectMonthBudget({
      available: 40_000,
      spentTotal: 15_000,
      commitments: { planned: 10_000, reserved: 5_000 },
    })
    assert.equal(projection.projectedFree, 25_000)
    assert.equal(projection.spentTotal, 15_000)
  })
})
