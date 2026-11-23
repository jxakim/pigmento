import type { EventInput } from "fullcalendar"
import { getWorkDay } from "#lib/workHours.svelte.ts"
import { calendarEvents } from "./calendarAppointments.ts"
import { formatIsoDate, getDaysInRange, getPeriodRange } from "./calendarDates.ts"
import type { CalendarLevel } from "./calendarLevels.ts"
import { toWorkHoursEvents } from "./calendarWorkHours.ts"

export function getCalendarEvents(level: CalendarLevel, date: Date, showWorkHours: boolean): EventInput[] {
	if (!showWorkHours) {
		return calendarEvents
	}
	const workDays = getDaysInRange(getPeriodRange(level, date)).map((day) => getWorkDay(formatIsoDate(day)))
	return [...calendarEvents, ...toWorkHoursEvents(workDays)]
}
