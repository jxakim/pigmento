import { timeToMinutes, type WorkHours } from "#lib/workHours.ts"

const trackStartHour = 6
const trackEndHour = 22
const tickIntervalInHours = 2
const minutesPerHour = 60

export const trackTickHours = Array.from({ length: (trackEndHour - trackStartHour) / tickIntervalInHours + 1 }, (_, tick) => trackStartHour + tick * tickIntervalInHours)

function toPercent(minutes: number): number {
	return (minutes / ((trackEndHour - trackStartHour) * minutesPerHour)) * 100
}

export function getTickPosition(hour: number): string {
	return `${toPercent((hour - trackStartHour) * minutesPerHour)}%`
}

export function getTrackPosition({ start, end }: WorkHours): { left: string; width: string } {
	const startMinutes = timeToMinutes(start)
	return { left: `${toPercent(startMinutes - trackStartHour * minutesPerHour)}%`, width: `${toPercent(timeToMinutes(end) - startMinutes)}%` }
}
