<script lang="ts">
	import { appointmentTypeDetails } from "#lib/appointmentTypes.ts"
	import { scheduledAppointments } from "#lib/sampleData.ts"
	import { findAppointmentsOnDay } from "./calendarAppointments.ts"
	import { formatTime, getPeriodRange, isSameDay } from "./calendarDates.ts"

	interface Props {
		date: Date
		onOpenDay: (day: Date) => void
	}

	let { date, onOpenDay }: Props = $props()

	const today = new Date()

	const days = $derived.by(() => {
		const { start } = getPeriodRange("week", date)
		return Array.from({ length: 7 }, (_, weekday) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + weekday))
	})

	function formatWeekday(day: Date): string {
		const weekday = day.toLocaleDateString("nb-NO", { weekday: "short" }).replace(".", "")
		return weekday.charAt(0).toUpperCase() + weekday.slice(1)
	}

	function formatLongDay(day: Date): string {
		return day.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })
	}
</script>

<div class="week">
	{#each days as day (day.getTime())}
		{@const appointments = findAppointmentsOnDay(scheduledAppointments, day)}
		<button type="button" class="day" aria-label={formatLongDay(day)} onclick={() => onOpenDay(day)}>
			<span class="day-label">
				<span class="weekday">{formatWeekday(day)}</span>
				<span class="day-number" class:is-today={isSameDay(today, day)}>{day.getDate()}</span>
			</span>
			<span class="appointments">
				{#each appointments as appointment (appointment.start)}
					<span class="appointment" style:background={appointmentTypeDetails[appointment.type].background} style:color={appointmentTypeDetails[appointment.type].text}>
						{formatTime(appointment.start)}
						{appointment.clientName?.split(" ")[0] ?? appointmentTypeDetails[appointment.type].label}
					</span>
				{:else}
					<span class="no-appointments">Ingen avtaler</span>
				{/each}
			</span>
		</button>
	{/each}
</div>

<style>
	.week {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.day {
		display: flex;
		flex: 1;
		align-items: center;
		gap: 0.75rem;
		min-height: 0;
		padding: 0 0.25rem;
		border: 0;
		border-top: 0.0625rem solid var(--pg-row-line);
		background: transparent;
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		text-align: left;
		cursor: pointer;
	}

	.day:first-child {
		border-top: 0;
	}

	.day-label {
		display: flex;
		flex: 0 0 2.75rem;
		flex-direction: column;
		align-items: center;
		color: var(--pg-ink-muted);
		font-size: 0.6875rem;
		font-weight: 600;
	}

	.day-number {
		display: grid;
		place-items: center;
		width: 1.875rem;
		height: 1.875rem;
		border-radius: 50%;
		color: var(--pg-ink);
		font-family: var(--pg-font-heading);
		font-size: 1.125rem;
		font-weight: 700;
	}

	.day-number.is-today {
		background: var(--pg-pink);
	}

	.appointments {
		display: flex;
		flex: 1;
		flex-wrap: wrap;
		gap: 0.375rem;
		min-width: 0;
	}

	.appointment {
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.no-appointments {
		color: var(--pg-ink-subtle);
		font-size: 0.8125rem;
	}
</style>
