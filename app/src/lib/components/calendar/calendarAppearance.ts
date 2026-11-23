import type { CalendarOptions } from "fullcalendar"

export function joinClasses(...classes: (string | false | undefined)[]): string {
	return classes.filter(Boolean).join(" ")
}

function formatShortWeekday(day: Date): string {
	const weekday = day.toLocaleDateString("nb-NO", { weekday: "short" }).replace(".", "")
	return weekday.charAt(0).toUpperCase() + weekday.slice(1)
}

// Gir FullCalendar-elementene klassene som calendarTheme.css styler.
export const calendarAppearance: CalendarOptions = {
	dayHeaderClass: ({ isToday }) => joinClasses("calendar-day-header", isToday && "is-today"),
	dayHeaderInnerClass: "calendar-day-header-inner",
	dayHeaderContent: ({ date, isToday, view }) => {
		const weekday = formatShortWeekday(date)
		const isTimeGrid = view.type.startsWith("timeGrid")
		return isTimeGrid ? { html: `<span class="calendar-weekday">${weekday}</span><span class="calendar-date-number${isToday ? " is-today" : ""}">${date.getDate()}</span>` } : weekday
	},
	dayCellTopClass: "calendar-day-top",
	dayCellTopInnerClass: "calendar-day-top-inner",
	rowEventClass: "calendar-chip",
	rowEventInnerClass: "calendar-chip-inner",
	rowMoreLinkClass: "calendar-more-link",
	moreLinkContent: ({ num }) => `+${num} til`,
	slotHeaderClass: "calendar-hour-header",
	slotHeaderInnerClass: "calendar-hour-label",
	slotLaneClass: "calendar-hour-lane",
	backgroundEventClass: ({ event }) => joinClasses("calendar-work-hours", `is-${event.extendedProps.workHoursKind}`),
	backgroundEventContent: ({ event }) => event.extendedProps.workHoursLabel,
	columnEventClass: "calendar-block",
	columnEventInnerClass: "calendar-block-inner",
	columnEventTimeClass: "calendar-block-time",
	columnEventTitleClass: "calendar-block-title"
}
