<script lang="ts">
	import { formatShortDate, parseIsoDate } from "#lib/components/calendar/calendarDates.ts"
	import Icon from "#lib/components/Icon.svelte"
	import { getWeekday, type WorkDay, type WorkHours, weekdayNames } from "#lib/workHours.ts"
	import { summarizeWorkDay } from "./summarizeWorkDay.ts"
	import WorkDayEditor from "./WorkDayEditor.svelte"
	import WorkHoursTrack from "./WorkHoursTrack.svelte"
	import { getTickPosition, trackTickHours } from "./workHoursTrack.ts"

	interface Props {
		title: string
		days: WorkDay[]
		todayIsoDate: string
		selectedIsoDate: string | undefined
		onSelect: (isoDate: string) => void
		onPrevious: () => void
		onNext: () => void
		onLog: (isoDate: string, hours: WorkHours) => void
		onDidNotWork: (isoDate: string) => void
	}

	let { title, days, todayIsoDate, selectedIsoDate, onSelect, onPrevious, onNext, onLog, onDidNotWork }: Props = $props()
</script>

<section class="week" aria-labelledby="work-week-title">
	<div class="week-header">
		<h2 id="work-week-title">{title}</h2>
		<div class="week-controls">
			<ul class="legend">
				<li><span class="legend-planned"></span>Planlagt</li>
				<li><span class="legend-worked"></span>Jobbet</li>
			</ul>
			<button type="button" class="week-button" aria-label="Forrige uke" onclick={onPrevious}><Icon name="chevron_left" /></button>
			<button type="button" class="week-button" aria-label="Neste uke" onclick={onNext}><Icon name="chevron_right" /></button>
		</div>
	</div>

	<div class="axis" aria-hidden="true">
		<div class="ticks">
			{#each trackTickHours as hour (hour)}
				<span style:left={getTickPosition(hour)}>{String(hour).padStart(2, "0")}</span>
			{/each}
		</div>
	</div>

	<div class="days">
		{#each days as day (day.isoDate)}
			{@const summary = summarizeWorkDay(day)}
			{@const isSelected = day.isoDate === selectedIsoDate}
			<button type="button" class="day" class:is-selected={isSelected} aria-pressed={isSelected} onclick={() => onSelect(day.isoDate)}>
				<span class="day-label" class:is-today={day.isoDate === todayIsoDate}>
					<span class="weekday weekday-long">{weekdayNames[getWeekday(day.isoDate)].long}</span>
					<span class="weekday weekday-short">{weekdayNames[getWeekday(day.isoDate)].short}</span>
					<span class="date">{formatShortDate(parseIsoDate(day.isoDate))}</span>
				</span>
				<WorkHoursTrack {day} />
				<span class="day-summary">
					<span class="duration">{summary.duration}</span>
					<span class="hours">{summary.hours}</span>
					{#if summary.difference}
						<span class="difference" class:is-deviation={summary.difference.isDeviation}>{summary.difference.label}</span>
					{/if}
				</span>
				<span class="edit-icon"><Icon name="edit" size="1.125rem" /></span>
			</button>
			{#if isSelected}
				<WorkDayEditor {day} onLog={(hours) => onLog(day.isoDate, hours)} onDidNotWork={() => onDidNotWork(day.isoDate)} />
			{/if}
		{/each}
	</div>
</section>

<style>
	.week {
		display: flex;
		flex-direction: column;
		gap: 0.625rem;
		min-width: 0;
		padding: 1.125rem 1.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.week-header,
	.week-controls,
	.legend {
		display: flex;
		align-items: center;
	}

	.week-header {
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.75rem;
	}

	h2 {
		font-size: 1.25rem;
		font-weight: 700;
	}

	.week-controls {
		gap: 0.5rem;
	}

	.legend {
		gap: 1.125rem;
		margin: 0 0.5rem 0 0;
		padding: 0;
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
		list-style: none;
	}

	.legend li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.legend-planned,
	.legend-worked {
		width: 1.625rem;
		box-sizing: border-box;
	}

	.legend-planned {
		height: 0.875rem;
		border: 0.09375rem dashed var(--pg-planned-border);
		border-radius: 0.3125rem;
		background-image: repeating-linear-gradient(135deg, var(--pg-planned-stripe) 0, var(--pg-planned-stripe) 0.1875rem, var(--pg-card) 0.1875rem, var(--pg-card) 0.375rem);
	}

	.legend-worked {
		height: 0.625rem;
		border-radius: 0.25rem;
		background: var(--pg-pink);
		box-shadow:
			0 0 0 0.09375rem var(--pg-card),
			0 0 0 0.15625rem var(--pg-pink-hover);
	}

	.week-button {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		cursor: pointer;
	}

	@media (hover: hover) {
		.week-button:hover {
			border-color: var(--pg-ink);
			background: var(--pg-ink);
			color: #ffffff;
		}
	}

	.axis,
	.day {
		display: grid;
		grid-template-columns: 5.25rem minmax(0, 1fr) 7.75rem 1.25rem;
		align-items: center;
		gap: 0.875rem;
	}

	.axis {
		padding: 0 0.75rem;
		color: var(--pg-ink-subtle);
		font-size: 0.6875rem;
		font-weight: 600;
	}

	.ticks {
		position: relative;
		grid-column: 2;
		height: 1rem;
	}

	.ticks span {
		position: absolute;
		transform: translateX(-50%);
	}

	.days {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.day {
		width: 100%;
		min-height: 3.25rem;
		box-sizing: border-box;
		padding: 0.375rem 0.75rem;
		border: 0.0625rem solid transparent;
		border-radius: 0.625rem;
		background: transparent;
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		text-align: left;
		cursor: pointer;
	}

	@media (hover: hover) {
		.day:hover {
			background: var(--pg-pink-wash);
		}
	}

	.day.is-selected {
		border-color: var(--pg-pink);
		background: var(--pg-pink-wash);
	}

	.day-label,
	.day-summary {
		display: flex;
		flex-direction: column;
		line-height: 1.25;
	}

	.weekday {
		font-size: 0.875rem;
		font-weight: 700;
	}

	.weekday-short {
		display: none;
	}

	.date,
	.hours {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
	}

	.is-today .weekday {
		color: var(--pg-pink-deep);
	}

	.day-summary {
		align-items: flex-end;
		text-align: right;
	}

	.duration {
		font-size: 0.875rem;
		font-weight: 700;
	}

	.difference {
		margin-top: 0.125rem;
		white-space: nowrap;
		padding: 0.0625rem 0.4375rem;
		border-radius: 62.5rem;
		background: var(--pg-row-line);
		color: var(--pg-ink-muted);
		font-size: 0.6875rem;
		font-weight: 700;
	}

	.difference.is-deviation {
		background: var(--pg-pink-tint);
		color: var(--pg-pink-deep);
	}

	.edit-icon {
		color: var(--pg-ink-subtle);
	}

	@media (max-width: 57.5rem) {
		.week {
			padding: 0.875rem 0.5rem;
		}

		.week-header {
			flex-wrap: nowrap;
			padding: 0 0.5rem;
		}

		h2 {
			font-size: 1.0625rem;
		}

		.legend {
			display: none;
		}

		.axis,
		.day {
			grid-template-columns: 3.25rem minmax(0, 1fr) 5.25rem;
			gap: 0.625rem;
		}

		.axis {
			padding: 0 0.625rem;
		}

		.weekday-long,
		.edit-icon,
		.hours {
			display: none;
		}

		.weekday-short {
			display: inline;
		}
	}
</style>
