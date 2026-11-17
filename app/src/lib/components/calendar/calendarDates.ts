import type { CalendarLevel } from "./calendarLevels.ts"

export function isSameDay(first: Date | undefined, second: Date): boolean {
	return first?.toDateString() === second.toDateString()
}

export function parseIsoDate(isoDate: string): Date {
	const [year, month, day] = isoDate.split("-").map(Number)
	return new Date(year, month - 1, day)
}

export function moveByPeriods(level: CalendarLevel, date: Date, periods: number): Date {
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	switch (level) {
		case "year":
			return new Date(year + periods, month, 1)
		case "month":
			return new Date(year, month + periods, 1)
		case "week":
			return new Date(year, month, day + 7 * periods)
		case "day":
			return new Date(year, month, day + periods)
	}
}

export interface DateRange {
	start: Date
	end: Date
}

// Slutten er første øyeblikk etter perioden, så en dato er i perioden når start <= dato < slutt.
export function getPeriodRange(level: CalendarLevel, date: Date): DateRange {
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()

	switch (level) {
		case "year":
			return { start: new Date(year, 0, 1), end: new Date(year + 1, 0, 1) }
		case "month":
			return { start: new Date(year, month, 1), end: new Date(year, month + 1, 1) }
		case "week": {
			const daysSinceMonday = (date.getDay() + 6) % 7
			return { start: new Date(year, month, day - daysSinceMonday), end: new Date(year, month, day - daysSinceMonday + 7) }
		}
		case "day":
			return { start: new Date(year, month, day), end: new Date(year, month, day + 1) }
	}
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
