import type { EventInput } from "fullcalendar"
import { type AppointmentColor, appointmentTypeColor, appointmentTypes } from "#lib/appointmentTypes.ts"
import { type AppointmentType, type ScheduledAppointment, scheduledAppointments } from "#lib/sampleData.ts"
import { getPeriodRange, isSameDay } from "./calendarDates.ts"
import type { CalendarLevel } from "./calendarLevels.ts"

const eventColors: Record<AppointmentColor, { color: string; contrastColor: string }> = {
	info: { color: "var(--ds-color-info-surface-tinted)", contrastColor: "var(--ds-color-info-text-default)" },
	neutral: { color: "var(--ds-color-neutral-base-default)", contrastColor: "var(--ds-color-neutral-base-contrast-default)" },
	warning: { color: "var(--ds-color-warning-surface-tinted)", contrastColor: "var(--ds-color-warning-text-default)" }
}

const colorsByImportance: AppointmentColor[] = ["neutral", "info", "warning"]

export function toCalendarEvents(appointments: ScheduledAppointment[]): EventInput[] {
	return appointments.map(({ clientName, type, start, end }) => ({
		title: clientName,
		start,
		end,
		...eventColors[appointmentTypeColor[type]]
	}))
}

export function findDayColor(appointments: ScheduledAppointment[], day: Date): AppointmentColor | undefined {
	const colorsOfDay = appointments.filter((appointment) => isSameDay(new Date(appointment.start), day)).map((appointment) => appointmentTypeColor[appointment.type])
	return colorsByImportance.find((color) => colorsOfDay.includes(color))
}

export function filterByPeriod(appointments: ScheduledAppointment[], level: CalendarLevel, date: Date): ScheduledAppointment[] {
	const { start, end } = getPeriodRange(level, date)
	return appointments.filter((appointment) => new Date(appointment.start) >= start && new Date(appointment.start) < end)
}

export function countByType(appointments: ScheduledAppointment[]): Record<AppointmentType, number> {
	return Object.fromEntries(appointmentTypes.map((type) => [type, appointments.filter((appointment) => appointment.type === type).length])) as Record<AppointmentType, number>
}

export const calendarEvents = toCalendarEvents(scheduledAppointments)
