import type { AppointmentType } from "#lib/sampleData.ts"

export type AppointmentColor = "info" | "neutral" | "warning"

export const appointmentTypeColor: Record<AppointmentType, AppointmentColor> = {
	Konsultasjon: "info",
	Tatovering: "neutral",
	"Touch-up": "warning"
}

export const appointmentTypes = Object.keys(appointmentTypeColor) as AppointmentType[]
