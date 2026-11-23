import { describe, expect, it } from "vitest"
import { appointmentTypeDetails } from "#lib/appointmentTypes.ts"
import type { ScheduledAppointment } from "#lib/sampleData.ts"
import { countByType, filterByPeriod, findAppointmentsOnDay, findDominantType, toCalendarEvents } from "./calendarAppointments.ts"

const consultation: ScheduledAppointment = { clientName: "Mia Haugen", type: "consultation", start: "2026-11-05T10:00", end: "2026-11-05T11:00" }
const tattoo: ScheduledAppointment = { clientName: "Jonas Berg", type: "tattoo", start: "2026-11-05T12:30", end: "2026-11-05T16:30" }
const privateAppointment: ScheduledAppointment = { type: "notAvailable", start: "2026-11-06T17:00", end: "2026-11-06T17:30" }

describe("toCalendarEvents", () => {
	it("shows the client name and colors the event like the appointment type", () => {
		expect(toCalendarEvents([tattoo])).toEqual([
			{
				title: "Jonas Berg",
				start: tattoo.start,
				end: tattoo.end,
				color: appointmentTypeDetails.tattoo.background,
				contrastColor: appointmentTypeDetails.tattoo.text,
				extendedProps: { type: "tattoo", shortTitle: "Jonas" }
			}
		])
	})

	it("shows the whole type label for appointments without a client, also in the short title", () => {
		const [event] = toCalendarEvents([privateAppointment])
		expect(event.title).toBe(appointmentTypeDetails.notAvailable.label)
		expect(event.extendedProps?.shortTitle).toBe(appointmentTypeDetails.notAvailable.label)
	})
})

describe("findDominantType", () => {
	it("has no type on days without appointments", () => {
		expect(findDominantType([consultation], new Date(2026, 10, 7))).toBeUndefined()
	})

	it("uses the type of the only appointment of the day", () => {
		expect(findDominantType([privateAppointment], new Date(2026, 10, 6))).toBe("notAvailable")
	})

	it("lets tattoos win over consultations on the same day", () => {
		expect(findDominantType([consultation, tattoo], new Date(2026, 10, 5))).toBe("tattoo")
	})
})

describe("filterByPeriod", () => {
	const appointments = [consultation, tattoo, privateAppointment]

	it("keeps the appointments that start inside the period", () => {
		expect(filterByPeriod(appointments, "day", new Date(2026, 10, 5))).toEqual([consultation, tattoo])
		expect(filterByPeriod(appointments, "week", new Date(2026, 10, 8))).toEqual(appointments)
	})

	it("leaves out appointments in other months", () => {
		expect(filterByPeriod(appointments, "month", new Date(2026, 9, 31))).toEqual([])
	})
})

describe("countByType", () => {
	it("counts every appointment type, also the ones without appointments", () => {
		expect(countByType([consultation, tattoo, privateAppointment, tattoo])).toEqual({ consultation: 1, tattoo: 2, notAvailable: 1 })
		expect(countByType([])).toEqual({ consultation: 0, tattoo: 0, notAvailable: 0 })
	})
})

describe("findAppointmentsOnDay", () => {
	it("gives the appointments of the day in the order they start", () => {
		expect(findAppointmentsOnDay([tattoo, privateAppointment, consultation], new Date(2026, 10, 5))).toEqual([consultation, tattoo])
	})

	it("is empty on days without appointments", () => {
		expect(findAppointmentsOnDay([consultation], new Date(2026, 10, 9))).toEqual([])
	})
})
