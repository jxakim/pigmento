// Eneste sted timetyper defineres. Nøkkelen er en fast ID som lagres på timene; label er teksten brukeren ser og kan endres fritt.
// Rekkefølgen her er visningsrekkefølgen; priority avgjør hvilken type som farger en dag med flere timer (lavest vinner).
const appointmentTypeDefinitions = {
	consultation: {
		label: "Konsultasjon",
		priority: 2,
		background: "#e1ecf8",
		text: "#1b4672",
		dot: "#8db2e0"
	},
	tattoo: {
		label: "Tatovering",
		priority: 1,
		background: "#002142",
		text: "#ffffff",
		dot: "#002142"
	},
	notAvailable: {
		label: "Ikke tilgjengelig",
		priority: 3,
		background: "#c2c2c2",
		text: "#333333",
		dot: "#c2c2c2"
	}
} satisfies Record<string, AppointmentTypeDetails>

interface AppointmentTypeDetails {
	label: string
	priority: number
	background: string
	text: string
	dot: string
}

export type AppointmentType = keyof typeof appointmentTypeDefinitions

export const appointmentTypes = Object.keys(appointmentTypeDefinitions) as AppointmentType[]

export const appointmentTypeDetails: Record<AppointmentType, AppointmentTypeDetails> = appointmentTypeDefinitions

export const appointmentTypesByPriority = [...appointmentTypes].sort((first, second) => appointmentTypeDetails[first].priority - appointmentTypeDetails[second].priority)

// Timer uten kundenavn (f.eks. «Ikke tilgjengelig») vises med navnet på typen.
export function appointmentTitle({ clientName, type }: { clientName?: string; type: AppointmentType }): string {
	return clientName ?? appointmentTypeDetails[type].label
}
