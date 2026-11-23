<script lang="ts">
	import { getWorkDay } from "#lib/workHours.svelte.ts"
	import { formatDuration, formatHours, getDurationInMinutes, getWorkedHours } from "#lib/workHours.ts"

	interface Props {
		isoDate: string
	}

	let { isoDate }: Props = $props()

	const day = $derived(getWorkDay(isoDate))
	const workedHours = $derived(getWorkedHours(day))
</script>

<div class="work-hours-line">
	<p class="hours">
		{#if day.planned}
			<span class="item"><span class="label">Planlagt</span> <strong>{formatHours(day.planned)}</strong></span>
		{/if}
		{#if workedHours}
			<span class="item"><span class="label">Jobbet</span> <strong class="worked">{formatHours(workedHours)}</strong> <span class="mobile-duration">· {formatDuration(getDurationInMinutes(workedHours))}</span></span>
			<span class="item duration">{formatDuration(getDurationInMinutes(workedHours))}</span>
		{:else if day.logged}
			<span class="item">Jobbet ikke</span>
		{:else if !day.planned}
			<span class="item">Fridag</span>
		{/if}
	</p>
	<a class="edit-link" href="/hours?dato={isoDate}">Endre timer</a>
</div>

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

	.mobile-duration {
		display: none;
	}

	.edit-link {
		display: inline-flex;
		flex: none;
		align-items: center;
		min-height: 2.75rem;
		font-size: 0.875rem;
		font-weight: 600;
	}

	@media (max-width: 57.5rem) {
		.hours {
			flex-direction: column;
			gap: 0.125rem;
		}

		.item.duration {
			display: none;
		}

		.mobile-duration {
			display: inline;
		}
	}
</style>
