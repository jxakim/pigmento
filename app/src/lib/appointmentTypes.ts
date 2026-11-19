// Eneste sted timetyper defineres. Rekkefølgen her er visningsrekkefølgen; priority avgjør hvilken type som farger en dag med flere timer (lavest vinner).
const appointmentTypeDefinitions = {
	Konsultasjon: { priority: 2, background: "#e1ecf8", text: "#1b4672", dot: "#8db2e0" },
	Tatovering: { priority: 1, background: "#14171a", text: "#ffffff", dot: "#14171a" },
	"Touch-up": { priority: 3, background: "#f6e6c4", text: "#654500", dot: "#e8c777" }
} satisfies Record<string, AppointmentTypeDefinition>

interface AppointmentTypeDefinition {
	priority: number
	background: string
	text: string
	dot: string
}

export type AppointmentType = keyof typeof appointmentTypeDefinitions

export const appointmentTypes = Object.keys(appointmentTypeDefinitions) as AppointmentType[]

export const appointmentTypeStyle: Record<AppointmentType, AppointmentTypeDefinition> = appointmentTypeDefinitions

export const appointmentTypesByPriority = [...appointmentTypes].sort((first, second) => appointmentTypeStyle[first].priority - appointmentTypeStyle[second].priority)
