<script lang="ts">
	import { formatCalendarTitle } from "./calendarDates.ts"
	import type { CalendarLevel } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		date: Date
	}

	let { level, date }: Props = $props()

	const title = $derived(formatCalendarTitle(level, date))
</script>

<h1 class="calendar-title">
	{title.heading}
	{#if title.range}
		<span class="range">· {title.range}</span>
	{/if}
</h1>

<style>
	.calendar-title {
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.1;
		white-space: nowrap;
	}

	/* På mobil står perioden på linjen under tittelen. */
	@media (max-width: 57.5rem) {
		.calendar-title {
			font-size: 1.25rem;
			line-height: 1.15;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.range {
			display: none;
		}
	}
</style>
