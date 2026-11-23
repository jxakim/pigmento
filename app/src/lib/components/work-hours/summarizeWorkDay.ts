import { formatDifference, formatDuration, formatHours, getDifferenceInMinutes, getDurationInMinutes, getWorkedHours, type WorkDay } from "#lib/workHours.ts"

export interface WorkDaySummary {
	duration: string
	hours: string
	difference?: { label: string; isDeviation: boolean }
}

export function summarizeWorkDay(day: WorkDay): WorkDaySummary {
	const workedHours = getWorkedHours(day)

	if (workedHours) {
		const differenceInMinutes = getDifferenceInMinutes(day)
		return {
			duration: formatDuration(getDurationInMinutes(workedHours)),
			hours: formatHours(workedHours),
			difference: day.planned ? { label: formatDifference(differenceInMinutes), isDeviation: differenceInMinutes !== 0 } : undefined
		}
	}
	if (day.logged) {
		return { duration: "Jobbet ikke", hours: day.planned ? `Planlagt ${formatHours(day.planned)}` : "" }
	}
	if (day.planned) {
		return { duration: formatDuration(getDurationInMinutes(day.planned)), hours: `${formatHours(day.planned)} · planlagt` }
	}
	return { duration: "Fri", hours: "" }
}
