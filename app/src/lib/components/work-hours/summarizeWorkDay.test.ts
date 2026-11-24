import { describe, expect, it } from "vitest"
import type { WorkDay } from "#lib/workHours.ts"
import { formatWorkDayLine, summarizeWorkDay } from "./summarizeWorkDay.ts"

const planned = { start: "08:00", end: "16:00" }

describe("summarizeWorkDay", () => {
	it("shows the hours that were worked, and how they differ from the plan", () => {
		const day: WorkDay = { isoDate: "2026-11-05", planned, logged: { didWork: true, hours: { start: "09:00", end: "17:30" } } }

		expect(summarizeWorkDay(day)).toEqual({ duration: "8,5 t", hours: "09:00–17:30", difference: { label: "+0,5 t", isDeviation: true } })
	})

	it("says that the day went as planned when the hours are the same", () => {
		const day: WorkDay = { isoDate: "2026-11-02", planned, logged: { didWork: true, hours: planned } }

		expect(summarizeWorkDay(day).difference).toEqual({ label: "Som planlagt", isDeviation: false })
	})

	it("has no difference for hours worked on a day off", () => {
		const day: WorkDay = { isoDate: "2026-11-14", logged: { didWork: true, hours: { start: "12:00", end: "17:00" } } }

		expect(summarizeWorkDay(day)).toEqual({ duration: "5 t", hours: "12:00–17:00", difference: undefined })
	})

	it("says that a planned day was not worked", () => {
		expect(summarizeWorkDay({ isoDate: "2026-11-11", planned, logged: { didWork: false } })).toEqual({ duration: "Jobbet ikke", hours: "Planlagt 08:00–16:00" })
	})

	it("shows the plan for a day that is not logged", () => {
		expect(summarizeWorkDay({ isoDate: "2026-11-09", planned })).toEqual({ duration: "8 t", hours: "08:00–16:00 · planlagt" })
	})

	it("calls a day without plan or hours free", () => {
		expect(summarizeWorkDay({ isoDate: "2026-11-07" })).toEqual({ duration: "Fri", hours: "" })
	})
})

describe("formatWorkDayLine", () => {
	it("names what is known about the day, the worked hours first", () => {
		expect(formatWorkDayLine({ isoDate: "2026-11-05", planned, logged: { didWork: true, hours: { start: "09:00", end: "17:30" } } })).toBe("Jobbet 09:00–17:30")
		expect(formatWorkDayLine({ isoDate: "2026-11-11", planned, logged: { didWork: false } })).toBe("Jobbet ikke")
		expect(formatWorkDayLine({ isoDate: "2026-11-09", planned })).toBe("Planlagt 08:00–16:00")
		expect(formatWorkDayLine({ isoDate: "2026-11-07" })).toBe("Fridag")
	})
})
