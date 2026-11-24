<script lang="ts">
	import type { Calendar, CalendarOptions } from "fullcalendar"
	import { joinClasses } from "./calendarAppearance.ts"
	import { isSameDay } from "./calendarDates.ts"
	import { showCalendarEvents } from "./calendarWorkHours.svelte.ts"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		showWorkHours: boolean
		selectedDay?: Date
		onDayClick: (day: Date, dayElement: HTMLElement) => void
	}

	let { date, showWorkHours, selectedDay, onDayClick }: Props = $props()

	let calendar = $state<Calendar>()

	const options: CalendarOptions = {
		initialView: "timeGridWeek",
		eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
		displayEventEnd: false,
		dateClick: ({ date: day, dayEl }) => onDayClick(day, dayEl)
	}

	function updateDayLanes(selected: Date | undefined) {
		calendar?.setOption("dayLaneClass", ({ date: day, isToday }) => joinClasses("calendar-day-lane", "selectable-day", isToday && "is-today", isSameDay(selected, day) && "selected-day"))
	}

	$effect(() => updateDayLanes(selectedDay))

	$effect(() => showCalendarEvents(calendar, "week", date, showWorkHours))
</script>

<FullCalendar {options} {date} bind:calendar />
