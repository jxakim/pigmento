<script lang="ts">
	import { compactScreen } from "#lib/compactScreen.svelte.ts"
	import { parseIsoDate } from "#lib/components/calendar/calendarDates.ts"
	import Icon from "#lib/components/Icon.svelte"
	import { getWorkDay } from "#lib/workHours.svelte.ts"
	import { formatDuration, formatHours, getDurationInMinutes, getWeekday, getWorkedHours, weekdayNames } from "#lib/workHours.ts"
	import { formatWorkDayLine } from "./summarizeWorkDay.ts"

	interface Props {
		isoDate: string
	}

	let { isoDate }: Props = $props()

	const day = $derived(getWorkDay(isoDate))
	const workedHours = $derived(getWorkedHours(day))
	const dateLabel = $derived(`${weekdayNames[getWeekday(isoDate)].short} ${parseIsoDate(isoDate).getDate()}`)
</script>

{#if compactScreen.current}
	<a class="compact-line" href="/hours?dato={isoDate}">
		<span class="compact-date">{dateLabel}</span>
		<span class="compact-hours" class:is-worked={workedHours !== undefined}>{formatWorkDayLine(day)}</span>
		<Icon name="chevron_right" size="1.125rem" />
	</a>
{:else}
	<div class="work-hours-line">
		<p class="hours">
			{#if day.planned}
				<span class="item"><span class="label">Planlagt</span> <strong>{formatHours(day.planned)}</strong></span>
			{/if}
			{#if workedHours}
				<span class="item"><span class="label">Jobbet</span> <strong class="worked">{formatHours(workedHours)}</strong></span>
				<span class="item duration">{formatDuration(getDurationInMinutes(workedHours))}</span>
			{:else if day.logged}
				<span class="item">Jobbet ikke</span>
			{:else if !day.planned}
				<span class="item">Fridag</span>
			{/if}
		</p>
		<a class="edit-link" href="/hours?dato={isoDate}">Endre timer</a>
	</div>
{/if}

<style>
	.work-hours-line {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.hours {
		display: flex;
		flex-wrap: wrap;
		gap: 0.125rem 1rem;
		font-size: 0.875rem;
	}

	.label {
		color: var(--pg-ink-muted);
	}

	.worked {
		color: var(--pg-pink-deep);
	}

	.duration {
		font-weight: 600;
	}

	.edit-link {
		display: inline-flex;
		flex: none;
		align-items: center;
		min-height: 2.75rem;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.compact-line {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.625rem;
		min-height: 2.75rem;
		color: var(--pg-ink);
		text-decoration: none;
	}

	.compact-date {
		font-family: var(--pg-font-heading);
		font-size: 1.125rem;
		font-weight: 700;
	}

	.compact-hours {
		color: var(--pg-ink-muted);
		font-size: 0.875rem;
		font-weight: 600;
	}

	.compact-hours.is-worked {
		color: var(--pg-pink-deep);
	}
</style>
