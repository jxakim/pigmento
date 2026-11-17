<script lang="ts">
	import { type CalendarLevel, calendarLevels, levelLabels } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		onLevelChange: (level: CalendarLevel) => void
	}

	let { level, onLevelChange }: Props = $props()
</script>

<fieldset class="ds-toggle-group" data-toggle-group="Visning" data-color="accent" data-size="sm">
	{#each calendarLevels as calendarLevel (calendarLevel)}
		<label class="ds-button" data-variant="tertiary">
			<input type="radio" name="calendar-level" value={calendarLevel} checked={level === calendarLevel} onchange={() => onLevelChange(calendarLevel)} />
			{levelLabels[calendarLevel]}
		</label>
	{/each}
</fieldset>
