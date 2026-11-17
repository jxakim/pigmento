// Eksempeldata for prototypen. Byttes ut med ekte data senere.

export type AppointmentType = "Konsultasjon" | "Tatovering" | "Touch-up"

export interface Appointment {
	startTime: string
	endTime: string
	clientName: string
	description: string
	type: AppointmentType
}

export type UpcomingAppointment = Pick<Appointment, "startTime" | "clientName" | "type">

export interface UpcomingDay {
	label: string
	appointments: UpcomingAppointment[]
}

export interface Inquiry {
	instagramHandle: string
	receivedAgo: string
	message: string
	hasWaitedLong: boolean
}

export const todayLabel = "Torsdag 5. november"

export const todaysAppointments: Appointment[] = [
	{ startTime: "10:00", endTime: "11:00", clientName: "Mia Haugen", description: "Underarm, fine line med blomster", type: "Konsultasjon" },
	{ startTime: "12:30", endTime: "16:30", clientName: "Jonas Berg", description: "Økt 2 av 3, overarm, blackwork", type: "Tatovering" },
	{ startTime: "17:00", endTime: "17:30", clientName: "Sara Lund", description: "Ankel, kontroll etter seks uker", type: "Touch-up" }
]

export const upcomingDays: UpcomingDay[] = [
	{
		label: "Fredag 6. nov",
		appointments: [
			{ startTime: "11:00", clientName: "Kasper Aas", type: "Tatovering" },
			{ startTime: "15:00", clientName: "Ida Moe", type: "Konsultasjon" }
		]
	},
	{
		label: "Lørdag 7. nov",
		appointments: [{ startTime: "12:00", clientName: "Tobias Ness", type: "Tatovering" }]
	},
	{
		label: "Mandag 9. nov",
		appointments: [
			{ startTime: "10:30", clientName: "Nora Vik", type: "Konsultasjon" },
			{ startTime: "13:00", clientName: "Henrik Dahl", type: "Touch-up" }
		]
	}
]

export const waitingInquiries: Inquiry[] = [
	{ instagramHandle: "@martin.sk", receivedAgo: "6 dager siden", message: "Interessert i en konsultasjon før jul, passer det?", hasWaitedLong: true },
	{ instagramHandle: "@thea.rose", receivedAgo: "3 dager siden", message: "Hva koster en håndflate-stor design på skulderen?", hasWaitedLong: false },
	{ instagramHandle: "@andreas_o", receivedAgo: "I går", message: "Kan du dekke over en gammel tatovering på leggen? Sender bilde.", hasWaitedLong: false }
]

export const openInquiryCount = 8
