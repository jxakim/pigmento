import type { CalendarLevel } from "./calendarLevels.ts"

const millisecondsPerDay = 24 * 60 * 60 * 1000

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

export function getDaysInRange({ start, end }: DateRange): Date[] {
	const dayCount = Math.round((end.getTime() - start.getTime()) / millisecondsPerDay)
	return Array.from({ length: dayCount }, (_, offset) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset))
}

// Ukene som dekker måneden, også dagene fra forrige og neste måned som vises i rutenettet.
export function getMonthViewRange(date: Date): DateRange {
	const { start, end } = getPeriodRange("month", date)
	const lastDay = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1)
	return { start: getPeriodRange("week", start).start, end: getPeriodRange("week", lastDay).end }
}

export function formatShortDate(date: Date): string {
	return `${date.getDate()}. ${abbreviateMonth(date)}`
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

export interface CalendarTitleParts {
	heading: string
	range?: string
}

export function formatCalendarTitle(level: CalendarLevel, date: Date): CalendarTitleParts {
	switch (level) {
		case "year":
			return { heading: String(date.getFullYear()) }
		case "month":
			return { heading: capitalize(date.toLocaleDateString("nb-NO", { month: "long", year: "numeric" })) }
		case "week":
			return { heading: `Uke ${getIsoWeekNumber(date)}`, range: formatWeekRange(date) }
		case "day":
			return { heading: capitalize(date.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })) }
	}
}

function formatWeekRange(date: Date): string {
	const { start, end } = getPeriodRange("week", date)
	const lastDay = new Date(end.getFullYear(), end.getMonth(), end.getDate() - 1)

	if (start.getMonth() === lastDay.getMonth()) {
		return `${start.getDate()}.–${lastDay.getDate()}. ${lastDay.toLocaleDateString("nb-NO", { month: "long" })}`
	}
	return `${start.getDate()}. ${abbreviateMonth(start)}–${lastDay.getDate()}. ${abbreviateMonth(lastDay)}`
}

function abbreviateMonth(day: Date): string {
	const monthName = day.toLocaleDateString("nb-NO", { month: "long" })
	return monthName.length > 3 ? `${monthName.slice(0, 3)}.` : monthName
}

function capitalize(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1)
}

export function formatPeriodName(level: CalendarLevel, date: Date): string {
	return (formatPeriodLabel(level, date) ?? String(date.getFullYear())).toLowerCase()
}

// Samme nøkkel for alle datoer i samme periode, så notatet finnes igjen uansett hvilken dag i uken man står på.
export function getPeriodKey(level: CalendarLevel, date: Date): string {
	return `${level}:${formatIsoDate(getPeriodRange(level, date).start)}`
}

// Klokkeslettet i en lokal ISO-tid som "2026-11-05T10:00".
export function formatTime(isoDateTime: string): string {
	return isoDateTime.slice(11, 16)
}

export function formatIsoDate(date: Date): string {
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	return `${date.getFullYear()}-${month}-${day}`
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

// 42 ruter (seks uker, mandag først). Ruter utenfor måneden er tomme.
export function getMonthGridDays(year: number, monthIndex: number): (Date | undefined)[] {
	const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
	const leadingBlanks = (new Date(year, monthIndex, 1).getDay() + 6) % 7

	return Array.from({ length: 42 }, (_, cell) => {
		const dayOfMonth = cell - leadingBlanks + 1
		return dayOfMonth >= 1 && dayOfMonth <= daysInMonth ? new Date(year, monthIndex, dayOfMonth) : undefined
	})
}
