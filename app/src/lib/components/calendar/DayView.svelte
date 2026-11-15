<script lang="ts">
	import type { CalendarOptions } from "fullcalendar"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
	}

	let { date }: Props = $props()

	const options: CalendarOptions = {
		initialView: "timeGridDay",
		selectable: true,
		expandRows: true,
		slotMinTime: "07:00",
		slotMaxTime: "21:00",
		allDaySlot: false
	}
</script>

<div class="day-view">
	<FullCalendar {options} {date} />
</div>

<style>
	.day-view {
		height: 100%;
	}
</style>
