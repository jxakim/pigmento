<script lang="ts">
	import { tick } from "svelte"
	import CalendarTitle from "#lib/components/calendar/CalendarTitle.svelte"
	import CalendarToolbar from "#lib/components/calendar/CalendarToolbar.svelte"
	import { isSameDay, moveByPeriods } from "#lib/components/calendar/calendarDates.ts"
	import { type CalendarLevel, isZoomingIn, parentLevel } from "#lib/components/calendar/calendarLevels.ts"
	import DayView from "#lib/components/calendar/DayView.svelte"
	import MonthView from "#lib/components/calendar/MonthView.svelte"
	import WeekView from "#lib/components/calendar/WeekView.svelte"
	import YearView from "#lib/components/calendar/YearView.svelte"
	import { animateZoom } from "#lib/components/calendar/zoomTransition.ts"
	import { getTopbarContent } from "#lib/topbarContent.ts"

	let level = $state<CalendarLevel>("year")
	let date = $state(new Date())
	let selectedDay = $state<Date>()
	let viewContainer: HTMLDivElement

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
		if (isSameDay(selectedDay, day)) {
			changeLevel("day", day, dayElement)
		} else {
			selectedDay = day
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

	<div class="calendar-view" bind:this={viewContainer}>
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
</div>

<style>
	.calendar-page {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		height: calc(100dvh - var(--pg-layout-reserved-height));
	}

	.calendar-view {
		flex: 1;
		min-height: 0;
	}
</style>
