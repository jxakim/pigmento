<script lang="ts">
	import { formatPeriodLabel } from "./calendarDates"
	import type { CalendarLevel } from "./calendarLevels"

	interface Props {
		level: CalendarLevel
		date: Date
	}

	let { level, date }: Props = $props()

	const periodLabel = $derived(formatPeriodLabel(level, date))
</script>

<span class="calendar-title">
	{date.getFullYear()}
	{#if periodLabel}
		<span class="calendar-period">{periodLabel}</span>
	{/if}
</span>

<style>
	.calendar-title {
		font-family: var(--pg-font-heading);
		font-weight: 700;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.calendar-period {
		display: inline-block;
		margin-inline-start: 0.25rem;
		font-weight: 500;
		opacity: 0.7;
	}

	.calendar-period::first-letter {
		text-transform: uppercase;
	}
</style>
