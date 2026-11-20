<script lang="ts">
	import { appointmentTypeDetails } from "#lib/appointmentTypes.ts"
	import { scheduledAppointments } from "#lib/sampleData.ts"
	import { findDominantType } from "./calendarAppointments.ts"
	import { getMonthGridDays, isSameDay } from "./calendarDates.ts"

	interface Props {
		date: Date
		onOpenMonth: (month: Date, monthElement: HTMLElement) => void
	}

	let { date, onOpenMonth }: Props = $props()

	const today = new Date()

	const months = $derived(
		Array.from({ length: 12 }, (_, monthIndex) => ({
			firstDay: new Date(date.getFullYear(), monthIndex, 1),
			days: getMonthGridDays(date.getFullYear(), monthIndex).map((day) => ({ day, type: day && findDominantType(scheduledAppointments, day) }))
		}))
	)

	function formatMonthName(firstDay: Date): string {
		return firstDay.toLocaleDateString("nb-NO", { month: "long" })
	}
</script>

<div class="year-view">
	{#each months as month (month.firstDay.getTime())}
		<button type="button" class="year-month" aria-label="Åpne {formatMonthName(month.firstDay)} {month.firstDay.getFullYear()}" onclick={(event) => onOpenMonth(month.firstDay, event.currentTarget)}>
			<span class="month-name">{formatMonthName(month.firstDay)}</span>
			<span class="weekdays" aria-hidden="true">
				{#each ["M", "T", "O", "T", "F", "L", "S"] as weekday, index (index)}
					<span>{weekday}</span>
				{/each}
			</span>
			<span class="days">
				{#each month.days as { day, type }, index (index)}
					{#if day}
						<span
							class="day"
							class:is-today={isSameDay(today, day)}
							style:--day-background={type && appointmentTypeDetails[type].background}
							style:--day-text={type && appointmentTypeDetails[type].text}
							style:--day-dot={type && appointmentTypeDetails[type].dot}
							class:has-appointments={type}>{day.getDate()}</span
						>
					{:else}
						<span></span>
					{/if}
				{/each}
			</span>
		</button>
	{/each}
</div>

<style>
	.year-view {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		grid-template-rows: repeat(3, minmax(0, 1fr));
		gap: 1rem 1.75rem;
		height: 100%;
	}

	.year-month,
	.weekdays,
	.days {
		display: flex;
		flex-direction: column;
	}

	.year-month {
		gap: 0.25rem;
		min-height: 0;
		margin: -0.5rem;
		padding: 0.5rem;
		border: 0;
		border-radius: 0.625rem;
		background: transparent;
		color: inherit;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	@media (hover: hover) {
		.year-month:hover {
			background: var(--pg-pink-wash);
		}
	}

	.year-month:focus-visible {
		outline: 0.125rem solid var(--pg-ink);
		outline-offset: 0.25rem;
	}

	.month-name {
		font-size: 0.875rem;
		font-weight: 700;
		text-transform: capitalize;
	}

	.weekdays,
	.days {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
	}

	.weekdays {
		color: var(--pg-ink-subtle);
		font-size: 0.625rem;
		font-weight: 600;
		text-align: center;
	}

	.days {
		flex: 1;
		grid-template-rows: repeat(6, minmax(0, 1fr));
		width: 100%;
		min-height: 0;
	}

	.day {
		display: grid;
		place-items: center;
		align-self: center;
		justify-self: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 50%;
		background: var(--day-background, transparent);
		color: var(--day-text, var(--pg-ink-muted));
		font-size: 0.6875rem;
	}

	.has-appointments {
		font-weight: 700;
	}

	.is-today {
		box-shadow: 0 0 0 0.125rem var(--pg-pink);
	}

	/* På mobil er hver dag en liten prikk, fargelagt etter hva som skjer den dagen. */
	@media (max-width: 57.5rem) {
		.year-view {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			grid-template-rows: repeat(4, minmax(0, 1fr));
			gap: 0.625rem 0.875rem;
		}

		.month-name {
			font-size: 0.75rem;
		}

		.weekdays {
			display: none;
		}

		.day {
			width: 0.5625rem;
			height: 0.5625rem;
			background: var(--day-dot, var(--pg-row-line));
			font-size: 0;
		}
	}
</style>
