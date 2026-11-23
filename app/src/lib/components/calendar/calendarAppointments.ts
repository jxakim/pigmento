import type { EventInput } from "fullcalendar"
import { type AppointmentType, appointmentTitle, appointmentTypeDetails, appointmentTypes, appointmentTypesByPriority, shortAppointmentTitle } from "#lib/appointmentTypes.ts"
import { type ScheduledAppointment, scheduledAppointments } from "#lib/sampleData.ts"
import { getPeriodRange, isSameDay } from "./calendarDates.ts"
import type { CalendarLevel } from "./calendarLevels.ts"

export function toCalendarEvents(appointments: ScheduledAppointment[]): EventInput[] {
	return appointments.map((appointment) => ({
		title: appointmentTitle(appointment),
		start: appointment.start,
		end: appointment.end,
		color: appointmentTypeDetails[appointment.type].background,
		contrastColor: appointmentTypeDetails[appointment.type].text,
		extendedProps: { type: appointment.type, shortTitle: shortAppointmentTitle(appointment) }
	}))
}

export function findDominantType(appointments: ScheduledAppointment[], day: Date): AppointmentType | undefined {
	const typesOfDay = appointments.filter((appointment) => isSameDay(new Date(appointment.start), day)).map((appointment) => appointment.type)
	return appointmentTypesByPriority.find((type) => typesOfDay.includes(type))
}

export function findAppointmentsOnDay(appointments: ScheduledAppointment[], day: Date): ScheduledAppointment[] {
	return appointments.filter((appointment) => isSameDay(new Date(appointment.start), day)).sort((first, second) => first.start.localeCompare(second.start))
}

export function filterByPeriod(appointments: ScheduledAppointment[], level: CalendarLevel, date: Date): ScheduledAppointment[] {
	const { start, end } = getPeriodRange(level, date)
	return appointments.filter((appointment) => new Date(appointment.start) >= start && new Date(appointment.start) < end)
}

export function countByType(appointments: ScheduledAppointment[]): Record<AppointmentType, number> {
	return Object.fromEntries(appointmentTypes.map((type) => [type, appointments.filter((appointment) => appointment.type === type).length])) as Record<AppointmentType, number>
}

export const calendarEvents = toCalendarEvents(scheduledAppointments)
