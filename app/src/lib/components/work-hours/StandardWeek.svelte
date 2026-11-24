<script lang="ts">
	import TimeSelect from "#lib/components/TimeSelect.svelte"
	import { getStandardWeek, setStandardDay } from "#lib/workHours.svelte.ts"
	import { defaultWorkHours, formatDuration, getDurationInMinutes, weekdayNames, weekdays, withEnd, withStart, workEndOptions, workStartOptions } from "#lib/workHours.ts"

	const workdays = weekdays.slice(0, 5)
	const standardWeek = $derived(getStandardWeek())
	const weeklyMinutes = $derived(weekdays.reduce((total, weekday) => total + getDurationInMinutes(standardWeek[weekday]), 0))

	function copyMondayToWorkdays() {
		for (const weekday of workdays) {
			setStandardDay(weekday, standardWeek.monday)
		}
	}
</script>

<section class="standard-week" aria-labelledby="standard-week-title">
	<div class="heading">
		<h2 id="standard-week-title">Fast arbeidstid</h2>
		<p class="help">Det du som regel jobber. Hver dag kan du endre over.</p>
	</div>

	{#each weekdays as weekday (weekday)}
		{@const hours = standardWeek[weekday]}
		<div class="weekday">
			<label class="weekday-name" for="works-{weekday}">{weekdayNames[weekday].short}</label>
			<input id="works-{weekday}" class="weekday-switch" type="checkbox" checked={hours !== undefined} aria-label="Jobber {weekdayNames[weekday].long.toLowerCase()}" onchange={() => setStandardDay(weekday, hours ? undefined : defaultWorkHours)} />
			{#if hours}
				<TimeSelect label="Starter {weekdayNames[weekday].long.toLowerCase()}" value={hours.start} options={workStartOptions} isLabelHidden onChange={(start) => setStandardDay(weekday, withStart(hours, start))} />
				<TimeSelect label="Slutter {weekdayNames[weekday].long.toLowerCase()}" value={hours.end} options={workEndOptions} isLabelHidden onChange={(end) => setStandardDay(weekday, withEnd(hours, end))} />
			{:else}
				<span class="day-off">Fri</span>
			{/if}
		</div>
	{/each}

	<div class="footer">
		<p class="weekly-total">{formatDuration(weeklyMinutes)} i uka</p>
		<button type="button" class="copy-button" onclick={copyMondayToWorkdays}>Bruk mandag på alle hverdager</button>
	</div>
</section>

<style>
	.standard-week {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		padding: 1.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.heading {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.help {
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
	}

	.weekday {
		display: grid;
		grid-template-columns: 2.75rem 1.25rem minmax(0, 1fr) minmax(0, 1fr);
		align-items: center;
		gap: 0.625rem;
	}

	.weekday-name {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.weekday-switch {
		width: 1.25rem;
		height: 1.25rem;
		accent-color: var(--pg-pink-deep);
	}

	.day-off {
		grid-column: 3 / 5;
		color: var(--pg-ink-subtle);
		font-size: 0.875rem;
	}

	.footer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
		padding-top: 0.75rem;
		border-top: 0.0625rem solid var(--pg-row-line);
	}

	.weekly-total {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.copy-button {
		min-height: 2.75rem;
		padding: 0 1rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
	}

	@media (hover: hover) {
		.copy-button:hover {
			border-color: var(--pg-ink);
			background: var(--pg-ink);
			color: #ffffff;
		}
	}
</style>
