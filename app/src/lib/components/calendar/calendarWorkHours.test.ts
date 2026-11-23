import { describe, expect, it } from "vitest"
import type { WorkDay } from "#lib/workHours.ts"
import { getSlotRange, renderMonthWorkHours, toWorkHoursEvents } from "./calendarWorkHours.ts"

const planned = { start: "08:00", end: "16:00" }
const lateShift = { start: "09:00", end: "17:30" }

describe("toWorkHoursEvents", () => {
	it("makes a background event for the planned hours and one for the hours that were worked", () => {
		const day: WorkDay = { isoDate: "2026-11-05", planned, logged: { didWork: true, hours: lateShift } }

		expect(toWorkHoursEvents([day])).toEqual([
			{ start: "2026-11-05T08:00", end: "2026-11-05T16:00", display: "background", extendedProps: { workHoursKind: "planned", workHoursLabel: "" } },
			{ start: "2026-11-05T09:00", end: "2026-11-05T17:30", display: "background", extendedProps: { workHoursKind: "worked", workHoursLabel: "09:00–17:30" } }
		])
	})

	it("only has the planned hours for a day that is not logged, and nothing for a day that was not worked and has no plan", () => {
		expect(toWorkHoursEvents([{ isoDate: "2026-11-06", planned }])).toHaveLength(1)
		expect(toWorkHoursEvents([{ isoDate: "2026-11-07", logged: { didWork: false } }])).toEqual([])
	})
})

describe("renderMonthWorkHours", () => {
	it("is empty for a day without hours", () => {
		expect(renderMonthWorkHours({ isoDate: "2026-11-07" })).toBe("")
	})

	it("shows the planned length of a day that is not logged, marked as planned", () => {
		const html = renderMonthWorkHours({ isoDate: "2026-11-06", planned })

		expect(html).toContain("calendar-work-duration is-planned")
		expect(html).toContain("8 t")
		expect(html).not.toContain("calendar-work-bar-worked")
	})

	it("shows the length of the hours that were worked, and marks a day that differs from the plan", () => {
		const html = renderMonthWorkHours({ isoDate: "2026-11-05", planned, logged: { didWork: true, hours: lateShift } })

		expect(html).toContain("8,5 t")
		expect(html).toContain("calendar-work-deviation")
		expect(html).toContain("calendar-work-bar-worked")
	})

	it("does not mark a day that went as planned", () => {
		const html = renderMonthWorkHours({ isoDate: "2026-11-02", planned, logged: { didWork: true, hours: planned } })

		expect(html).not.toContain("calendar-work-deviation")
	})
})

describe("getSlotRange", () => {
	const week = { start: new Date(2026, 10, 2), end: new Date(2026, 10, 9) }
	const event = (start: string, end: string) => ({ start, end })

	it("shows 07:00 to 19:00 when everything fits", () => {
		expect(getSlotRange([event("2026-11-05T10:00", "2026-11-05T17:30")], week)).toEqual({ slotMinTime: "07:00:00", slotMaxTime: "19:00:00" })
		expect(getSlotRange([], week)).toEqual({ slotMinTime: "07:00:00", slotMaxTime: "19:00:00" })
	})

	it("goes on to the hour after the latest end, also for a late evening", () => {
		expect(getSlotRange([event("2026-11-13T12:00", "2026-11-13T23:00")], { start: new Date(2026, 10, 9), end: new Date(2026, 10, 16) })).toEqual({ slotMinTime: "07:00:00", slotMaxTime: "23:00:00" })
		expect(getSlotRange([event("2026-11-05T12:00", "2026-11-05T23:30")], week).slotMaxTime).toBe("24:00:00")
	})

	it("starts at the hour before the earliest start", () => {
		expect(getSlotRange([event("2026-11-03T06:30", "2026-11-03T12:00")], week).slotMinTime).toBe("06:00:00")
	})

	it("ignores events outside the period", () => {
		expect(getSlotRange([event("2026-11-13T12:00", "2026-11-13T23:00")], week)).toEqual({ slotMinTime: "07:00:00", slotMaxTime: "19:00:00" })
	})
})
