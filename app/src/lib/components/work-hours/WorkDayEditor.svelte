<script lang="ts">
	import { formatCalendarTitle, parseIsoDate } from "#lib/components/calendar/calendarDates.ts"
	import Icon from "#lib/components/Icon.svelte"
	import TimeSelect from "#lib/components/TimeSelect.svelte"
	import { defaultWorkHours, formatDuration, formatHours, getDurationInMinutes, getWorkedHours, type WorkDay, type WorkHours, withEnd, withStart } from "#lib/workHours.ts"

	interface Props {
		day: WorkDay
		onLog: (hours: WorkHours) => void
		onDidNotWork: () => void
	}

	let { day, onLog, onDidNotWork }: Props = $props()

	const title = $derived(formatCalendarTitle("day", parseIsoDate(day.isoDate)).heading)
	const hours = $derived(getWorkedHours(day) ?? day.planned ?? defaultWorkHours)
	const plannedSummary = $derived(day.planned ? `Planlagt ${formatHours(day.planned)} · ${formatDuration(getDurationInMinutes(day.planned))}` : "Fridag etter fast arbeidstid")
</script>

<div class="editor" role="group" aria-label="Før inn timer for {title}">
	<div class="heading">
		<h3>{title}</h3>
		<p class="planned-summary">{plannedSummary}</p>
	</div>
	<div class="fields">
		<TimeSelect label="Jeg startet" value={hours.start} onChange={(start) => onLog(withStart(hours, start))} />
		<TimeSelect label="Jeg sluttet" value={hours.end} onChange={(end) => onLog(withEnd(hours, end))} />
		<div class="buttons">
			<button type="button" class="editor-button" disabled={!day.planned} onclick={() => day.planned && onLog(day.planned)}>Som planlagt</button>
			<button type="button" class="editor-button" onclick={onDidNotWork}>Jobbet ikke</button>
		</div>
		<p class="saved-note"><Icon name="check" size="1.125rem" />Lagres automatisk</p>
	</div>
</div>

<style>
	.editor {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		margin: 0.25rem 0 0.5rem;
		padding: 1rem;
		border: 0.0625rem solid var(--pg-pink);
		border-radius: 0.75rem;
		background: var(--pg-card);
	}

	.heading {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.25rem 0.75rem;
	}

	h3 {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.planned-summary {
		color: var(--pg-ink-muted);
		font-size: 0.875rem;
	}

	.fields {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		gap: 0.75rem;
	}

	.buttons {
		display: flex;
		gap: 0.75rem;
	}

	.editor-button {
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

	.editor-button:disabled {
		opacity: 0.5;
		cursor: default;
	}

	@media (hover: hover) {
		.editor-button:not(:disabled):hover {
			border-color: var(--pg-ink);
			background: var(--pg-ink);
			color: #ffffff;
		}
	}

	.saved-note {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		min-height: 2.75rem;
		margin-inline-start: auto;
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
	}

	@media (max-width: 57.5rem) {
		.saved-note {
			margin-inline-start: 0;
		}
	}
</style>
