import { formatIsoDate, isIsoDate, parseIsoDate } from "./calendarDates.ts"
import { type CalendarLevel, calendarLevels } from "./calendarLevels.ts"

export function formatCalendarAddress(level: CalendarLevel, date: Date): string {
	return `?visning=${level}&dato=${formatIsoDate(date)}`
}

export function parseCalendarAddress(params: Pick<URLSearchParams, "get">): { level: CalendarLevel; date: Date } | undefined {
	const level = calendarLevels.find((calendarLevel) => calendarLevel === params.get("visning"))
	const isoDate = params.get("dato")
	return level && isIsoDate(isoDate) ? { level, date: parseIsoDate(isoDate) } : undefined
}
