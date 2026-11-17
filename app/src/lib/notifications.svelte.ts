import { SvelteMap } from "svelte/reactivity"
import { type AppNotification, notifications } from "#lib/sampleData.ts"

type HandledStatus = "done" | "snoozed"

const handledStatusById = new SvelteMap<string, HandledStatus>()

export function getOpenNotifications(): AppNotification[] {
	return notifications.filter((notification) => !handledStatusById.has(notification.id))
}

export function getUrgentNotifications(): AppNotification[] {
	return getOpenNotifications().filter((notification) => notification.urgency === "urgent")
}

export function countHandled(status: HandledStatus): number {
	return [...handledStatusById.values()].filter((handledStatus) => handledStatus === status).length
}

export function markAsDone(id: string) {
	handledStatusById.set(id, "done")
}

export function snoozeUntilTomorrow(id: string) {
	handledStatusById.set(id, "snoozed")
}
