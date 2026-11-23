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
	import { formatCalendarTitle, formatIsoDate, formatTime, getDaysInRange, getPeriodRange, isSameDay } from "./calendarDates.ts"

	interface Props {
		date: Date
		showWorkHours: boolean
		onOpenDay: (day: Date, dayElement?: HTMLElement) => void
	}

	let { date, showWorkHours, onOpenDay }: Props = $props()

	const today = new Date()
	const weekdays = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"]
	const maxDotsPerDay = 3

	let agenda: HTMLDivElement
	let selectedDay = $state(today)

	const firstOfMonth = $derived(new Date(date.getFullYear(), date.getMonth(), 1))
	const firstGridDay = $derived(new Date(firstOfMonth.getFullYear(), firstOfMonth.getMonth(), 1 - ((firstOfMonth.getDay() + 6) % 7)))
	const weeks = $derived(
		Array.from({ length: 6 }, (_, week) => Array.from({ length: 7 }, (_, weekday) => new Date(firstGridDay.getFullYear(), firstGridDay.getMonth(), firstGridDay.getDate() + week * 7 + weekday)))
	)
	const agendaDays = $derived(getDaysInRange(getPeriodRange("month", date)))
	const daysWithNotifications = $derived(getDaysWithOpenNotifications())

	$effect(() => {
		selectedDay = findStartDay(date)
		agenda?.scrollTo({ top: 0 })
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

	function selectDay(day: Date) {
		selectedDay = day
		const section = agenda.querySelector<HTMLElement>(`[data-agenda-date="${formatIsoDate(day)}"]`)
		if (section) {
			agenda.scrollTo({ top: section.offsetTop, behavior: "smooth" })
		}
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
						onclick={() => selectDay(day)}
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

	<div class="agenda" bind:this={agenda}>
		{#each agendaDays as day (day.getTime())}
			{@const isoDate = formatIsoDate(day)}
			{@const appointments = findAppointmentsOnDay(scheduledAppointments, day)}
			{@const workDay = getWorkDay(isoDate)}
			<section class="agenda-day" data-agenda-date={isoDate}>
				<button type="button" class="agenda-day-header" onclick={(event) => onOpenDay(day, event.currentTarget)}>
					<span class="agenda-day-title">{formatCalendarTitle("day", day).heading}</span>
					{#if showWorkHours}
						<span class="agenda-day-hours" class:is-worked={getWorkedHours(workDay) !== undefined}>{formatWorkDayLine(workDay)}</span>
					{/if}
					<Icon name="chevron_right" size="1.125rem" />
				</button>
				{#each appointments as appointment (appointment.start)}
					<div class="agenda-row">
						<span class="agenda-time">{formatTime(appointment.start)}</span>
						<span class="agenda-client">{appointmentTitle(appointment)}</span>
						<AppointmentTypeTag type={appointment.type} />
					</div>
				{:else}
					<p class="no-appointments">Ingen avtaler</p>
				{/each}
			</section>
		{/each}
	</div>
</div>

<style>
	.month,
	.grid,
	.agenda-day {
		display: flex;
		flex-direction: column;
	}

	.month {
		gap: 0.5rem;
		height: 100%;
	}

	.grid {
		flex: none;
		gap: 0.0625rem;
	}

	.weekdays,
	.week {
		display: grid;
		grid-template-columns: repeat(7, minmax(0, 1fr));
		gap: 0.125rem;
	}

	.weekdays {
		padding-bottom: 0.125rem;
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
		gap: 0.0625rem;
		height: 2.5rem;
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
		position: relative;
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		overscroll-behavior: contain;
		border-top: 0.0625rem solid var(--pg-row-line);
	}

	.agenda-day {
		gap: 0.375rem;
		padding-bottom: 0.625rem;
	}

	.agenda-day-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.75rem;
		padding: 0;
		border: 0;
		background: transparent;
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		text-align: left;
		cursor: pointer;
	}

	.agenda-day-title {
		font-family: var(--pg-font-heading);
		font-size: 1rem;
		font-weight: 700;
	}

	.agenda-day-hours {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
		text-align: right;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.agenda-day-hours.is-worked {
		color: var(--pg-pink-deep);
		font-weight: 600;
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
		font-size: 0.8125rem;
	}
</style>
