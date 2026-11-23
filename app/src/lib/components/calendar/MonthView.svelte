<script lang="ts">
	import type { Calendar, CalendarOptions } from "fullcalendar"
	import { getDaysWithOpenNotifications } from "#lib/notifications.svelte.ts"
	import { getWorkDay } from "#lib/workHours.svelte.ts"
	import { joinClasses } from "./calendarAppearance.ts"
	import { calendarEvents } from "./calendarAppointments.ts"
	import { formatIsoDate, getDaysInRange, getMonthViewRange, isSameDay } from "./calendarDates.ts"
	import { renderMonthWorkHours } from "./calendarWorkHours.ts"
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
		initialView: "dayGridMonth",
		events: calendarEvents,
		eventDisplay: "block",
		eventTimeFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
		dayCellTopContent: ({ date: day, isToday }) => ({ html: renderDayCellTop(day, isToday, "") }),
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

	function renderDayCellTop(day: Date, isToday: boolean, workHoursHtml: string): string {
		return `<span class="calendar-day-number${isToday ? " is-today" : ""}">${day.getDate()}</span>${workHoursHtml}`
	}

	function updateDayCellTops(monthDate: Date, isWorkHoursShown: boolean) {
		const workHoursByDate = new Map(getDaysInRange(getMonthViewRange(monthDate)).map((day) => [formatIsoDate(day), isWorkHoursShown ? renderMonthWorkHours(getWorkDay(formatIsoDate(day))) : ""]))
		calendar?.setOption("dayCellTopContent", ({ date: day, isToday }) => ({ html: renderDayCellTop(day, isToday, workHoursByDate.get(formatIsoDate(day)) ?? "") }))
	}

	$effect(() => updateDayCells(selectedDay, getDaysWithOpenNotifications()))

	$effect(() => updateDayCellTops(date, showWorkHours))
</script>

<FullCalendar {options} {date} bind:calendar />
