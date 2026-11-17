export type CalendarLevel = "year" | "month" | "week" | "day"

export const calendarLevels: CalendarLevel[] = ["year", "month", "week", "day"]

export const levelLabels: Record<CalendarLevel, string> = {
	year: "År",
	month: "Måned",
	week: "Uke",
	day: "Dag"
}

export function isZoomingIn(from: CalendarLevel, to: CalendarLevel): boolean {
	return calendarLevels.indexOf(to) > calendarLevels.indexOf(from)
}
