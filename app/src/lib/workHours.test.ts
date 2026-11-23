import { describe, expect, it } from "vitest"
import type { StandardWorkWeek, WorkDay } from "./workHours.ts"
import {
	formatDifference,
	formatDuration,
	formatHours,
	getDifferenceInMinutes,
	getDurationInMinutes,
	getPlannedHours,
	getTotals,
	getWeekday,
	getWorkedHours,
	isSameHours,
	minutesToTime,
	timeToMinutes,
	withEnd,
	withStart,
	workTimeOptions
} from "./workHours.ts"

const dayShift = { start: "08:00", end: "16:00" }
const standardWeek: StandardWorkWeek = { monday: dayShift, tuesday: dayShift, wednesday: dayShift, thursday: dayShift, friday: dayShift, saturday: undefined, sunday: undefined }

describe("time conversion", () => {
	it("converts between clock times and minutes", () => {
		expect(timeToMinutes("08:30")).toBe(510)
		expect(minutesToTime(510)).toBe("08:30")
		expect(minutesToTime(timeToMinutes("17:00"))).toBe("17:00")
	})

	it("offers every half hour from 06:00 to 22:00", () => {
		expect(workTimeOptions[0]).toBe("06:00")
		expect(workTimeOptions[1]).toBe("06:30")
		expect(workTimeOptions.at(-1)).toBe("22:00")
		expect(workTimeOptions).toHaveLength(33)
	})
})

describe("formatting", () => {
	it("writes whole hours without decimals and half hours with a comma", () => {
		expect(formatDuration(480)).toBe("8 t")
		expect(formatDuration(510)).toBe("8,5 t")
		expect(formatDuration(0)).toBe("0 t")
	})

	it("writes a time range with an en dash", () => {
		expect(formatHours({ start: "09:00", end: "17:30" })).toBe("09:00–17:30")
	})

	it("shows the difference with a sign, or that nothing differs", () => {
		expect(formatDifference(0)).toBe("Som planlagt")
		expect(formatDifference(90)).toBe("+1,5 t")
		expect(formatDifference(-120)).toBe("−2 t")
	})
})

describe("changing the hours", () => {
	it("moves the end after a later start", () => {
		expect(withStart(dayShift, "10:00")).toEqual({ start: "10:00", end: "16:00" })
		expect(withStart(dayShift, "16:00")).toEqual({ start: "16:00", end: "16:30" })
	})

	it("moves the start before an earlier end", () => {
		expect(withEnd(dayShift, "15:00")).toEqual({ start: "08:00", end: "15:00" })
		expect(withEnd(dayShift, "08:00")).toEqual({ start: "07:30", end: "08:00" })
	})

	it("compares hours by start and end, also when there are none", () => {
		expect(isSameHours(dayShift, { start: "08:00", end: "16:00" })).toBe(true)
		expect(isSameHours(dayShift, { start: "09:00", end: "16:00" })).toBe(false)
		expect(isSameHours(dayShift, undefined)).toBe(false)
		expect(isSameHours(undefined, undefined)).toBe(true)
	})
})

describe("planned hours", () => {
	it("finds the weekday of a date with Monday first", () => {
		expect(getWeekday("2026-11-02")).toBe("monday")
		expect(getWeekday("2026-11-08")).toBe("sunday")
	})

	it("takes the hours of the weekday from the standard week", () => {
		expect(getPlannedHours(standardWeek, "2026-11-05")).toEqual(dayShift)
		expect(getPlannedHours(standardWeek, "2026-11-07")).toBeUndefined()
	})
})

describe("worked hours", () => {
	const lateShift = { start: "09:00", end: "17:30" }
	const lateDay: WorkDay = { isoDate: "2026-11-05", planned: dayShift, logged: { didWork: true, hours: lateShift } }
	const freeDay: WorkDay = { isoDate: "2026-11-06", planned: dayShift, logged: { didWork: false } }
	const notLoggedDay: WorkDay = { isoDate: "2026-11-09", planned: dayShift }

	it("only counts the hours of a day that was logged as worked", () => {
		expect(getWorkedHours(lateDay)).toEqual(lateShift)
		expect(getWorkedHours(freeDay)).toBeUndefined()
		expect(getWorkedHours(notLoggedDay)).toBeUndefined()
	})

	it("measures how much longer or shorter the day was than planned", () => {
		expect(getDurationInMinutes(lateShift)).toBe(510)
		expect(getDifferenceInMinutes(lateDay)).toBe(30)
		expect(getDifferenceInMinutes(notLoggedDay)).toBe(0)
	})

	it("adds up planned and worked minutes for the days", () => {
		expect(getTotals([lateDay, freeDay, notLoggedDay])).toEqual({ plannedMinutes: 1440, workedMinutes: 510 })
	})
})
