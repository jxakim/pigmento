<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import CalendarLevelSelect from "./CalendarLevelSelect.svelte"
	import CalendarTitle from "./CalendarTitle.svelte"
	import { type CalendarLevel, levelLabels, parentLevel } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		date: Date
		onBack: () => void
		onLevelChange: (level: CalendarLevel) => void
		onPrevious: () => void
		onToday: () => void
		onNext: () => void
	}

	let { level, date, onBack, onLevelChange, onPrevious, onToday, onNext }: Props = $props()

	const hasParentLevel = $derived(parentLevel[level] !== undefined)
	const periodName = $derived(levelLabels[level].toLowerCase())
</script>

<div class="toolbar">
	<div class="toolbar-start">
		{#if hasParentLevel}
			<button type="button" class="ds-button" data-size="sm" data-variant="secondary" data-color="neutral" onclick={onBack}>‹ Tilbake</button>
		{/if}
		<h1 class="toolbar-title">
			<CalendarTitle {level} {date} />
		</h1>
	</div>

	<div class="toolbar-end">
		<button type="button" class="ds-button" data-size="sm" data-variant="tertiary" data-color="neutral" data-icon="true" aria-label="Forrige {periodName}" onclick={onPrevious}>
			<Icon name="chevron_left" />
		</button>
		<button type="button" class="ds-button" data-size="sm" data-variant="tertiary" data-color="neutral" data-icon="true" aria-label="Neste {periodName}" onclick={onNext}>
			<Icon name="chevron_right" />
		</button>
		<CalendarLevelSelect {level} {onLevelChange} />
		<button type="button" class="ds-button" data-size="sm" data-variant="secondary" data-color="neutral" onclick={onToday}>I dag</button>
	</div>
</div>

<style>
	.toolbar,
	.toolbar-start,
	.toolbar-end {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.toolbar {
		justify-content: space-between;
		gap: 1rem;
	}

	.toolbar-start {
		min-width: 0;
	}

	.toolbar .ds-button {
		flex-shrink: 0;
		white-space: nowrap;
	}

	.toolbar-title {
		display: flex;
		min-width: 0;
		font-size: 1.5rem;
	}

	/* På mobil ligger tittelen i toppstripen ved hamburgermenyen (se Topbar.svelte). */
	@media (max-width: 57.5rem) {
		.toolbar-title {
			display: none;
		}

		.toolbar-end {
			margin-inline-start: auto;
		}
	}
</style>
