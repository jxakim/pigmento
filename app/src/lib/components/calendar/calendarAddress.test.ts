import { describe, expect, it } from "vitest"
import { formatCalendarAddress, parseCalendarAddress } from "./calendarAddress.ts"

describe("the address of the calendar", () => {
	it("writes the view and the date, so the same view can be opened again", () => {
		expect(formatCalendarAddress("day", new Date(2026, 10, 5))).toBe("?visning=day&dato=2026-11-05")
	})

	it("reads the view and the date back", () => {
		const address = new URLSearchParams(formatCalendarAddress("week", new Date(2026, 10, 18)))

		expect(parseCalendarAddress(address)).toEqual({ level: "week", date: new Date(2026, 10, 18) })
	})

	it("gives nothing when the view or the date is missing or wrong", () => {
		expect(parseCalendarAddress(new URLSearchParams(""))).toBeUndefined()
		expect(parseCalendarAddress(new URLSearchParams("visning=day"))).toBeUndefined()
		expect(parseCalendarAddress(new URLSearchParams("visning=decade&dato=2026-11-05"))).toBeUndefined()
		expect(parseCalendarAddress(new URLSearchParams("visning=day&dato=i-dag"))).toBeUndefined()
	})
})
