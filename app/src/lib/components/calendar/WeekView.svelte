<script lang="ts">
	import type { Calendar, CalendarOptions } from "fullcalendar"
	import { dateMarkerToLocalDate, isSameDay } from "./calendarDates.ts"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		selectedDay?: Date
		onDayClick: (day: Date, dayElement: HTMLElement) => void
	}

	let { date, selectedDay, onDayClick }: Props = $props()

	let calendar = $state<Calendar>()

	const options: CalendarOptions = {
		initialView: "timeGridWeek",
		dateClick: ({ date: day, dayEl }) => onDayClick(day, dayEl)
	}

	function highlightSelectedDay(selected: Date | undefined) {
		calendar?.setOption("dayLaneClass", ({ date: dayMarker }) => (isSameDay(selected, dateMarkerToLocalDate(dayMarker)) ? "selectable-day selected-day" : "selectable-day"))
	}

	$effect(() => highlightSelectedDay(selectedDay))
</script>

<FullCalendar {options} {date} bind:calendar />
