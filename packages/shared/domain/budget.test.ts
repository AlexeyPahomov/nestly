import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
  applyAllocationDelta,
  applyExpenseDelta,
  bootstrapOpening,
  computeClosing,
  computeRemaining,
  isOverspent,
  recomputeSnapshot,
} from './budget.js'

describe('computeClosing', () => {
  it('matches envelope formula', () => {
    assert.equal(computeClosing(10_000, 50_000, 7_000), 53_000)
    assert.equal(computeRemaining(10_000, 50_000, 7_000), 53_000)
  })

  it('detects overspend', () => {
    assert.equal(isOverspent(computeClosing(0, 1_000, 2_000)), true)
    assert.equal(isOverspent(computeClosing(5_000, 1_000, 2_000)), false)
  })
})

describe('bootstrapOpening', () => {
  it('uses previous closing or zero', () => {
    assert.equal(bootstrapOpening(12_500), 12_500)
    assert.equal(bootstrapOpening(null), 0)
    assert.equal(bootstrapOpening(undefined), 0)
  })
})

describe('recomputeSnapshot', () => {
  it('never increments closing independently', () => {
    let state = recomputeSnapshot({
      openingBalance: 56_000,
      allocated: 0,
      spent: 0,
    })
    assert.equal(state.closingBalance, 56_000)

    state = recomputeSnapshot({
      openingBalance: state.openingBalance,
      allocated: state.allocated,
      spent: applyExpenseDelta(state.spent, 7_000),
    })
    assert.equal(state.closingBalance, 49_000)

    state = recomputeSnapshot({
      openingBalance: state.openingBalance,
      allocated: applyAllocationDelta(state.allocated, 10_000),
      spent: state.spent,
    })
    assert.equal(state.closingBalance, 59_000)
  })
})
