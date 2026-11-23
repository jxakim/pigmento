import type { Calendar, EventInput } from "fullcalendar"
import { getWorkDay } from "#lib/workHours.svelte.ts"
import { calendarEvents } from "./calendarAppointments.ts"
import { formatIsoDate, getDaysInRange, getPeriodRange } from "./calendarDates.ts"
import type { CalendarLevel } from "./calendarLevels.ts"
import { getSlotRange, toWorkHoursEvents } from "./calendarWorkHours.ts"

export function getCalendarEvents(level: CalendarLevel, date: Date, showWorkHours: boolean): EventInput[] {
	if (!showWorkHours) {
		return calendarEvents
	}
	const workDays = getDaysInRange(getPeriodRange(level, date)).map((day) => getWorkDay(formatIsoDate(day)))
	return [...calendarEvents, ...toWorkHoursEvents(workDays)]
}

export function showCalendarEvents(calendar: Calendar | undefined, level: CalendarLevel, date: Date, showWorkHours: boolean) {
	if (!calendar) {
		return
	}
	const events = getCalendarEvents(level, date, showWorkHours)
	const { slotMinTime, slotMaxTime } = getSlotRange(events, getPeriodRange(level, date))
	calendar.setOption("events", events)
	calendar.setOption("slotMinTime", slotMinTime)
	calendar.setOption("slotMaxTime", slotMaxTime)
}
