<script lang="ts">
	import { appointmentTitle, appointmentTypeDetails } from "#lib/appointmentTypes.ts"
	import AppointmentTypeTag from "#lib/components/AppointmentTypeTag.svelte"
	import Icon from "#lib/components/Icon.svelte"
	import { formatWorkDayLine } from "#lib/components/work-hours/summarizeWorkDay.ts"
	import { getDaysWithOpenNotifications } from "#lib/notifications.svelte.ts"
	import { scheduledAppointments } from "#lib/sampleData.ts"
	import { getWorkDay } from "#lib/workHours.svelte.ts"
	import { getWorkedHours } from "#lib/workHours.ts"
	import { findAppointmentsOnDay } from "./calendarAppointments.ts"
	import { formatCalendarTitle, formatIsoDate, formatTime, isSameDay } from "./calendarDates.ts"

	interface Props {
		date: Date
		showWorkHours: boolean
		onOpenDay: (day: Date, dayElement?: HTMLElement) => void
	}

	let { date, showWorkHours, onOpenDay }: Props = $props()

	const today = new Date()
	const weekdays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"]
	const maxDotsPerDay = 3
	const maxShownAppointments = 2

	let selectedDay = $state(today)

	const firstOfMonth = $derived(new Date(date.getFullYear(), date.getMonth(), 1))
	const firstGridDay = $derived(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 - ((firstOfMonth.getDay() + 6) % 7)))
	const weeks = $derived(
		Array.from({ length: 6 }, (_, week) => Array.from({ length: 7 }, (_, weekday) => new Date(firstGridDay.getFullYear(), firstGridDay.getMonth(), firstGridDay.getDate() + week * 7 + weekday)))
	)
	const selectedDayAppointments = $derived(findAppointmentsOnDay(scheduledAppointments, selectedDay))
	const hiddenAppointmentCount = $derived(Math.max(0, selectedDayAppointments.length - maxShownAppointments))
	const selectedWorkDay = $derived(getWorkDay(formatIsoDate(selectedDay)))
	const daysWithNotifications = $derived(getDaysWithOpenNotifications())

	$effect(() => {
		selectedDay = findStartDay(date)
	})

	function findStartDay(month: Date): Date {
		return today.getFullYear() === month.getFullYear() && today.getMonth() === month.getMonth() ? today : new Date(month.getFullYear(), month.getMonth(), 1)
	}

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
						aria-label={formatCalendarTitle("day", day).heading}
						data-date={formatIsoDate(day)}
						onclick={() => (selectedDay = day)}
					>
						<span class="day-number" class:is-today={isSameDay(today, day)} class:is-selected={isSameDay(selectedDay, day) && isInMonth(day)}>{day.getDate()}</span>
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

	<div class="agenda">
		<button type="button" class="day-panel" onclick={(event) => onOpenDay(selectedDay, event.currentTarget)}>
			<span class="day-panel-header">
				<span class="day-panel-title">{formatCalendarTitle("day", selectedDay).heading}</span>
				<Icon name="chevron_right" size="1.25rem" />
			</span>
			{#if showWorkHours}
				<span class="day-panel-hours" class:is-worked={getWorkedHours(selectedWorkDay) !== undefined}>{formatWorkDayLine(selectedWorkDay)}</span>
			{/if}
			<span class="agenda-rows">
				{#each selectedDayAppointments.slice(0, maxShownAppointments) as appointment (appointment.start)}
					<span class="agenda-row">
						<span class="agenda-time">{formatTime(appointment.start)}</span>
						<span class="agenda-details">
							<span class="agenda-client">{appointmentTitle(appointment)}</span>
							{#if appointment.description}
								<span class="agenda-description">{appointment.description}</span>
							{/if}
						</span>
						<AppointmentTypeTag type={appointment.type} />
					</span>
				{:else}
					<span class="no-appointments">Ingen avtaler denne dagen</span>
				{/each}
				{#if hiddenAppointmentCount > 0}
					<span class="more-appointments">og {hiddenAppointmentCount} {hiddenAppointmentCount === 1 ? "til" : "fler"}</span>
				{/if}
			</span>
		</button>
	</div>
</div>

<style>
	.month,
	.grid {
		display: flex;
		flex-direction: column;
	}

	.month {
		gap: 0.5rem;
		height: 100%;
	}

	.grid {
		flex: 1;
		gap: 0.0625rem;
		min-height: 0;
	}

	.weekdays,
	.week {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: 0.125rem;
	}

	.weekdays {
		flex: none;
		padding-bottom: 0.125rem;
		color: var(--pg-ink-muted);
		font-size: 0.6875rem;
		font-weight: 600;
		text-align: center;
	}

	.week {
		flex: 1;
		min-height: 2rem;
	}

	.day {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.0625rem;
		height: 100%;
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
		height: 0.3125rem;
	}

	.dot {
		width: 0.3125rem;
		height: 0.3125rem;
		border-radius: 50%;
	}

	.agenda {
		flex: none;
	}

	.day-panel {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
		height: 11.25rem;
		padding: 0.75rem 0.875rem;
		overflow: hidden;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: 0.75rem;
		background: var(--pg-pink-wash);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		text-align: left;
		cursor: pointer;
	}

	.day-panel-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.day-panel-title {
		font-family: var(--pg-font-heading);
		font-size: 1.0625rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.15;
	}

	.day-panel-hours {
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.day-panel-hours.is-worked {
		color: var(--pg-pink-deep);
	}

	.agenda-rows {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
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

	.agenda-details {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
	}

	.agenda-client,
	.agenda-description {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.agenda-client {
		font-weight: 600;
	}

	.agenda-description {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
	}

	.no-appointments,
	.more-appointments {
		color: var(--pg-ink-muted);
		font-size: 0.875rem;
	}

	/* Boksen har alltid samme høyde: plass til de to første avtalene og «og N fler», så kalenderen over ikke flytter seg. På lave skjermer er den lavere og uten beskrivelse. */
	@media (max-height: 47rem) {
		.day-panel {
			height: 9.75rem;
		}

		.agenda-description {
			display: none;
		}
	}
</style>
