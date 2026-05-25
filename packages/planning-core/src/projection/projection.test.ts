import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { buildMonthProjection } from './buildMonthProjection.js'
import { projectMonthBudget } from './projectMonthBudget.js'
import { sumPlannedExpenseCommitments } from './sumPlannedExpenseCommitments.js'

describe('sumPlannedExpenseCommitments', () => {
  it('splits planned vs reserved for active rows', () => {
    assert.deepEqual(
      sumPlannedExpenseCommitments([
        { amount: 10, reserved_amount: 0, status: 'PLANNED' },
      ]),
      { planned: 10, reserved: 0 },
    )

    assert.deepEqual(
      sumPlannedExpenseCommitments([
        { amount: 10, reserved_amount: 10, status: 'RESERVED' },
      ]),
      { planned: 0, reserved: 10 },
    )

    assert.deepEqual(
      sumPlannedExpenseCommitments([
        { amount: 10, reserved_amount: 3, status: 'RESERVED' },
      ]),
      { planned: 7, reserved: 3 },
    )
  })

  it('ignores completed and cancelled', () => {
    assert.deepEqual(
      sumPlannedExpenseCommitments([
        { amount: 100, reserved_amount: 50, status: 'COMPLETED' },
        { amount: 20, reserved_amount: 0, status: 'CANCELLED' },
      ]),
      { planned: 0, reserved: 0 },
    )
  })

  it('caps reserved_amount at amount', () => {
    assert.deepEqual(
      sumPlannedExpenseCommitments([
        { amount: 10, reserved_amount: 99, status: 'PLANNED' },
      ]),
      { planned: 0, reserved: 10 },
    )
  })
})

describe('projectMonthBudget', () => {
  it('computes projectedFree from available and commitments', () => {
    const result = projectMonthBudget({
      available: 100,
      spentTotal: 20,
      commitments: { planned: 10, reserved: 20 },
    })

    assert.equal(result.commitmentTotal, 30)
    assert.equal(result.projectedFree, 70)
    assert.equal(result.plannedTotal, 10)
    assert.equal(result.reservedTotal, 20)
    assert.equal(result.spentTotal, 20)
  })
})

describe('buildMonthProjection', () => {
  it('chains commitment sum and projection', () => {
    const result = buildMonthProjection({
      available: 50,
      spentTotal: 5,
      commitmentRows: [
        { amount: 15, reserved_amount: 5, status: 'PLANNED' },
      ],
    })

    assert.equal(result.plannedTotal, 10)
    assert.equal(result.reservedTotal, 5)
    assert.equal(result.projectedFree, 35)
  })
})
