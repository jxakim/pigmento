// Eksempeldata for prototypen. Bytt ut med ekte data (f.eks. fra Supabase) senere.

export type AppointmentType = "Konsultasjon" | "Tatovering" | "Touch-up"

export interface Appointment {
	start: string
	end: string
	client: string
	note: string
	type: AppointmentType
}

export interface UpcomingDay {
	label: string
	items: { start: string; client: string; type: AppointmentType }[]
}

export interface Inquiry {
	ig: string
	age: string
	text: string
	stale: boolean
}

/** CSS-klasse per timetype (fargene er definert i app.css). */
export const typeClass: Record<AppointmentType, string> = {
	Konsultasjon: "chip-konsult",
	Tatovering: "chip-tattoo",
	"Touch-up": "chip-touch"
}

export const todayLabel = "Torsdag 5. november"

export const today: Appointment[] = [
	{ start: "10:00", end: "11:00", client: "Mia Haugen", note: "Underarm, fine line med blomster", type: "Konsultasjon" },
	{ start: "12:30", end: "16:30", client: "Jonas Berg", note: "Økt 2 av 3, overarm, blackwork", type: "Tatovering" },
	{ start: "17:00", end: "17:30", client: "Sara Lund", note: "Ankel, kontroll etter seks uker", type: "Touch-up" }
]

export const upcomingDays: UpcomingDay[] = [
	{
		label: "Fredag 6. nov",
		items: [
			{ start: "11:00", client: "Kasper Aas", type: "Tatovering" },
			{ start: "15:00", client: "Ida Moe", type: "Konsultasjon" }
		]
	},
	{ label: "Lørdag 7. nov", items: [{ start: "12:00", client: "Tobias Ness", type: "Tatovering" }] },
	{
		label: "Mandag 9. nov",
		items: [
			{ start: "10:30", client: "Nora Vik", type: "Konsultasjon" },
			{ start: "13:00", client: "Henrik Dahl", type: "Touch-up" }
		]
	}
]

/** De som har ventet lengst, øverst. Resten vises på en egen side senere. */
export const waitingInquiries: Inquiry[] = [
	{ ig: "@martin.sk", age: "6 dager siden", text: "Interessert i en konsultasjon før jul, passer det?", stale: true },
	{ ig: "@thea.rose", age: "3 dager siden", text: "Hva koster en håndflate-stor design på skulderen?", stale: false },
	{ ig: "@andreas_o", age: "I går", text: "Kan du dekke over en gammel tatovering på leggen? Sender bilde.", stale: false }
]

/** Totalt antall åpne forespørsler (flere enn de som vises på forsiden). */
export const inquiryCount = 4
