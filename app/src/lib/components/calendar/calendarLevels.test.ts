import { describe, expect, it } from "vitest"
import { getParentLevel, isZoomingIn } from "./calendarLevels.ts"

describe("getParentLevel", () => {
	it("is the level one step out from the level, and nothing for the year", () => {
		expect(getParentLevel("day")).toBe("week")
		expect(getParentLevel("week")).toBe("month")
		expect(getParentLevel("month")).toBe("year")
		expect(getParentLevel("year")).toBeUndefined()
	})
})

describe("isZoomingIn", () => {
	it("is true when the new level is closer to the day", () => {
		expect(isZoomingIn("month", "day")).toBe(true)
		expect(isZoomingIn("week", "year")).toBe(false)
	})
})
