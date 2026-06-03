import { describe, expect, it } from 'vitest'
import { hpBarFillFrame } from './hpBarFrame'

describe('hpBarFillFrame', () => {
  const max = 78

  it('full at max hp', () => {
    expect(hpBarFillFrame(78, max)).toBe(0)
  })

  it('empty only at 0 hp', () => {
    expect(hpBarFillFrame(0, max)).toBe(5)
    expect(hpBarFillFrame(1, max)).toBe(4)
  })

  it('advances each 13-damage step on boss max hp', () => {
    expect(hpBarFillFrame(65, max)).toBe(1)
    expect(hpBarFillFrame(52, max)).toBe(2)
    expect(hpBarFillFrame(39, max)).toBe(3)
    expect(hpBarFillFrame(26, max)).toBe(4)
  })
})
