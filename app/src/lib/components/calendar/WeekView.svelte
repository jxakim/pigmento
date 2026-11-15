<script lang="ts">
	import type { Calendar, CalendarOptions, DateClickInfo } from "fullcalendar"
	import { dateMarkerToLocalDate, isSameDay } from "./calendarDates"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		selectedDay?: Date
		onSelectDay: (day: Date) => void
		onOpenDay: (day: Date, dayElement: HTMLElement) => void
	}

	let { date, selectedDay, onSelectDay, onOpenDay }: Props = $props()

	let calendar = $state<Calendar>()

	function getDayClass(dayMarker: Date, selected: Date | undefined): string {
		return isSameDay(selected, dateMarkerToLocalDate(dayMarker)) ? "week-day selected-day" : "week-day"
	}

	function selectOrOpenDay({ date: day, dayEl }: DateClickInfo) {
		if (isSameDay(selectedDay, day)) {
			onOpenDay(day, dayEl)
		} else {
			onSelectDay(day)
		}
	}

	const options: CalendarOptions = {
		initialView: "timeGridWeek",
		selectable: true,
		// Et enkelt klikk velger én dag, mens dra over flere timer velger en periode.
		selectMinDistance: 5,
		expandRows: true,
		slotMinTime: "07:00",
		slotMaxTime: "21:00",
		allDaySlot: false,
		dayLaneClass: ({ date: dayMarker }) => getDayClass(dayMarker, selectedDay),
		dateClick: selectOrOpenDay
	}

	$effect(() => {
		const selected = selectedDay
		calendar?.setOption("dayLaneClass", ({ date: dayMarker }) => getDayClass(dayMarker, selected))
	})
</script>

<div class="week-view">
	<FullCalendar {options} {date} bind:calendar />
</div>

<style>
	.week-view {
		height: 100%;
	}

	.week-view :global(.week-day) {
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.week-view :global(.week-day:hover) {
		background-color: var(--ds-color-accent-surface-tinted);
	}
</style>
