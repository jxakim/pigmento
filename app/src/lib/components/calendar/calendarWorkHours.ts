import type { EventInput } from "fullcalendar"
import { getTrackPosition } from "#lib/components/work-hours/workHoursTrack.ts"
import { formatDuration, formatHours, getDurationInMinutes, getWorkedHours, isSameHours, timeToMinutes, type WorkDay, type WorkHours } from "#lib/workHours.ts"
import type { DateRange } from "./calendarDates.ts"

type WorkHoursKind = "planned" | "worked"

function toBackgroundEvent(isoDate: string, hours: WorkHours, kind: WorkHoursKind): EventInput {
	return {
		start: `${isoDate}T${hours.start}`,
		end: `${isoDate}T${hours.end}`,
		display: "background",
		extendedProps: { workHoursKind: kind, workHoursLabel: kind === "worked" ? formatHours(hours) : "" }
	}
}

export function toWorkHoursEvents(days: WorkDay[]): EventInput[] {
	return days.flatMap((day) => {
		const workedHours = getWorkedHours(day)
		return [...(day.planned ? [toBackgroundEvent(day.isoDate, day.planned, "planned")] : []), ...(workedHours ? [toBackgroundEvent(day.isoDate, workedHours, "worked")] : [])]
	})
}

// Måned: timene til dagen og en liten stolpe med planlagt og jobbet tid, som legges ved siden av datoen i cellen.
export function renderMonthWorkHours(day: WorkDay): string {
	const workedHours = getWorkedHours(day)
	const shownHours = workedHours ?? day.planned
	if (!shownHours) {
		return ""
	}

	const isDeviation = workedHours !== undefined && day.planned !== undefined && !isSameHours(workedHours, day.planned)
	const duration = `<span class="calendar-work-duration${workedHours ? "" : " is-planned"}">${isDeviation ? '<span class="calendar-work-deviation"></span>' : ""}${formatDuration(getDurationInMinutes(shownHours))}</span>`
	const bar = [day.planned && renderBarPart(day.planned, "planned"), workedHours && renderBarPart(workedHours, "worked")].filter(Boolean).join("")

	return `${duration}<span class="calendar-work-bar">${bar}</span>`
}

function renderBarPart(hours: WorkHours, kind: WorkHoursKind): string {
	const { left, width } = getTrackPosition(hours)
	return `<span class="calendar-work-bar-${kind}" style="left:${left};width:${width}"></span>`
}

const defaultFirstHour = 7
const defaultLastHour = 19

function formatSlotTime(hour: number): string {
	return `${String(hour).padStart(2, "0")}:00:00`
}

// Uke og dag viser 07:00 til 19:00, og blir lengre når en avtale eller arbeidsdag starter tidligere eller slutter senere.
export function getSlotRange(events: EventInput[], { start, end }: DateRange): { slotMinTime: string; slotMaxTime: string } {
	const eventsInRange = events.filter((event) => new Date(String(event.start)) >= start && new Date(String(event.start)) < end)
	const firstHours = eventsInRange.map((event) => timeToMinutes(String(event.start).slice(11, 16)) / 60)
	const lastHours = eventsInRange.map((event) => timeToMinutes(String(event.end).slice(11, 16)) / 60)

	return {
		slotMinTime: formatSlotTime(Math.min(defaultFirstHour, ...firstHours.map(Math.floor))),
		slotMaxTime: formatSlotTime(Math.max(defaultLastHour, ...lastHours.map(Math.ceil)))
	}
}
