<script lang="ts">
	import type { Calendar, CalendarOptions } from "fullcalendar"
	import { joinClasses } from "./calendarAppearance.ts"
	import { showCalendarEvents } from "./calendarWorkHours.svelte.ts"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		showWorkHours: boolean
	}

	let { date, showWorkHours }: Props = $props()

	let calendar = $state<Calendar>()

	const options: CalendarOptions = {
		initialView: "timeGridDay",
		eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
		dayLaneClass: ({ isToday }) => joinClasses("calendar-day-lane", isToday && "is-today")
	}

	$effect(() => showCalendarEvents(calendar, "day", date, showWorkHours))
</script>

<FullCalendar {options} {date} bind:calendar />
