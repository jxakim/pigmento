<script lang="ts">
	import { type CalendarLevel, calendarLevels, levelLabels } from "./calendarLevels"

	interface Props {
		level: CalendarLevel
		onLevelChange: (level: CalendarLevel) => void
	}

	let { level, onLevelChange }: Props = $props()
</script>

<div class="level-switcher" role="group" aria-label="Visning">
	{#each calendarLevels as calendarLevel (calendarLevel)}
		<button
			type="button"
			class="ds-button"
			data-size="sm"
			data-variant={calendarLevel === level ? "primary" : "tertiary"}
			data-color="neutral"
			aria-pressed={calendarLevel === level}
			onclick={() => onLevelChange(calendarLevel)}
		>
			{levelLabels[calendarLevel]}
		</button>
	{/each}
</div>

<style>
	.level-switcher {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.level-switcher .ds-button {
		flex-shrink: 0;
		white-space: nowrap;
	}
</style>
