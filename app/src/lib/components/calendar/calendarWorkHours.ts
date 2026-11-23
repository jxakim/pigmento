import type { EventInput } from "fullcalendar"
import { getTrackPosition } from "#lib/components/work-hours/workHoursTrack.ts"
import { formatDuration, formatHours, getDurationInMinutes, getWorkedHours, isSameHours, type WorkDay, type WorkHours } from "#lib/workHours.ts"

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
