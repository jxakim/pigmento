<script lang="ts">
	import type { CalendarOptions } from "fullcalendar"
	import { calendarEvents } from "./calendarAppointments.ts"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
	}

	let { date }: Props = $props()

	const options: CalendarOptions = {
		initialView: "timeGridDay",
		events: calendarEvents
	}
</script>

<FullCalendar {options} {date} />
