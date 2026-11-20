<script lang="ts">
	import { appointmentTitle, appointmentTypeDetails } from "#lib/appointmentTypes.ts"
	import AppointmentTypeTag from "#lib/components/AppointmentTypeTag.svelte"
	import { getDaysWithOpenNotifications } from "#lib/notifications.svelte.ts"
	import { scheduledAppointments } from "#lib/sampleData.ts"
	import { findAppointmentsOnDay } from "./calendarAppointments.ts"
	import { formatCalendarTitle, formatIsoDate, formatTime, isSameDay } from "./calendarDates.ts"

	interface Props {
		date: Date
		selectedDay?: Date
		onSelectDay: (day: Date) => void
		onOpenDay: (day: Date) => void
	}

	let { date, selectedDay, onSelectDay, onOpenDay }: Props = $props()

	const today = new Date()
	const weekdays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"]
	const maxDotsPerDay = 3

	const firstOfMonth = $derived(new Date(date.getFullYear(), date.getMonth(), 1))
	const firstGridDay = $derived(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 - ((firstOfMonth.getDay() + 6) % 7)))
	const weeks = $derived(
		Array.from({ length: 6 }, (_, week) => Array.from({ length: 7 }, (_, weekday) => new Date(firstGridDay.getFullYear(), firstGridDay.getMonth(), firstGridDay.getDate() + week * 7 + weekday)))
	)

	const shownDay = $derived(selectedDay ?? date)
	const daysWithNotifications = $derived(getDaysWithOpenNotifications())
	const shownDayAppointments = $derived(findAppointmentsOnDay(scheduledAppointments, shownDay))
	const shownDayLabel = $derived(formatCalendarTitle("day", shownDay).heading)

	function isInMonth(day: Date): boolean {
		return day.getMonth() === date.getMonth()
	}

	function getDots(day: Date): string[] {
		const hasNotification = daysWithNotifications.has(formatIsoDate(day))
		const typeDots = findAppointmentsOnDay(scheduledAppointments, day).map((appointment) => appointmentTypeDetails[appointment.type].dot)
		return [...(hasNotification ? ["var(--pg-pink-deep)"] : []), ...typeDots].slice(0, maxDotsPerDay)
	}
</script>

<div class="month">
	<div class="grid">
		<div class="weekdays" aria-hidden="true">
			{#each weekdays as weekday (weekday)}
				<span>{weekday}</span>
			{/each}
		</div>
		{#each weeks as week, weekIndex (weekIndex)}
			<div class="week">
				{#each week as day (day.getTime())}
					<button
						type="button"
						class="day"
						class:is-outside-month={!isInMonth(day)}
						disabled={!isInMonth(day)}
						aria-pressed={isSameDay(selectedDay, day)}
						data-date={formatIsoDate(day)}
						onclick={() => onSelectDay(day)}
					>
						<span class="day-number" class:is-today={isSameDay(today, day)} class:is-selected={isSameDay(shownDay, day) && isInMonth(day)}>{day.getDate()}</span>
						<span class="dots">
							{#if isInMonth(day)}
								{#each getDots(day) as color, dotIndex (dotIndex)}
									<span class="dot" style:background={color}></span>
								{/each}
							{/if}
						</span>
					</button>
				{/each}
			</div>
		{/each}
	</div>

	<section class="agenda" aria-labelledby="agenda-title">
		<div class="agenda-header">
			<h2 id="agenda-title">{shownDayLabel}</h2>
			<button type="button" class="open-day" onclick={() => onOpenDay(shownDay)}>Åpne dagen</button>
		</div>
		{#each shownDayAppointments as appointment (appointment.start)}
			<div class="agenda-row">
				<span class="agenda-time">{formatTime(appointment.start)}</span>
				<span class="agenda-client">{appointmentTitle(appointment)}</span>
				<AppointmentTypeTag type={appointment.type} />
			</div>
		{:else}
			<p class="no-appointments">Ingen avtaler denne dagen</p>
		{/each}
	</section>
</div>

<style>
	.month,
	.grid,
	.agenda {
		display: flex;
		flex-direction: column;
	}

	.month {
		gap: 0.625rem;
		height: 100%;
	}

	.grid {
		gap: 0.125rem;
	}

	.weekdays,
	.week {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: 0.125rem;
	}

	.weekdays {
		padding-bottom: 0.25rem;
		color: var(--pg-ink-muted);
		font-size: 0.6875rem;
		font-weight: 600;
		text-align: center;
	}

	.day {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.1875rem;
		height: 2.75rem;
		padding: 0;
		border: 0;
		border-radius: 0.625rem;
		background: transparent;
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		cursor: pointer;
	}

	.day:disabled {
		cursor: default;
	}

	.day-number {
		display: grid;
		place-items: center;
		width: 1.625rem;
		height: 1.625rem;
		border-radius: 50%;
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.is-outside-month .day-number {
		color: var(--pg-ink-subtle);
		font-weight: 500;
	}

	.day-number.is-today {
		background: var(--pg-pink);
	}

	.day-number.is-selected {
		background: var(--pg-ink);
		color: #ffffff;
	}

	.day-number.is-today.is-selected {
		background: var(--pg-pink);
		box-shadow: 0 0 0 0.125rem var(--pg-ink);
		color: var(--pg-ink);
	}

	.dots {
		display: flex;
		gap: 0.1875rem;
		height: 0.375rem;
	}

	.dot {
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 50%;
	}

	.agenda {
		flex: 1;
		gap: 0.5rem;
		min-height: 0;
		padding-top: 0.625rem;
		overflow: hidden;
		border-top: 0.0625rem solid var(--pg-row-line);
	}

	.agenda-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	h2 {
		font-size: 1.0625rem;
		font-weight: 700;
	}

	.open-day {
		min-height: 2.75rem;
		padding: 0 0.25rem;
		border: 0;
		background: transparent;
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.8125rem;
		font-weight: 600;
		text-decoration: underline;
		cursor: pointer;
	}

	.agenda-row {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		font-size: 0.875rem;
	}

	.agenda-time {
		flex: 0 0 2.75rem;
		font-weight: 700;
	}

	.agenda-client {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.no-appointments {
		color: var(--pg-ink-subtle);
		font-size: 0.875rem;
	}
</style>
