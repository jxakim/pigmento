<script lang="ts">
	import type { Calendar, CalendarOptions, DateClickInfo } from "fullcalendar"
	import { isSameDay } from "./calendarDates"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		selectedDay?: Date
		onSelectDay: (day: Date) => void
		onOpenDay: (day: Date, dayElement: HTMLElement) => void
	}

	let { date, selectedDay, onSelectDay, onOpenDay }: Props = $props()

	let calendar = $state<Calendar>()

	function getDayClass(day: Date, selected: Date | undefined): string {
		return isSameDay(selected, day) ? "month-day selected-day" : "month-day"
	}

	function selectOrOpenDay({ date: day, dayEl }: DateClickInfo) {
		if (isSameDay(selectedDay, day)) {
			onOpenDay(day, dayEl)
		} else {
			onSelectDay(day)
		}
	}

	const options: CalendarOptions = {
		initialView: "dayGridMonth",
		selectable: true,
		// Et enkelt klikk velger én dag, mens dra over flere dager velger en periode.
		selectMinDistance: 5,
		fixedWeekCount: false,
		dayMaxEvents: true,
		dayCellClass: ({ date: day }) => getDayClass(day, selectedDay),
		dateClick: selectOrOpenDay
	}

	$effect(() => {
		const selected = selectedDay
		calendar?.setOption("dayCellClass", ({ date: day }) => getDayClass(day, selected))
	})
</script>

<div class="month-view">
	<FullCalendar {options} {date} bind:calendar />
</div>

<style>
	.month-view {
		height: 100%;
	}

	.month-view :global(.month-day) {
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.month-view :global(.month-day:hover) {
		background-color: var(--ds-color-accent-surface-tinted);
	}
</style>
