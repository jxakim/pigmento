<script lang="ts">
	import { type CalendarLevel, calendarLevels, levelLabels } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		onLevelChange: (level: CalendarLevel) => void
	}

	let { level, onLevelChange }: Props = $props()
</script>

<fieldset class="level-switcher">
	<legend class="visually-hidden">Visning</legend>
	{#each calendarLevels as calendarLevel (calendarLevel)}
		<label class="level-option">
			<input type="radio" name="calendar-level" value={calendarLevel} checked={level === calendarLevel} onchange={() => onLevelChange(calendarLevel)} />
			{levelLabels[calendarLevel]}
		</label>
	{/each}
</fieldset>

<style>
	.level-switcher {
		display: inline-flex;
		gap: 0.125rem;
		margin: 0;
		padding: 0.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: 0.625rem;
		background: var(--pg-card);
	}

	.visually-hidden {
		position: absolute;
		width: 0.0625rem;
		height: 0.0625rem;
		overflow: hidden;
		clip-path: inset(50%);
	}

	.level-option {
		display: grid;
		place-items: center;
		min-height: 2.5rem;
		padding: 0 1.125rem;
		border-radius: 0.4375rem;
		color: var(--pg-ink-muted);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
	}

	.level-option input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	@media (hover: hover) {
		.level-option:hover {
			background: var(--pg-page);
			color: var(--pg-ink);
		}
	}

	.level-option:has(input:checked) {
		background: var(--pg-pink);
		color: var(--pg-ink);
	}

	.level-option:has(input:focus-visible) {
		outline: 0.125rem solid var(--pg-ink);
		outline-offset: 0.125rem;
	}

	@media (max-width: 57.5rem) {
		.level-switcher {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			border-radius: 0.75rem;
		}

		.level-option {
			min-height: 2.75rem;
			padding: 0;
			border-radius: 0.5625rem;
		}
	}
</style>
