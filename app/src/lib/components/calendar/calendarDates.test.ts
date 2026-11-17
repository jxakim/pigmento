import { describe, expect, it } from "vitest"
import { formatPeriodLabel, formatPeriodName, getPeriodKey, getPeriodRange, isSameDay, moveByPeriods, parseIsoDate } from "./calendarDates.ts"

describe("formatPeriodName", () => {
	const monday = new Date(2026, 10, 16)

	it("names every level in lower case, so it fits in a sentence", () => {
		expect(formatPeriodName("year", monday)).toBe("2026")
		expect(formatPeriodName("month", monday)).toBe("november")
		expect(formatPeriodName("week", monday)).toBe("uke 47")
		expect(formatPeriodName("day", monday)).toBe("mandag 16. november")
	})
})

describe("getPeriodKey", () => {
	it("is the same for every date in the period", () => {
		expect(getPeriodKey("week", new Date(2026, 10, 16))).toBe(getPeriodKey("week", new Date(2026, 10, 22)))
		expect(getPeriodKey("month", new Date(2026, 10, 1))).toBe(getPeriodKey("month", new Date(2026, 10, 30)))
	})

	it("differs between periods and between levels", () => {
		expect(getPeriodKey("week", new Date(2026, 10, 22))).not.toBe(getPeriodKey("week", new Date(2026, 10, 23)))
		expect(getPeriodKey("year", new Date(2026, 0, 1))).not.toBe(getPeriodKey("month", new Date(2026, 0, 1)))
	})
})

describe("getPeriodRange", () => {
	const wednesday = new Date(2026, 10, 18, 14)

	it("covers the whole year, month and day around the date", () => {
		expect(getPeriodRange("year", wednesday)).toEqual({ start: new Date(2026, 0, 1), end: new Date(2027, 0, 1) })
		expect(getPeriodRange("month", wednesday)).toEqual({ start: new Date(2026, 10, 1), end: new Date(2026, 11, 1) })
		expect(getPeriodRange("day", wednesday)).toEqual({ start: new Date(2026, 10, 18), end: new Date(2026, 10, 19) })
	})

	it("starts the week on Monday", () => {
		expect(getPeriodRange("week", wednesday)).toEqual({ start: new Date(2026, 10, 16), end: new Date(2026, 10, 23) })
	})

	it("keeps Sunday in the week that started the Monday before", () => {
		expect(getPeriodRange("week", new Date(2026, 10, 22))).toEqual({ start: new Date(2026, 10, 16), end: new Date(2026, 10, 23) })
	})
})

describe("isSameDay", () => {
	it("ignores the time of day", () => {
		expect(isSameDay(new Date(2026, 10, 16, 8), new Date(2026, 10, 16, 22))).toBe(true)
	})

	it("is false for different days or no day", () => {
		expect(isSameDay(new Date(2026, 10, 16), new Date(2026, 10, 17))).toBe(false)
		expect(isSameDay(undefined, new Date(2026, 10, 16))).toBe(false)
	})
})

describe("parseIsoDate", () => {
	it("creates a local date, not a UTC date", () => {
		expect(parseIsoDate("2026-11-25")).toEqual(new Date(2026, 10, 25))
	})
})

describe("moveByPeriods", () => {
	const january31 = new Date(2026, 0, 31)

	it("moves years and months to the first day, so short months are never skipped", () => {
		expect(moveByPeriods("year", january31, 1)).toEqual(new Date(2027, 0, 1))
		expect(moveByPeriods("month", january31, 1)).toEqual(new Date(2026, 1, 1))
		expect(moveByPeriods("month", january31, -1)).toEqual(new Date(2025, 11, 1))
	})

	it("moves weeks and days across month boundaries", () => {
		expect(moveByPeriods("week", january31, 1)).toEqual(new Date(2026, 1, 7))
		expect(moveByPeriods("day", january31, 1)).toEqual(new Date(2026, 1, 1))
		expect(moveByPeriods("day", january31, -1)).toEqual(new Date(2026, 0, 30))
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
