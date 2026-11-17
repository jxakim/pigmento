import type { AppointmentType } from "#lib/sampleData.ts"

export const appointmentTypes: AppointmentType[] = ["Konsultasjon", "Tatovering", "Touch-up"]

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
