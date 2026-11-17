<script lang="ts">
	import { tick, untrack } from "svelte"
	import { calendarHomeRequests } from "#lib/calendarHome.svelte.ts"
	import { compactScreen } from "#lib/compactScreen.svelte.ts"
	import CalendarDistribution from "#lib/components/calendar/CalendarDistribution.svelte"
	import CalendarNotes from "#lib/components/calendar/CalendarNotes.svelte"
	import CalendarToolbar from "#lib/components/calendar/CalendarToolbar.svelte"
	import { filterByPeriod } from "#lib/components/calendar/calendarAppointments.ts"
	import { isSameDay, moveByPeriods, parseIsoDate } from "#lib/components/calendar/calendarDates.ts"
	import { type CalendarLevel, isZoomingIn } from "#lib/components/calendar/calendarLevels.ts"
	import DayContextMenu, { type DayAction } from "#lib/components/calendar/DayContextMenu.svelte"
	import DayView from "#lib/components/calendar/DayView.svelte"
	import MobileMonthView from "#lib/components/calendar/MobileMonthView.svelte"
	import MobileWeekView from "#lib/components/calendar/MobileWeekView.svelte"
	import MonthView from "#lib/components/calendar/MonthView.svelte"
	import WeekView from "#lib/components/calendar/WeekView.svelte"
	import YearView from "#lib/components/calendar/YearView.svelte"
	import { animateZoom } from "#lib/components/calendar/zoomTransition.ts"
	import UrgentNotificationsBanner from "#lib/components/notifications/UrgentNotificationsBanner.svelte"
	import { scheduledAppointments } from "#lib/sampleData.ts"

	let level = $state<CalendarLevel>("year")
	let date = $state(new Date())
	let selectedDay = $state<Date>()
	let dayMenu = $state<{ day: Date; position: { x: number; y: number } }>()
	let viewContainer: HTMLDivElement

	interface CalendarView {
		level: CalendarLevel
		date: Date
		selectedDay?: Date
	}

	let previousViews = $state<CalendarView[]>([])

	const periodAppointments = $derived(filterByPeriod(scheduledAppointments, level, date))

	function showView(view: CalendarView, zoomTarget?: Element) {
		const direction = isZoomingIn(level, view.level) ? "in" : "out"

		animateZoom(
			viewContainer,
			async () => {
				level = view.level
				date = view.date
				selectedDay = view.selectedDay
				await tick()
			},
			direction,
			zoomTarget
		)
	}

	function openLevel(newLevel: CalendarLevel, newDate: Date, zoomTarget?: Element, newSelectedDay?: Date) {
		previousViews.push({ level, date, selectedDay })
		showView({ level: newLevel, date: newDate, selectedDay: newSelectedDay }, zoomTarget)
	}

	function selectLevel(newLevel: CalendarLevel) {
		previousViews = []
		showView({ level: newLevel, date: selectedDay ?? date, selectedDay })
	}

	function showYearOfToday() {
		dayMenu = undefined
		previousViews = []
		showView({ level: "year", date: new Date() })
	}

	let handledHomeRequests = calendarHomeRequests.count

	$effect(() => {
		const requests = calendarHomeRequests.count
		if (requests !== handledHomeRequests) {
			handledHomeRequests = requests
			untrack(showYearOfToday)
		}
	})

	function goBack() {
		const previousView = previousViews.pop()
		if (previousView) {
			showView(previousView)
		}
	}

	function moveToPeriod(periods: number) {
		date = moveByPeriods(level, date, periods)
		selectedDay = undefined
	}

	function selectOrOpenDay(day: Date, dayElement?: Element) {
		const isDayMenuOpen = dayMenu !== undefined
		if (isDayMenuOpen) {
			return
		}
		if (isSameDay(selectedDay, day)) {
			openLevel("day", day, dayElement)
		} else {
			selectedDay = day
		}
	}

	function openDayMenu(event: MouseEvent) {
		const isoDate = (event.target as Element).closest<HTMLElement>("[data-date]")?.dataset.date
		if (!isoDate || level === "year" || compactScreen.current) {
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
				openLevel("day", day)
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
				openLevel("month", today, findMonthInYearView(today), today)
				return
			case "month":
			case "week":
				if (isSameDay(selectedDay, today)) {
					openLevel("day", today, viewContainer.querySelector(".selected-day") ?? undefined)
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

<div class="calendar-page">
	<CalendarToolbar {level} {date} appointmentCount={periodAppointments.length} onLevelChange={selectLevel} onPrevious={() => moveToPeriod(-1)} onToday={goToToday} onNext={() => moveToPeriod(1)} onBack={compactScreen.current && previousViews.length > 0 ? goBack : undefined} />

	<div class="banner">
		<UrgentNotificationsBanner isCompact />
	</div>

	<div class="calendar-body">
		<!-- svelte-ignore a11y_no_static_element_interactions (høyreklikk-menyen er et tillegg; alle valg finnes også andre steder) -->
		<div class="calendar-view" bind:this={viewContainer} oncontextmenu={openDayMenu}>
			{#if level === "year"}
				<YearView {date} onOpenMonth={(month, monthElement) => openLevel("month", month, monthElement)} />
			{:else if level === "month" && compactScreen.current}
				<MobileMonthView {date} {selectedDay} onSelectDay={(day) => (selectedDay = day)} onOpenDay={(day) => openLevel("day", day)} />
			{:else if level === "month"}
				<MonthView {date} {selectedDay} onDayClick={selectOrOpenDay} />
			{:else if level === "week" && compactScreen.current}
				<MobileWeekView {date} onOpenDay={(day) => openLevel("day", day)} />
			{:else if level === "week"}
				<WeekView {date} {selectedDay} onDayClick={selectOrOpenDay} />
			{:else}
				<DayView {date} />
			{/if}
		</div>

		<div class="calendar-notes">
			<CalendarNotes {level} {date} />
		</div>

		<div class="calendar-distribution">
			<CalendarDistribution appointments={periodAppointments} />
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
		gap: 1.25rem;
		height: 100dvh;
		padding: 1.75rem 2.25rem;
	}

	.banner:empty {
		display: none;
	}

	.calendar-body {
		display: grid;
		flex: 1;
		grid-template-columns: minmax(0, 1fr) 18.75rem;
		grid-template-rows: minmax(0, 1fr) auto;
		grid-template-areas:
			"view notes"
			"view distribution";
		gap: 1rem 1.5rem;
		min-height: 0;
	}

	.calendar-view {
		grid-area: view;
		padding: 1.125rem 1.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
		/* Hindrer at mobilen markerer tekst eller viser egen meny når man holder inne på en dag. */
		-webkit-touch-callout: none;
		user-select: none;
	}

	.calendar-notes {
		grid-area: notes;
		min-height: 0;
	}

	.calendar-distribution {
		grid-area: distribution;
	}

	/* På mobil står tegnforklaringen over kalenderen, og notatet er en linje under. De ligger i samme rutenett som resten av siden. */
	@media (max-width: 57.5rem) {
		.calendar-page {
			display: grid;
			grid-template-rows: auto auto auto minmax(0, 1fr) auto;
			grid-template-areas:
				"toolbar"
				"distribution"
				"banner"
				"view"
				"notes";
			gap: 0.625rem;
			height: calc(100dvh - var(--pg-bottom-bar-space));
			padding: 0.875rem 1rem 0.75rem;
		}

		.calendar-body {
			display: contents;
		}

		.calendar-view {
			grid-area: view;
			min-height: 0;
			padding: 0.75rem;
		}

		.banner {
			grid-area: banner;
		}

		.calendar-notes {
			grid-area: notes;
		}

		.calendar-distribution {
			grid-area: distribution;
		}
	}
</style>
