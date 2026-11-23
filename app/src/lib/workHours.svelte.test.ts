import { describe, expect, it } from "vitest"
import { getStandardWeek, getWorkDay, logDidNotWork, logWorkedHours, setStandardDay } from "./workHours.svelte.ts"

describe("the standard week", () => {
	it("starts with 08:00 to 16:00 on weekdays and the weekend off", () => {
		expect(getStandardWeek().monday).toEqual({ start: "08:00", end: "16:00" })
		expect(getStandardWeek().saturday).toBeUndefined()
	})

	it("changes the planned hours of every date on that weekday", () => {
		setStandardDay("saturday", { start: "11:00", end: "15:00" })

		expect(getWorkDay("2026-11-21").planned).toEqual({ start: "11:00", end: "15:00" })
		expect(getWorkDay("2026-11-28").planned).toEqual({ start: "11:00", end: "15:00" })
	})

	it("leaves the day off when the hours are removed", () => {
		setStandardDay("saturday", undefined)

		expect(getWorkDay("2026-11-21").planned).toBeUndefined()
	})
})

describe("logging the hours of a day", () => {
	it("starts with the hours that were logged in the sample data", () => {
		expect(getWorkDay("2026-11-05").logged).toEqual({ didWork: true, hours: { start: "09:00", end: "17:30" } })
	})

	it("has nothing logged on a day that is not logged yet", () => {
		expect(getWorkDay("2026-11-30").logged).toBeUndefined()
	})

	it("keeps the planned hours next to the hours that were worked", () => {
		logWorkedHours("2026-11-30", { start: "09:00", end: "17:00" })

		expect(getWorkDay("2026-11-30")).toEqual({ isoDate: "2026-11-30", planned: { start: "08:00", end: "16:00" }, logged: { didWork: true, hours: { start: "09:00", end: "17:00" } } })
	})

	it("logs a day as not worked", () => {
		logDidNotWork("2026-11-30")

		expect(getWorkDay("2026-11-30").logged).toEqual({ didWork: false })
	})
})
