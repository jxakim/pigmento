import type { AppointmentType } from "#lib/sampleData.ts"

export type AppointmentColor = "info" | "neutral" | "warning"

export const appointmentTypeColor: Record<AppointmentType, AppointmentColor> = {
	Konsultasjon: "info",
	Tatovering: "neutral",
	"Touch-up": "warning"
}

export const appointmentTypes = Object.keys(appointmentTypeColor) as AppointmentType[]

interface AppointmentTypeStyle {
	background: string
	text: string
	dot: string
}

export const appointmentTypeStyle: Record<AppointmentType, AppointmentTypeStyle> = {
	Konsultasjon: { background: "var(--pg-consultation-background)", text: "var(--pg-consultation-text)", dot: "var(--pg-consultation-dot)" },
	Tatovering: { background: "var(--pg-tattoo-background)", text: "var(--pg-tattoo-text)", dot: "var(--pg-tattoo-background)" },
	"Touch-up": { background: "var(--pg-touch-up-background)", text: "var(--pg-touch-up-text)", dot: "var(--pg-touch-up-dot)" }
}
