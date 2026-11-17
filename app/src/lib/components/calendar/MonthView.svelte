<script lang="ts">
	import type { Calendar, CalendarOptions } from "fullcalendar"
	import { getDaysWithOpenNotifications } from "#lib/notifications.svelte.ts"
	import { calendarEvents } from "./calendarAppointments.ts"
	import { formatIsoDate, isSameDay } from "./calendarDates.ts"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		selectedDay?: Date
		onDayClick: (day: Date, dayElement: HTMLElement) => void
	}

	let { date, selectedDay, onDayClick }: Props = $props()

	let calendar = $state<Calendar>()

	const options: CalendarOptions = {
		initialView: "dayGridMonth",
		events: calendarEvents,
		eventDisplay: "block",
		fixedWeekCount: false,
		dayMaxEvents: true,
		dateClick: ({ date: day, dayEl }) => onDayClick(day, dayEl)
	}

	function updateDayCells(selected: Date | undefined, daysWithNotifications: Set<string>) {
		calendar?.setOption("dayCellClass", ({ date: day }) =>
			["selectable-day", isSameDay(selected, day) && "selected-day", daysWithNotifications.has(formatIsoDate(day)) && "notification-day"].filter(Boolean).join(" ")
		)
	}

	$effect(() => updateDayCells(selectedDay, getDaysWithOpenNotifications()))
</script>

<FullCalendar {options} {date} bind:calendar />
