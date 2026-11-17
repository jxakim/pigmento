import type { NotificationUrgency } from "#lib/sampleData.ts"

export const urgencies: NotificationUrgency[] = ["urgent", "soon", "later"]

export const urgencyLabels: Record<NotificationUrgency, string> = {
	urgent: "Haster",
	soon: "Snart",
	later: "Senere"
}

export const urgencyBarColor: Record<NotificationUrgency, string> = {
	urgent: "var(--ds-color-accent-border-strong)",
	soon: "var(--ds-color-accent-base-default)",
	later: "var(--ds-color-neutral-border-subtle)"
}
