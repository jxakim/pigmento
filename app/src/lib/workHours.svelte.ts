import { SvelteMap } from "svelte/reactivity"
import { loggedWorkDays, standardWorkWeek } from "#lib/sampleData.ts"
import { getPlannedHours, type LoggedWorkDay, type StandardWorkWeek, type Weekday, type WorkDay, type WorkHours } from "#lib/workHours.ts"

const standardWeek = $state<StandardWorkWeek>({ ...standardWorkWeek })
const loggedDays = new SvelteMap<string, LoggedWorkDay>(Object.entries(loggedWorkDays))

export function getStandardWeek(): StandardWorkWeek {
	return standardWeek
}

export function setStandardDay(weekday: Weekday, hours: WorkHours | undefined) {
	standardWeek[weekday] = hours
}

export function getWorkDay(isoDate: string): WorkDay {
	return { isoDate, planned: getPlannedHours(standardWeek, isoDate), logged: loggedDays.get(isoDate) }
}

export function logWorkedHours(isoDate: string, hours: WorkHours) {
	loggedDays.set(isoDate, { didWork: true, hours })
}

export function logDidNotWork(isoDate: string) {
	loggedDays.set(isoDate, { didWork: false })
}
