import { describe, expect, it } from "vitest"
import type { ScheduledAppointment } from "#lib/sampleData.ts"
import { findDayColor, toCalendarEvents } from "./calendarAppointments.ts"

const consultation: ScheduledAppointment = { clientName: "Mia Haugen", type: "Konsultasjon", start: "2026-11-05T10:00", end: "2026-11-05T11:00" }
const tattoo: ScheduledAppointment = { clientName: "Jonas Berg", type: "Tatovering", start: "2026-11-05T12:30", end: "2026-11-05T16:30" }
const touchUp: ScheduledAppointment = { clientName: "Sara Lund", type: "Touch-up", start: "2026-11-06T17:00", end: "2026-11-06T17:30" }

describe("toCalendarEvents", () => {
	it("shows the client name and colors the event by appointment type", () => {
		expect(toCalendarEvents([tattoo])).toEqual([
			{
				title: "Jonas Berg",
				start: tattoo.start,
				end: tattoo.end,
				color: "var(--ds-color-neutral-base-default)",
				contrastColor: "var(--ds-color-neutral-base-contrast-default)"
			}
		])
	})
})

describe("findDayColor", () => {
	it("has no color on days without appointments", () => {
		expect(findDayColor([consultation], new Date(2026, 10, 7))).toBeUndefined()
	})

	it("uses the color of the only appointment of the day", () => {
		expect(findDayColor([touchUp], new Date(2026, 10, 6))).toBe("warning")
	})

	it("lets tattoos win over consultations on the same day", () => {
		expect(findDayColor([consultation, tattoo], new Date(2026, 10, 5))).toBe("neutral")
	})
})
