export interface WorkHours {
	start: string
	end: string
}

export type LoggedWorkDay = { didWork: true; hours: WorkHours } | { didWork: false }

export const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const

export type Weekday = (typeof weekdays)[number]

export type StandardWorkWeek = Record<Weekday, WorkHours | undefined>

export const weekdayNames: Record<Weekday, { long: string; short: string }> = {
	monday: { long: "Mandag", short: "Man" },
	tuesday: { long: "Tirsdag", short: "Tir" },
	wednesday: { long: "Onsdag", short: "Ons" },
	thursday: { long: "Torsdag", short: "Tor" },
	friday: { long: "Fredag", short: "Fre" },
	saturday: { long: "Lørdag", short: "Lør" },
	sunday: { long: "Søndag", short: "Søn" }
}

export interface WorkDay {
	isoDate: string
	planned?: WorkHours
	logged?: LoggedWorkDay
}

const minutesPerHour = 60
const timeStepInMinutes = 30
const earliestTimeInMinutes = 6 * minutesPerHour
const latestTimeInMinutes = 22 * minutesPerHour

export function timeToMinutes(time: string): number {
	const [hours, minutes] = time.split(":").map(Number)
	return hours * minutesPerHour + minutes
}

export function minutesToTime(minutes: number): string {
	const hours = String(Math.floor(minutes / minutesPerHour)).padStart(2, "0")
	const remainingMinutes = String(minutes % minutesPerHour).padStart(2, "0")
	return `${hours}:${remainingMinutes}`
}

export const workTimeOptions = Array.from({ length: (latestTimeInMinutes - earliestTimeInMinutes) / timeStepInMinutes + 1 }, (_, step) =>
	minutesToTime(earliestTimeInMinutes + step * timeStepInMinutes)
)

export function getDurationInMinutes(hours: WorkHours | undefined): number {
	return hours ? timeToMinutes(hours.end) - timeToMinutes(hours.start) : 0
}

export function formatDuration(minutes: number): string {
	const hours = minutes / minutesPerHour
	return `${Number.isInteger(hours) ? hours : hours.toFixed(1).replace(".", ",")} t`
}

export function formatHours({ start, end }: WorkHours): string {
	return `${start}–${end}`
}

export function formatDifference(minutes: number): string {
	if (minutes === 0) {
		return "Som planlagt"
	}
	return `${minutes > 0 ? "+" : "−"}${formatDuration(Math.abs(minutes))}`
}

export function isSameHours(first: WorkHours | undefined, second: WorkHours | undefined): boolean {
	return first?.start === second?.start && first?.end === second?.end
}

export function withStart(hours: WorkHours, start: string): WorkHours {
	const earliestEnd = timeToMinutes(start) + timeStepInMinutes
	return { start, end: minutesToTime(Math.max(timeToMinutes(hours.end), earliestEnd)) }
}

export function withEnd(hours: WorkHours, end: string): WorkHours {
	const latestStart = timeToMinutes(end) - timeStepInMinutes
	return { start: minutesToTime(Math.min(timeToMinutes(hours.start), latestStart)), end }
}

export function getWeekday(isoDate: string): Weekday {
	const daysFromMonday = (new Date(`${isoDate}T12:00`).getDay() + 6) % 7
	return weekdays[daysFromMonday]
}

export function getPlannedHours(standardWeek: StandardWorkWeek, isoDate: string): WorkHours | undefined {
	return standardWeek[getWeekday(isoDate)]
}

export function getWorkedHours({ logged }: WorkDay): WorkHours | undefined {
	return logged?.didWork ? logged.hours : undefined
}

export function getDifferenceInMinutes(day: WorkDay): number {
	const workedHours = getWorkedHours(day)
	return workedHours && day.planned ? getDurationInMinutes(workedHours) - getDurationInMinutes(day.planned) : 0
}

export function getTotals(days: WorkDay[]): { plannedMinutes: number; workedMinutes: number } {
	return {
		plannedMinutes: days.reduce((total, day) => total + getDurationInMinutes(day.planned), 0),
		workedMinutes: days.reduce((total, day) => total + getDurationInMinutes(getWorkedHours(day)), 0)
	}
}
