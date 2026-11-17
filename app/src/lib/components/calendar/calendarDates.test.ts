import { describe, expect, it } from "vitest"
import { dateMarkerToLocalDate, formatPeriodLabel, isSameDay } from "./calendarDates.ts"

describe("isSameDay", () => {
	it("ignores the time of day", () => {
		expect(isSameDay(new Date(2026, 10, 16, 8), new Date(2026, 10, 16, 22))).toBe(true)
	})

	it("is false for different days or no day", () => {
		expect(isSameDay(new Date(2026, 10, 16), new Date(2026, 10, 17))).toBe(false)
		expect(isSameDay(undefined, new Date(2026, 10, 16))).toBe(false)
	})
})

describe("dateMarkerToLocalDate", () => {
	it("reads the date from the UTC fields", () => {
		expect(dateMarkerToLocalDate(new Date(Date.UTC(2026, 10, 16, 23)))).toEqual(new Date(2026, 10, 16))
	})
})

describe("formatPeriodLabel", () => {
	it("has no label for a year", () => {
		expect(formatPeriodLabel("year", new Date(2026, 10, 16))).toBeUndefined()
	})

	it("names the month and the day in Norwegian", () => {
		expect(formatPeriodLabel("month", new Date(2026, 10, 16))).toBe("november")
		expect(formatPeriodLabel("day", new Date(2026, 10, 16))).toBe("mandag 16. november")
	})

	it("uses ISO week numbers", () => {
		expect(formatPeriodLabel("week", new Date(2026, 10, 16))).toBe("Uke 47")
		expect(formatPeriodLabel("week", new Date(2024, 11, 30))).toBe("Uke 1")
		expect(formatPeriodLabel("week", new Date(2027, 0, 1))).toBe("Uke 53")
	})
})
