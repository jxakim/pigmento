<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import CalendarLevelSwitcher from "./CalendarLevelSwitcher.svelte"
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

	<button type="button" class="ds-button" data-size="sm" data-variant="tertiary" data-color="neutral" data-icon="true" aria-label="Forrige {periodName}" onclick={onPrevious}>
		<Icon name="chevron_left" />
	</button>
	<button type="button" class="ds-button" data-size="sm" data-variant="tertiary" data-color="neutral" data-icon="true" aria-label="Neste {periodName}" onclick={onNext}>
		<Icon name="chevron_right" />
	</button>
	<div class="level-switcher">
		<CalendarLevelSwitcher {level} {onLevelChange} />
	</div>
	<button type="button" class="ds-button" data-size="sm" data-variant="secondary" data-color="neutral" onclick={onToday}>I dag</button>
</div>

<style>
	.toolbar,
	.toolbar-start {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.toolbar-start {
		min-width: 0;
		margin-inline-end: auto;
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

	/* På mobil ligger tittelen i toppstripen (se Topbar.svelte), og visningsvalget får en egen rad. */
	@media (max-width: 57.5rem) {
		.toolbar {
			flex-wrap: wrap;
		}

		.toolbar-title {
			display: none;
		}

		.level-switcher {
			flex: 1 0 100%;
			order: 1;
		}

		.level-switcher :global(.ds-toggle-group) {
			width: 100%;
			max-width: none;
		}
	}
</style>
