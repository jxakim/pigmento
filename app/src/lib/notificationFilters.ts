import type { AppNotification, NotificationCategory, NotificationUrgency } from "#lib/sampleData.ts"

export type NotificationFilter = "all" | "urgent" | NotificationCategory

export const notificationFilters: NotificationFilter[] = ["all", "urgent", "inquiry", "deposit", "reminder", "follow-up"]

export const filterLabels: Record<NotificationFilter, string> = {
	all: "Alle",
	urgent: "Haster",
	inquiry: "Forespørsler",
	deposit: "Depositum",
	reminder: "Påminnelser",
	"follow-up": "Oppfølging"
}

export const urgencyLabels: Record<NotificationUrgency, string> = {
	urgent: "Haster",
	soon: "Snart",
	later: "Senere"
}

export const urgencies: NotificationUrgency[] = ["urgent", "soon", "later"]

export function matchesFilter(notification: AppNotification, filter: NotificationFilter): boolean {
	switch (filter) {
		case "all":
			return true
		case "urgent":
			return notification.urgency === "urgent"
		default:
			return notification.category === filter
	}
}
