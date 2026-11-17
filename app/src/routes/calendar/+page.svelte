<script lang="ts">
	import { tick } from "svelte"
	import CalendarDistribution from "#lib/components/calendar/CalendarDistribution.svelte"
	import CalendarNotes from "#lib/components/calendar/CalendarNotes.svelte"
	import CalendarTitle from "#lib/components/calendar/CalendarTitle.svelte"
	import CalendarToolbar from "#lib/components/calendar/CalendarToolbar.svelte"
	import { filterByPeriod } from "#lib/components/calendar/calendarAppointments.ts"
	import { isSameDay, moveByPeriods, parseIsoDate } from "#lib/components/calendar/calendarDates.ts"
	import { type CalendarLevel, isZoomingIn, parentLevel } from "#lib/components/calendar/calendarLevels.ts"
	import DayContextMenu, { type DayAction } from "#lib/components/calendar/DayContextMenu.svelte"
	import DayView from "#lib/components/calendar/DayView.svelte"
	import MonthView from "#lib/components/calendar/MonthView.svelte"
	import WeekView from "#lib/components/calendar/WeekView.svelte"
	import YearView from "#lib/components/calendar/YearView.svelte"
	import { animateZoom } from "#lib/components/calendar/zoomTransition.ts"
	import { longPress } from "#lib/longPress.ts"
	import { scheduledAppointments } from "#lib/sampleData.ts"
	import { getTopbarContent } from "#lib/topbarContent.ts"

	let level = $state<CalendarLevel>("year")
	let date = $state(new Date())
	let selectedDay = $state<Date>()
	let dayMenu = $state<{ day: Date; position: { x: number; y: number } }>()
	let viewContainer: HTMLDivElement

	const periodAppointments = $derived(filterByPeriod(scheduledAppointments, level, date))

	const topbarContent = getTopbarContent()

	$effect(() => {
		topbarContent.end = topbarTitle
		return () => {
			topbarContent.end = undefined
		}
	})

	function changeLevel(newLevel: CalendarLevel, newDate: Date, zoomTarget?: Element, newSelectedDay?: Date) {
		const direction = isZoomingIn(level, newLevel) ? "in" : "out"

		animateZoom(
			viewContainer,
			async () => {
				level = newLevel
				date = newDate
				selectedDay = newSelectedDay
				await tick()
			},
			direction,
			zoomTarget
		)
	}

	function selectLevel(newLevel: CalendarLevel) {
		changeLevel(newLevel, selectedDay ?? date, undefined, selectedDay)
	}

	function moveToPeriod(periods: number) {
		date = moveByPeriods(level, date, periods)
		selectedDay = undefined
	}

	function goToParentLevel() {
		const parent = parentLevel[level]
		if (parent) {
			changeLevel(parent, date)
		}
	}

	function selectOrOpenDay(day: Date, dayElement?: Element) {
		const isDayMenuOpen = dayMenu !== undefined
		if (isDayMenuOpen) {
			return
		}
		if (isSameDay(selectedDay, day)) {
			changeLevel("day", day, dayElement)
		} else {
			selectedDay = day
		}
	}

	function openDayMenu(event: MouseEvent) {
		const isoDate = (event.target as Element).closest<HTMLElement>("[data-date]")?.dataset.date
		if (!isoDate || level === "year") {
			return
		}
		event.preventDefault()
		const day = parseIsoDate(isoDate)
		selectedDay = day
		dayMenu = { day, position: { x: event.clientX, y: event.clientY } }
	}

	function handleDayAction(action: DayAction, day: Date) {
		dayMenu = undefined

		switch (action) {
			case "open-day":
				changeLevel("day", day)
				return
			// Kobles til skjemaer når booking, notater og blokkering er på plass.
			case "add-booking":
			case "add-note":
			case "block-day":
				return
		}
	}

	function findMonthInYearView(month: Date): Element | undefined {
		if (date.getFullYear() !== month.getFullYear()) {
			return undefined
		}
		return viewContainer.querySelectorAll(".year-month")[month.getMonth()]
	}

	// År: åpne måneden med dagen i dag markert. Måned og uke: marker i dag, eller åpne dagen hvis den allerede er markert.
	function goToToday() {
		const today = new Date()

		switch (level) {
			case "year":
				changeLevel("month", today, findMonthInYearView(today), today)
				return
			case "month":
			case "week":
				if (isSameDay(selectedDay, today)) {
					changeLevel("day", today, viewContainer.querySelector(".selected-day") ?? undefined)
				} else {
					date = today
					selectedDay = today
				}
				return
			case "day":
				date = today
				return
		}
	}
</script>

{#snippet topbarTitle()}
	<CalendarTitle {level} {date} />
{/snippet}

<div class="calendar-page">
	<CalendarToolbar {level} {date} onBack={goToParentLevel} onLevelChange={selectLevel} onPrevious={() => moveToPeriod(-1)} onToday={goToToday} onNext={() => moveToPeriod(1)} />

	<div class="calendar-body">
		<!-- svelte-ignore a11y_no_static_element_interactions (høyreklikk-menyen er et tillegg; alle valg finnes også andre steder) -->
		<div class="calendar-view" bind:this={viewContainer} oncontextmenu={openDayMenu} {@attach longPress(openDayMenu)}>
			{#if level === "year"}
				<YearView {date} onOpenMonth={(month, monthElement) => changeLevel("month", month, monthElement)} />
			{:else if level === "month"}
				<MonthView {date} {selectedDay} onDayClick={selectOrOpenDay} />
			{:else if level === "week"}
				<WeekView {date} {selectedDay} onDayClick={selectOrOpenDay} />
			{:else}
				<DayView {date} />
			{/if}
		</div>

		<div class="calendar-distribution">
			<CalendarDistribution appointments={periodAppointments} />
		</div>

		<div class="calendar-notes">
			<CalendarNotes {level} {date} />
		</div>
	</div>

	{#if dayMenu}
		<DayContextMenu day={dayMenu.day} position={dayMenu.position} canOpenDay={level !== "day"} onSelect={handleDayAction} onClose={() => (dayMenu = undefined)} />
	{/if}
</div>

<style>
	.calendar-page {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		height: calc(100dvh - var(--pg-layout-reserved-height));
	}

	.calendar-body {
		display: grid;
		flex: 1;
		grid-template-columns: minmax(0, 1fr) 17rem;
		grid-template-rows: auto minmax(0, 1fr);
		grid-template-areas:
			"view distribution"
			"view notes";
		gap: 1rem;
		min-height: 0;
	}

	/* Hindrer at mobilen markerer tekst eller viser egen meny når man holder inne på en dag. */
	.calendar-view {
		grid-area: view;
		-webkit-touch-callout: none;
		user-select: none;
	}

	.calendar-distribution {
		grid-area: distribution;
	}

	.calendar-notes {
		grid-area: notes;
	}

	@media (max-width: 57.5rem) {
		.calendar-body {
			grid-template-columns: minmax(0, 1fr);
			grid-template-rows: auto minmax(0, 1fr) auto;
			grid-template-areas:
				"distribution"
				"view"
				"notes";
			gap: 0.75rem;
		}
	}
</style>
