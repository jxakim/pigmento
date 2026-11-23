// Eksempeldata for prototypen. Byttes ut med ekte data senere.
// Alle timer står i scheduledAppointments; «I dag» og «Kommende dager» hentes derfra.

import type { AppointmentType } from "#lib/appointmentTypes.ts"
import type { LoggedWorkDay, StandardWorkWeek } from "#lib/workHours.ts"

export interface ScheduledAppointment {
	clientName?: string
	description?: string
	type: AppointmentType
	start: string
	end: string
}

export interface Appointment {
	startTime: string
	endTime: string
	clientName?: string
	description?: string
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

export type NotificationUrgency = "urgent" | "soon" | "later"

export type NotificationCategory = "inquiry" | "deposit" | "reminder" | "follow-up"

export interface AppNotification {
	id: string
	urgency: NotificationUrgency
	category: NotificationCategory
	icon: string
	subject: string
	title: string
	description: string
	dueLabel: string
	date?: string
	actionLabel: string
	actionHref: string
}

const today = "2026-11-05"
const upcomingDayCount = 3

export const scheduledAppointments: ScheduledAppointment[] = [
	{ clientName: "Emma Lie", type: "consultation", start: "2026-11-02T11:00", end: "2026-11-02T12:00" },
	{ clientName: "Oskar Dal", type: "tattoo", start: "2026-11-03T12:00", end: "2026-11-03T16:00" },
	{ type: "notAvailable", start: "2026-11-04T14:00", end: "2026-11-04T15:00" },
	{ clientName: "Mia Haugen", description: "Underarm, fine line med blomster", type: "consultation", start: "2026-11-05T10:00", end: "2026-11-05T11:00" },
	{ clientName: "Jonas Berg", description: "Økt 2 av 3, overarm, blackwork", type: "tattoo", start: "2026-11-05T12:30", end: "2026-11-05T16:30" },
	{ type: "notAvailable", start: "2026-11-05T17:00", end: "2026-11-05T18:00" },
	{ clientName: "Kasper Aas", type: "tattoo", start: "2026-11-06T11:00", end: "2026-11-06T15:00" },
	{ clientName: "Ida Moe", type: "consultation", start: "2026-11-06T15:00", end: "2026-11-06T16:00" },
	{ clientName: "Tobias Ness", type: "tattoo", start: "2026-11-07T12:00", end: "2026-11-07T16:00" },
	{ clientName: "Nora Vik", type: "consultation", start: "2026-11-09T10:30", end: "2026-11-09T11:30" },
	{ type: "notAvailable", start: "2026-11-09T13:00", end: "2026-11-09T14:00" },
	{ clientName: "Lise Strand", type: "tattoo", start: "2026-11-10T12:00", end: "2026-11-10T16:00" },
	{ clientName: "Aksel Roe", type: "tattoo", start: "2026-11-12T11:00", end: "2026-11-12T15:00" },
	{ clientName: "Maja Fuglesang", type: "consultation", start: "2026-11-13T13:00", end: "2026-11-13T14:00" },
	{ clientName: "Elias Bakke", type: "tattoo", start: "2026-11-14T12:00", end: "2026-11-14T17:00" },
	{ type: "notAvailable", start: "2026-11-16T09:00", end: "2026-11-16T17:00" },
	{ clientName: "Ine Solberg", type: "tattoo", start: "2026-11-17T12:00", end: "2026-11-17T16:00" },
	{ clientName: "Leif Moen", type: "consultation", start: "2026-11-18T10:00", end: "2026-11-18T11:00" },
	{ type: "notAvailable", start: "2026-11-19T14:00", end: "2026-11-19T15:00" },
	{ clientName: "Sondre Vang", type: "tattoo", start: "2026-11-20T11:00", end: "2026-11-20T15:00" },
	{ clientName: "Camilla Eik", type: "tattoo", start: "2026-11-24T12:00", end: "2026-11-24T16:00" },
	{ clientName: "Jens Teig", type: "consultation", start: "2026-11-26T13:00", end: "2026-11-26T14:00" },
	{ clientName: "Hedda Lunde", type: "tattoo", start: "2026-11-27T11:00", end: "2026-11-27T15:00" },
	{ clientName: "Magnus Ås", type: "tattoo", start: "2026-11-28T12:00", end: "2026-11-28T16:00" }
]

const standardWorkDay = { start: "08:00", end: "16:00" }

export const standardWorkWeek: StandardWorkWeek = {
	monday: standardWorkDay,
	tuesday: standardWorkDay,
	wednesday: standardWorkDay,
	thursday: standardWorkDay,
	friday: standardWorkDay,
	saturday: undefined,
	sunday: undefined
}

export const loggedWorkDays: Record<string, LoggedWorkDay> = {
	"2026-11-02": { didWork: true, hours: { start: "08:00", end: "16:00" } },
	"2026-11-03": { didWork: true, hours: { start: "09:00", end: "17:00" } },
	"2026-11-04": { didWork: true, hours: { start: "09:00", end: "15:00" } },
	"2026-11-05": { didWork: true, hours: { start: "09:00", end: "17:30" } },
	"2026-11-09": { didWork: true, hours: { start: "08:00", end: "16:00" } },
	"2026-11-10": { didWork: true, hours: { start: "08:30", end: "16:30" } },
	"2026-11-11": { didWork: false },
	"2026-11-12": { didWork: true, hours: { start: "09:00", end: "17:00" } },
	"2026-11-13": { didWork: true, hours: { start: "08:00", end: "16:00" } },
	"2026-11-14": { didWork: true, hours: { start: "12:00", end: "17:00" } }
}

function dayOf(isoDateTime: string): string {
	return isoDateTime.slice(0, 10)
}

function timeOf(isoDateTime: string): string {
	return isoDateTime.slice(11, 16)
}

function formatDayLabel(isoDate: string, month: "long" | "short"): string {
	const label = new Intl.DateTimeFormat("nb-NO", { weekday: "long", day: "numeric", month }).format(new Date(`${isoDate}T12:00`))
	return (label.charAt(0).toUpperCase() + label.slice(1)).replace(/\.$/, "")
}

function appointmentsOn(isoDate: string): ScheduledAppointment[] {
	return scheduledAppointments.filter((appointment) => dayOf(appointment.start) === isoDate).sort((first, second) => first.start.localeCompare(second.start))
}

export const todayLabel = formatDayLabel(today, "long")

export const todaysAppointments: Appointment[] = appointmentsOn(today).map(({ clientName, description, type, start, end }) => ({
	startTime: timeOf(start),
	endTime: timeOf(end),
	clientName,
	description,
	type
}))

const upcomingDates = [...new Set(scheduledAppointments.map((appointment) => dayOf(appointment.start)))]
	.filter((isoDate) => isoDate > today)
	.sort()
	.slice(0, upcomingDayCount)

export const upcomingDays: UpcomingDay[] = upcomingDates.map((isoDate) => ({
	label: formatDayLabel(isoDate, "short"),
	appointments: appointmentsOn(isoDate).map(({ clientName, type, start }) => ({ startTime: timeOf(start), clientName, type }))
}))

export const waitingInquiries: Inquiry[] = [
	{ instagramHandle: "@martin.sk", receivedAgo: "6 dager siden", message: "Interessert i en konsultasjon før jul, passer det?", hasWaitedLong: true },
	{ instagramHandle: "@thea.rose", receivedAgo: "3 dager siden", message: "Hva koster en håndflate-stor design på skulderen?", hasWaitedLong: false },
	{ instagramHandle: "@andreas_o", receivedAgo: "I går", message: "Kan du dekke over en gammel tatovering på leggen? Sender bilde.", hasWaitedLong: false }
]

export const openInquiryCount = 8

export const notifications: AppNotification[] = [
	{
		id: "inquiry-martin",
		urgency: "urgent",
		category: "inquiry",
		icon: "chat_bubble",
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
		icon: "payments",
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
		icon: "payments",
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
		icon: "chat_bubble",
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
		icon: "event",
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
		icon: "healing",
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
		icon: "alarm",
		subject: "Bestille nåler og farger",
		title: "Bestille nåler og farger",
		description: "Egen påminnelse fra ukenotatet",
		dueLabel: "Fredag",
		date: "2026-11-06",
		actionLabel: "Åpne kalenderen",
		actionHref: "/calendar"
	}
]
