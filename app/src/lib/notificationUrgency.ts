import type { NotificationUrgency } from "#lib/sampleData.ts"

export const urgencies: NotificationUrgency[] = ["urgent", "soon", "later"]

export const urgencyLabels: Record<NotificationUrgency, string> = {
	urgent: "Haster",
	soon: "Snart",
	later: "Senere"
}

export const urgencyColor: Record<NotificationUrgency, string> = {
	urgent: "danger",
	soon: "warning",
	later: "neutral"
}
