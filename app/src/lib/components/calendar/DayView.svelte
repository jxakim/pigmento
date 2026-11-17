<script lang="ts">
	import type { CalendarOptions } from "fullcalendar"
	import { joinClasses } from "./calendarAppearance.ts"
	import { calendarEvents } from "./calendarAppointments.ts"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
	}

	let { date }: Props = $props()

	const options: CalendarOptions = {
		initialView: "timeGridDay",
		events: calendarEvents,
		eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
		dayLaneClass: ({ isToday }) => joinClasses("calendar-day-lane", isToday && "is-today")
	}
</script>

<FullCalendar {options} {date} />
