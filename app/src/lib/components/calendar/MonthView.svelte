<script lang="ts">
	import type { Calendar, CalendarOptions } from "fullcalendar"
	import { getDaysWithOpenNotifications } from "#lib/notifications.svelte.ts"
	import { joinClasses } from "./calendarAppearance.ts"
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
		eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
		eventContent: ({ timeText, event }) => `${timeText} ${event.extendedProps.shortTitle}`,
		fixedWeekCount: false,
		dayMaxEvents: 2,
		dateClick: ({ date: day, dayEl }) => onDayClick(day, dayEl)
	}

	function updateDayCells(selected: Date | undefined, daysWithNotifications: Set<string>) {
		calendar?.setOption("dayCellClass", ({ date: day, isOther }) =>
			joinClasses("calendar-day-cell", "selectable-day", isOther && "is-other-month", isSameDay(selected, day) && "selected-day", daysWithNotifications.has(formatIsoDate(day)) && "notification-day")
		)
	}

	$effect(() => updateDayCells(selectedDay, getDaysWithOpenNotifications()))
</script>

<FullCalendar {options} {date} bind:calendar />
