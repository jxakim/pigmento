<script lang="ts">
	import { type CalendarLevel, calendarLevels, levelLabels } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		onLevelChange: (level: CalendarLevel) => void
	}

	let { level, onLevelChange }: Props = $props()

	function selectLevel(event: Event & { currentTarget: HTMLSelectElement }) {
		onLevelChange(event.currentTarget.value as CalendarLevel)
	}
</script>

<select class="ds-input level-select" data-size="sm" aria-label="Visning" value={level} onchange={selectLevel}>
	{#each calendarLevels as calendarLevel (calendarLevel)}
		<option value={calendarLevel}>{levelLabels[calendarLevel]}</option>
	{/each}
</select>

<style>
	.level-select {
		width: auto;
	}
</style>
