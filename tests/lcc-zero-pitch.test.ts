import { expect, test } from "bun:test"
import { fp } from "../src/footprinter"

test("lcc with a valid pitch produces finite pad coordinates", () => {
  const pads = (fp.string("lcc_p0.5mm").circuitJson() as any[]).filter(
    (e) => e.type === "pcb_smtpad",
  )
  expect(pads.length).toBeGreaterThan(0)
  for (const pad of pads) {
    expect(Number.isFinite(pad.x)).toBe(true)
    expect(Number.isFinite(pad.y)).toBe(true)
  }
})

test("lcc with zero pitch throws instead of emitting NaN pads", () => {
  expect(() => fp.string("lcc_p0mm").circuitJson()).toThrow(/pitch/)
})

test("qfn with zero pitch throws instead of emitting NaN pads", () => {
  expect(() => fp.string("qfn16_p0mm").circuitJson()).toThrow(/pitch/)
})
