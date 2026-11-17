<script lang="ts">
	import type { CalendarOptions, DatesSetInfo } from "fullcalendar"
	import { scheduledAppointments } from "#lib/sampleData.ts"
	import { findDayColor } from "./calendarAppointments.ts"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		onOpenMonth: (month: Date, monthElement: HTMLElement) => void
	}

	let { date, onOpenMonth }: Props = $props()

	let container: HTMLDivElement
	let firstMonthOfYear = new Date()

	const options: CalendarOptions = {
		initialView: "multiMonthYear",
		borderless: true,
		selectable: false,
		singleMonthMinWidth: 40,
		multiMonthMaxColumns: 3,
		singleMonthClass: "year-month",
		singleMonthHeaderClass: "year-month-title",
		fixedWeekCount: false,
		dayCellClass: ({ date: day, isToday }) => getDayClasses(day, isToday),
		datesSet: handleDatesSet
	}

	function getDayClasses(day: Date, isToday: boolean): string {
		const dayColor = findDayColor(scheduledAppointments, day)
		return ["year-day", isToday && "year-today", dayColor && `year-day-${dayColor}`].filter(Boolean).join(" ")
	}

	function handleDatesSet({ view }: DatesSetInfo) {
		firstMonthOfYear = view.currentStart
		requestAnimationFrame(makeMonthsAccessible)
	}

	function getMonthElements(): HTMLElement[] {
		return Array.from(container.querySelectorAll<HTMLElement>(".year-month"))
	}

	function getMonthDate(monthElement: HTMLElement): Date {
		const monthIndex = getMonthElements().indexOf(monthElement)
		return new Date(firstMonthOfYear.getFullYear(), firstMonthOfYear.getMonth() + monthIndex, 1)
	}

	function makeMonthsAccessible() {
		for (const monthElement of getMonthElements()) {
			const monthName = getMonthDate(monthElement).toLocaleDateString("nb-NO", { month: "long", year: "numeric" })
			monthElement.tabIndex = 0
			monthElement.setAttribute("role", "button")
			monthElement.setAttribute("aria-label", `Åpne ${monthName}`)
		}
	}

	function openClickedMonth(event: Event) {
		const monthElement = (event.target as Element).closest<HTMLElement>(".year-month")
		if (!monthElement) {
			return
		}
		event.preventDefault()
		onOpenMonth(getMonthDate(monthElement), monthElement)
	}

	function openMonthOnEnterOrSpace(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			openClickedMonth(event)
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions (månedene inni har role="button") -->
<div class="year-view" bind:this={container} onclick={openClickedMonth} onkeydown={openMonthOnEnterOrSpace}>
	<FullCalendar {options} {date} />
</div>

<style>
	.year-view {
		height: 100%;
	}

	/* Hele året vises som et rutenett på 3 x 4 måneder som fyller visningen, uten scrolling. */
	.year-view :global(:has(> * > .year-month)) {
		display: grid !important;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-auto-rows: minmax(0, 1fr);
		gap: 1rem 2rem;
		height: 100%;
	}

	.year-view :global(:has(> .year-month)) {
		width: auto !important;
	}

	.year-view :global(.year-month) {
		container-type: size;
		height: 100%;
		margin: 0;
		padding: 0.75rem;
		border-radius: var(--ds-border-radius-lg);
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	/* Tekststørrelsen følger månedens høyde (cqh) og bredde (cqi), og den minste vinner. */
	.year-view :global(.year-month *) {
		pointer-events: none;
		margin: 0;
		padding: 0;
		border: none;
		font-size: clamp(0.5rem, min(8.5cqh, 9.5cqi), 1.125rem);
		line-height: 1.3;
		background: none;
	}

	/* FullCalendar gir månedene fast størrelsesforhold og radhøyde. Disse overstyres så høyden følger teksten. */
	.year-view :global(.year-month [style*="aspect-ratio"]) {
		aspect-ratio: auto !important;
	}

	.year-view :global(.year-month [style*="aspect-ratio"] > :first-child) {
		position: static !important;
	}

	.year-view :global(.year-month [style*="flex-basis"]) {
		flex-basis: auto !important;
	}

	.year-view :global(.year-day),
	.year-view :global(.year-day *) {
		justify-content: center;
		text-align: center;
	}

	.year-view :global(.year-month-title),
	.year-view :global(.year-month-title *) {
		padding-bottom: 0.25em;
		font-size: clamp(0.6rem, min(10cqh, 12cqi), 1.3rem);
		font-weight: 600;
		text-transform: capitalize;
	}

	.year-view :global(.year-month [role="columnheader"]),
	.year-view :global(.year-month [role="columnheader"] *) {
		color: var(--ds-color-neutral-text-subtle);
	}

	.year-view :global(.year-month:hover) {
		background-color: var(--ds-color-accent-surface-tinted);
	}

	.year-view :global(.year-day-info) {
		border-radius: var(--ds-border-radius-sm);
		background-color: var(--ds-color-info-surface-tinted);
		color: var(--ds-color-info-text-default);
		font-weight: 700;
	}

	.year-view :global(.year-day-neutral) {
		border-radius: var(--ds-border-radius-sm);
		background-color: var(--ds-color-neutral-surface-active);
		color: var(--ds-color-neutral-text-default);
		font-weight: 700;
	}

	.year-view :global(.year-day-warning) {
		border-radius: var(--ds-border-radius-sm);
		background-color: var(--ds-color-warning-surface-tinted);
		color: var(--ds-color-warning-text-default);
		font-weight: 700;
	}

	.year-view :global(.year-today) {
		border-radius: var(--ds-border-radius-sm);
		background-color: var(--ds-color-accent-base-default);
		color: var(--ds-color-accent-base-contrast-default);
		font-weight: 700;
	}

	.year-view :global(.year-month:focus-visible) {
		outline: 0.125rem solid var(--ds-color-accent-border-default);
		outline-offset: 0.125rem;
	}

	@media (max-width: 57.5rem) {
		.year-view :global(:has(> * > .year-month)) {
			gap: 0.5rem;
		}

		.year-view :global(.year-month) {
			padding: 0.25rem;
		}
	}
</style>
