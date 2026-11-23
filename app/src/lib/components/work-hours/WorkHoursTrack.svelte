<script lang="ts">
	import { getWorkedHours, type WorkDay } from "#lib/workHours.ts"
	import { getTrackPosition } from "./workHoursTrack.ts"

	interface Props {
		day: WorkDay
	}

	let { day }: Props = $props()

	const plannedPosition = $derived(day.planned && getTrackPosition(day.planned))
	const workedHours = $derived(getWorkedHours(day))
	const workedPosition = $derived(workedHours && getTrackPosition(workedHours))
	const didNotWork = $derived(day.logged?.didWork === false)
</script>

<span class="track" aria-hidden="true">
	{#if plannedPosition}
		<span class="planned" style:left={plannedPosition.left} style:width={plannedPosition.width}></span>
		{#if didNotWork}
			<span class="not-worked" style:left={plannedPosition.left} style:width={plannedPosition.width}></span>
		{/if}
	{/if}
	{#if workedPosition}
		<span class="worked" style:left={workedPosition.left} style:width={workedPosition.width}></span>
	{/if}
</span>

<style>
	.track {
		position: relative;
		display: block;
		height: 1.75rem;
		background-image: repeating-linear-gradient(to right, var(--pg-row-line) 0, var(--pg-row-line) 0.0625rem, transparent 0.0625rem, transparent 12.5%);
	}

	.planned,
	.worked,
	.not-worked {
		position: absolute;
	}

	.planned {
		top: 0;
		height: 1.75rem;
		box-sizing: border-box;
		border: 0.09375rem dashed var(--pg-planned-border);
		border-radius: 0.5rem;
		background-image: repeating-linear-gradient(135deg, var(--pg-planned-stripe) 0, var(--pg-planned-stripe) 0.1875rem, var(--pg-card) 0.1875rem, var(--pg-card) 0.375rem);
	}

	.worked {
		top: 0.4375rem;
		height: 0.875rem;
		border-radius: 0.3125rem;
		background: var(--pg-pink);
		box-shadow:
			0 0 0 0.09375rem var(--pg-card),
			0 0 0 0.15625rem var(--pg-pink-hover);
	}

	.not-worked {
		top: 0.875rem;
		border-top: 0.125rem solid var(--pg-pink-deep);
	}
</style>
