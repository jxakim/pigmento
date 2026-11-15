import type { CalendarLevel } from "./calendarLevels"

export function isSameDay(first: Date | undefined, second: Date): boolean {
	return first?.toDateString() === second.toDateString()
}

// FullCalendar sine "DateMarker"-datoer lagrer lokal tid i UTC-feltene.
export function dateMarkerToLocalDate(marker: Date): Date {
	return new Date(marker.getUTCFullYear(), marker.getUTCMonth(), marker.getUTCDate())
}

export function formatPeriodLabel(level: CalendarLevel, date: Date): string | undefined {
	switch (level) {
		case "year":
			return undefined
		case "month":
			return date.toLocaleDateString("nb-NO", { month: "long" })
		case "week":
			return `Uke ${getIsoWeekNumber(date)}`
		case "day":
			return date.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })
	}
}

// ISO 8601: uke 1 er uken som inneholder årets første torsdag.
function getIsoWeekNumber(date: Date): number {
	const thursdayOfWeek = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	const isoWeekday = thursdayOfWeek.getUTCDay() || 7
	thursdayOfWeek.setUTCDate(thursdayOfWeek.getUTCDate() + 4 - isoWeekday)

	const startOfYear = Date.UTC(thursdayOfWeek.getUTCFullYear(), 0, 1)
	const millisecondsPerDay = 86_400_000
	const dayOfYear = (thursdayOfWeek.getTime() - startOfYear) / millisecondsPerDay + 1
	return Math.ceil(dayOfYear / 7)
}
