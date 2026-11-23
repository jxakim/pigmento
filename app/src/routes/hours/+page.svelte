<script lang="ts">
	import BackButton from "#lib/components/BackButton.svelte"
	import { formatCalendarTitle, formatIsoDate, formatPeriodName, getDaysInRange, getPeriodRange, isIsoDate, moveByPeriods, parseIsoDate } from "#lib/components/calendar/calendarDates.ts"
	import Icon from "#lib/components/Icon.svelte"
	import MonthSummary from "#lib/components/work-hours/MonthSummary.svelte"
	import StandardWeek from "#lib/components/work-hours/StandardWeek.svelte"
	import WorkWeek from "#lib/components/work-hours/WorkWeek.svelte"
	import { getWorkDay, logDidNotWork, logWorkedHours } from "#lib/workHours.svelte.ts"
	import { formatDuration, getTotals } from "#lib/workHours.ts"
	import { page } from "$app/state"

	const today = new Date()
	const todayIsoDate = formatIsoDate(today)
	const requestedIsoDate = page.url.searchParams.get("dato")
	const initialDate = isIsoDate(requestedIsoDate) ? parseIsoDate(requestedIsoDate) : today

	let weekDate = $state(initialDate)
	let selectedIsoDate = $state<string | undefined>(formatIsoDate(initialDate))

	const weekDays = $derived(getDaysInRange(getPeriodRange("week", weekDate)).map((day) => getWorkDay(formatIsoDate(day))))
	const monthDaysSoFar = $derived(
		getDaysInRange(getPeriodRange("month", weekDate))
			.map(formatIsoDate)
			.filter((isoDate) => isoDate <= todayIsoDate)
			.map(getWorkDay)
	)

	const weekTotals = $derived(getTotals(weekDays))
	const weekTitle = $derived.by(() => {
		const { heading, range } = formatCalendarTitle("week", weekDate)
		return `${heading} · ${range}`
	})
	const summary = $derived(`${formatDuration(weekTotals.workedMinutes)} jobbet · ${formatDuration(weekTotals.plannedMinutes)} planlagt denne uken`)

	function selectDay(isoDate: string) {
		selectedIsoDate = selectedIsoDate === isoDate ? undefined : isoDate
	}

	function moveWeek(weeks: number) {
		weekDate = moveByPeriods("week", weekDate, weeks)
		selectedIsoDate = undefined
	}

	function selectToday() {
		weekDate = today
		selectedIsoDate = todayIsoDate
	}
</script>

<div class="hours-page">
	<header class="header">
		<div class="title">
			<BackButton fallbackHref="/calendar" />
			<h1>Arbeidstimer</h1>
			<p class="summary">{summary}</p>
		</div>
		<button type="button" class="today-button" onclick={selectToday}>
			<Icon name="add" />
			Før inn timer i dag
		</button>
	</header>

	<div class="columns">
		<div class="week-column">
			<WorkWeek
				title={weekTitle}
				days={weekDays}
				{todayIsoDate}
				{selectedIsoDate}
				onSelect={selectDay}
				onPrevious={() => moveWeek(-1)}
				onNext={() => moveWeek(1)}
				onLog={logWorkedHours}
				onDidNotWork={logDidNotWork}
			/>
		</div>
		<aside class="side-column">
			<StandardWeek />
			<MonthSummary monthName={formatPeriodName("month", weekDate)} days={monthDaysSoFar} />
		</aside>
	</div>
</div>

<style>
	.hours-page,
	.title,
	.side-column {
		display: flex;
		flex-direction: column;
	}

	.hours-page {
		gap: 1.25rem;
		padding: 1.75rem 2.25rem;
	}

	.header,
	.columns {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.header {
		align-items: center;
		justify-content: space-between;
	}

	.title {
		flex-direction: row;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.25rem 0.875rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	.summary {
		color: var(--pg-ink-muted);
		font-size: 0.9375rem;
	}

	.today-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.75rem;
		padding: 0 1.125rem;
		border: 0;
		border-radius: var(--pg-button-radius);
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
	}

	@media (hover: hover) {
		.today-button:hover {
			background: var(--pg-pink-hover);
		}
	}

	.columns {
		align-items: flex-start;
		gap: 1.5rem;
	}

	.week-column {
		flex: 1 1 32rem;
		min-width: 0;
	}

	.side-column {
		flex: 0 0 21.25rem;
		gap: 1rem;
	}

	@media (max-width: 57.5rem) {
		.hours-page {
			gap: 0.875rem;
			padding: 0.875rem 1rem;
		}

		.title {
			align-items: center;
		}

		h1 {
			font-size: 1.375rem;
			line-height: 1.15;
		}

		.summary {
			font-size: 0.8125rem;
		}

		.header {
			flex-direction: column;
			align-items: stretch;
		}

		.today-button {
			justify-content: center;
		}

		.side-column {
			flex: 1 1 100%;
		}
	}
</style>
