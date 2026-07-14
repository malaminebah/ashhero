import { describe, expect, it } from 'vitest'
import { hpBarFillFrame } from './hpBarFrame'

describe('hpBarFillFrame', () => {
  const max = 78

  it(`
    Given full HP
    When the fill frame is resolved
    Then the bar shows the full frame
  `, () => {
    const hp = 78

    const frame = hpBarFillFrame(hp, max)

    expect(frame).toBe(0)
  })

  it(`
    Given zero HP
    When the fill frame is resolved
    Then the bar is empty
  `, () => {
    const hp = 0

    const frame = hpBarFillFrame(hp, max)

    expect(frame).toBe(5)
  })

  it(`
    Given a single HP left
    When the fill frame is resolved
    Then the bar still shows a sliver
  `, () => {
    const hp = 1

    const frame = hpBarFillFrame(hp, max)

    expect(frame).toBe(4)
  })

  it(`
    Given HP dropping by standard hits
    When fill frames are resolved along the way
    Then the frame advances one step per HP band
  `, () => {
    const hpSteps = [65, 52, 39, 26]

    const frames = hpSteps.map((hp) => hpBarFillFrame(hp, max))

    expect(frames).toEqual([1, 2, 3, 4])
  })

  it(`
    Given a level-scaled boss with a higher max HP
    When fill frames are resolved at the bounds
    Then full and empty frames still map to max and zero
  `, () => {
    const scaledMax = 156

    const fullFrame = hpBarFillFrame(scaledMax, scaledMax)
    const emptyFrame = hpBarFillFrame(0, scaledMax)
    const sliverFrame = hpBarFillFrame(1, scaledMax)

    expect(fullFrame).toBe(0)
    expect(emptyFrame).toBe(5)
    expect(sliverFrame).toBe(4)
  })
})
