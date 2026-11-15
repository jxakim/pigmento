<script lang="ts">
	import { tick } from "svelte"
	import CalendarTitle from "#lib/components/calendar/CalendarTitle.svelte"
	import CalendarToolbar from "#lib/components/calendar/CalendarToolbar.svelte"
	import { isSameDay } from "#lib/components/calendar/calendarDates.ts"
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

	function openDay(day: Date, dayElement: HTMLElement) {
		changeLevel("day", day, dayElement)
	}

	function findTodaysMonthInYearView(today: Date): Element | undefined {
		if (date.getFullYear() !== today.getFullYear()) {
			return undefined
		}
		return viewContainer.querySelectorAll(".year-month")[today.getMonth()]
	}

	function findSelectedTodayInView(today: Date): Element | null {
		return isSameDay(selectedDay, today) ? viewContainer.querySelector(".selected-day") : null
	}

	// År → måneden i dag er i, med dagen markert. Måned/uke → marker i dag, eller åpne dagen hvis den allerede er markert.
	function goToToday() {
		const today = new Date()

		switch (level) {
			case "year":
				changeLevel("month", today, findTodaysMonthInYearView(today), today)
				return
			case "month":
			case "week": {
				const selectedToday = findSelectedTodayInView(today)
				if (selectedToday) {
					changeLevel("day", today, selectedToday)
				} else {
					date = today
					selectedDay = today
				}
				return
			}
			case "day":
				date = today
				return
		}
	}

	function selectLevel(newLevel: CalendarLevel) {
		if (newLevel !== level) {
			changeLevel(newLevel, date)
		}
	}

	function goToParentLevel() {
		const parent = parentLevel[level]
		if (parent) {
			changeLevel(parent, date)
		}
	}
</script>

{#snippet topbarTitle()}
	<CalendarTitle {level} {date} />
{/snippet}

<div class="calendar-page">
	<CalendarToolbar {level} {date} onBack={goToParentLevel} onLevelChange={selectLevel} />

	<div class="calendar-view" bind:this={viewContainer}>
		{#if level === "year"}
			<YearView {date} onOpenMonth={(month, monthElement) => changeLevel("month", month, monthElement)} />
		{:else if level === "month"}
			<MonthView {date} {selectedDay} onSelectDay={(day) => (selectedDay = day)} onOpenDay={openDay} />
		{:else if level === "week"}
			<WeekView {date} {selectedDay} onSelectDay={(day) => (selectedDay = day)} onOpenDay={openDay} />
		{:else}
			<DayView {date} />
		{/if}
	</div>

	<div class="calendar-actions" role="toolbar" aria-label="Handlinger">
		<button type="button" class="ds-button" data-size="sm" data-variant="secondary" data-color="neutral" onclick={goToToday}>I dag</button>
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
		view-transition-name: calendar;
	}

	.calendar-actions {
		display: flex;
		gap: 0.5rem;
	}

	:global(::view-transition-group(calendar)) {
		animation: none;
	}

	:global(::view-transition-image-pair(calendar)) {
		overflow: hidden;
	}

	:global(html[data-zoom]::view-transition-old(calendar)),
	:global(html[data-zoom]::view-transition-new(calendar)) {
		transform-origin: var(--zoom-origin);
		animation-duration: 450ms;
		animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
		animation-fill-mode: both;
		mix-blend-mode: normal;
	}

	:global(html[data-zoom]::view-transition-old(calendar)) {
		animation-name: zoom-old-view;
	}

	:global(html[data-zoom]::view-transition-new(calendar)) {
		animation-name: zoom-new-view;
	}

	@keyframes -global-zoom-old-view {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		100% {
			transform: scale(var(--zoom-old-view-scale));
			opacity: 0;
		}
	}

	@keyframes -global-zoom-new-view {
		0% {
			transform: scale(var(--zoom-new-view-scale));
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
