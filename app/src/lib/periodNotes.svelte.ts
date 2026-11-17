import { SvelteMap } from "svelte/reactivity"

const notesByPeriodKey = new SvelteMap<string, string>()

export function getNote(periodKey: string): string {
	return notesByPeriodKey.get(periodKey) ?? ""
}

export function saveNote(periodKey: string, text: string) {
	notesByPeriodKey.set(periodKey, text)
}
