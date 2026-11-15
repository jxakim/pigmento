export type CalendarLevel = "year" | "month" | "week" | "day"

export const calendarLevels: CalendarLevel[] = ["year", "month", "week", "day"]

export const levelLabels: Record<CalendarLevel, string> = {
	year: "År",
	month: "Måned",
	week: "Uke",
	day: "Dag"
}

export const parentLevel: Record<CalendarLevel, CalendarLevel | undefined> = {
	year: undefined,
	month: "year",
	week: "month",
	day: "month"
}

export function isZoomingIn(from: CalendarLevel, to: CalendarLevel): boolean {
	return calendarLevels.indexOf(to) > calendarLevels.indexOf(from)
}
