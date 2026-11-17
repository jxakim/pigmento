import type { EventInput } from "fullcalendar"
import { type AppointmentColor, appointmentTypeColor } from "#lib/appointmentTypes.ts"
import { type ScheduledAppointment, scheduledAppointments } from "#lib/sampleData.ts"
import { isSameDay } from "./calendarDates.ts"

const colorsByImportance: AppointmentColor[] = ["neutral", "info", "warning"]

export function toCalendarEvents(appointments: ScheduledAppointment[]): EventInput[] {
	return appointments.map(({ clientName, type, start, end }) => {
		const typeColor = appointmentTypeColor[type]
		return {
			title: clientName,
			start,
			end,
			color: `var(--ds-color-${typeColor}-base-default)`,
			contrastColor: `var(--ds-color-${typeColor}-base-contrast-default)`
		}
	})
}

export function findDayColor(appointments: ScheduledAppointment[], day: Date): AppointmentColor | undefined {
	const colorsOfDay = appointments.filter((appointment) => isSameDay(new Date(appointment.start), day)).map((appointment) => appointmentTypeColor[appointment.type])
	return colorsByImportance.find((color) => colorsOfDay.includes(color))
}

export const calendarEvents = toCalendarEvents(scheduledAppointments)
