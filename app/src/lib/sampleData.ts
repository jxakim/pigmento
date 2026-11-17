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

export interface ScheduledAppointment {
	clientName: string
	type: AppointmentType
	start: string
	end: string
}

export interface Inquiry {
	instagramHandle: string
	receivedAgo: string
	message: string
	hasWaitedLong: boolean
}

export type NotificationUrgency = "urgent" | "soon" | "later"

export type NotificationCategory = "inquiry" | "deposit" | "reminder" | "follow-up"

export interface AppNotification {
	id: string
	urgency: NotificationUrgency
	category: NotificationCategory
	subject: string
	title: string
	description: string
	dueLabel: string
	date?: string
	actionLabel: string
	actionHref: string
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

export const scheduledAppointments: ScheduledAppointment[] = [
	{ clientName: "Emma Lie", type: "Konsultasjon", start: "2026-11-02T11:00", end: "2026-11-02T12:00" },
	{ clientName: "Oskar Dal", type: "Tatovering", start: "2026-11-03T12:00", end: "2026-11-03T16:00" },
	{ clientName: "Pia Roll", type: "Touch-up", start: "2026-11-04T14:00", end: "2026-11-04T14:30" },
	{ clientName: "Mia Haugen", type: "Konsultasjon", start: "2026-11-05T10:00", end: "2026-11-05T11:00" },
	{ clientName: "Jonas Berg", type: "Tatovering", start: "2026-11-05T12:30", end: "2026-11-05T16:30" },
	{ clientName: "Sara Lund", type: "Touch-up", start: "2026-11-05T17:00", end: "2026-11-05T17:30" },
	{ clientName: "Kasper Aas", type: "Tatovering", start: "2026-11-06T11:00", end: "2026-11-06T15:00" },
	{ clientName: "Ida Moe", type: "Konsultasjon", start: "2026-11-06T15:00", end: "2026-11-06T16:00" },
	{ clientName: "Tobias Ness", type: "Tatovering", start: "2026-11-07T12:00", end: "2026-11-07T16:00" },
	{ clientName: "Nora Vik", type: "Konsultasjon", start: "2026-11-09T10:30", end: "2026-11-09T11:30" },
	{ clientName: "Henrik Dahl", type: "Touch-up", start: "2026-11-09T13:00", end: "2026-11-09T13:30" },
	{ clientName: "Lise Strand", type: "Tatovering", start: "2026-11-10T12:00", end: "2026-11-10T16:00" },
	{ clientName: "Aksel Roe", type: "Tatovering", start: "2026-11-12T11:00", end: "2026-11-12T15:00" },
	{ clientName: "Maja Fuglesang", type: "Konsultasjon", start: "2026-11-13T13:00", end: "2026-11-13T14:00" },
	{ clientName: "Elias Bakke", type: "Tatovering", start: "2026-11-14T12:00", end: "2026-11-14T17:00" },
	{ clientName: "Ine Solberg", type: "Tatovering", start: "2026-11-17T12:00", end: "2026-11-17T16:00" },
	{ clientName: "Leif Moen", type: "Konsultasjon", start: "2026-11-18T10:00", end: "2026-11-18T11:00" },
	{ clientName: "Rikke Hagen", type: "Touch-up", start: "2026-11-19T14:00", end: "2026-11-19T14:30" },
	{ clientName: "Sondre Vang", type: "Tatovering", start: "2026-11-20T11:00", end: "2026-11-20T15:00" },
	{ clientName: "Camilla Eik", type: "Tatovering", start: "2026-11-24T12:00", end: "2026-11-24T16:00" },
	{ clientName: "Jens Teig", type: "Konsultasjon", start: "2026-11-26T13:00", end: "2026-11-26T14:00" },
	{ clientName: "Hedda Lunde", type: "Tatovering", start: "2026-11-27T11:00", end: "2026-11-27T15:00" },
	{ clientName: "Magnus Ås", type: "Tatovering", start: "2026-11-28T12:00", end: "2026-11-28T16:00" }
]

export const notifications: AppNotification[] = [
	{
		id: "inquiry-martin",
		urgency: "urgent",
		category: "inquiry",
		subject: "@martin.sk",
		title: "@martin.sk har ventet i 6 dager",
		description: "Interessert i en konsultasjon før jul, passer det?",
		dueLabel: "Siden 30. okt",
		actionLabel: "Åpne Instagram",
		actionHref: "https://instagram.com/direct/inbox/"
	},
	{
		id: "deposit-kasper",
		urgency: "urgent",
		category: "deposit",
		subject: "Kasper Aas",
		title: "Kasper Aas mangler depositum",
		description: "Tatovering i morgen kl. 11:00 · kr 1 000",
		dueLabel: "I morgen",
		date: "2026-11-06",
		actionLabel: "Åpne kalenderen",
		actionHref: "/calendar"
	},
	{
		id: "deposit-lise",
		urgency: "soon",
		category: "deposit",
		subject: "Lise Strand",
		title: "Lise Strand mangler depositum",
		description: "Tatovering tirsdag 10. november kl. 12:00 · kr 1 500",
		dueLabel: "Om 5 dager",
		date: "2026-11-10",
		actionLabel: "Åpne kalenderen",
		actionHref: "/calendar"
	},
	{
		id: "inquiry-thea",
		urgency: "soon",
		category: "inquiry",
		subject: "@thea.rose",
		title: "@thea.rose har ventet i 3 dager",
		description: "Hva koster en håndflate-stor design på skulderen?",
		dueLabel: "Siden 2. nov",
		actionLabel: "Åpne Instagram",
		actionHref: "https://instagram.com/direct/inbox/"
	},
	{
		id: "reminder-tomorrow",
		urgency: "soon",
		category: "reminder",
		subject: "I morgen",
		title: "I morgen: 2 timer",
		description: "11:00 Kasper Aas (tatovering) · 15:00 Ida Moe (konsultasjon)",
		dueLabel: "I morgen",
		date: "2026-11-06",
		actionLabel: "Åpne kalenderen",
		actionHref: "/calendar"
	},
	{
		id: "follow-up-jonas",
		urgency: "later",
		category: "follow-up",
		subject: "Jonas Berg",
		title: "Send etterstell til Jonas Berg",
		description: "Økt 2 av 3 i dag. Husk å følge opp om to uker.",
		dueLabel: "I kveld",
		date: "2026-11-05",
		actionLabel: "Åpne kalenderen",
		actionHref: "/calendar"
	},
	{
		id: "reminder-supplies",
		urgency: "later",
		category: "reminder",
		subject: "Bestille nåler og farger",
		title: "Bestille nåler og farger",
		description: "Egen påminnelse fra ukenotatet",
		dueLabel: "Fredag",
		date: "2026-11-06",
		actionLabel: "Åpne kalenderen",
		actionHref: "/calendar"
	}
]

export const openInquiryCount = 8
