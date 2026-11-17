<script lang="ts">
	import CalendarLevelSwitcher from "./CalendarLevelSwitcher.svelte"
	import CalendarTitle from "./CalendarTitle.svelte"
	import { type CalendarLevel, parentLevel } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		date: Date
		onBack: () => void
		onLevelChange: (level: CalendarLevel) => void
		onToday: () => void
	}

	let { level, date, onBack, onLevelChange, onToday }: Props = $props()

	const hasParentLevel = $derived(parentLevel[level] !== undefined)
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

	<CalendarLevelSwitcher {level} {onLevelChange} />

	<div class="toolbar-end">
		<button type="button" class="ds-button" data-size="sm" data-variant="secondary" data-color="neutral" onclick={onToday}>I dag</button>
	</div>
</div>

<style>
	/* Like brede sidekolonner (1fr) holder visningsknappene midt på, uansett hvor lang tittelen er. */
	.toolbar {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: center;
		gap: 1rem;
	}

	.toolbar-start,
	.toolbar-end {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
	}

	.toolbar-end {
		justify-content: flex-end;
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
		.toolbar {
			display: flex;
			justify-content: space-between;
			gap: 0.5rem;
		}

		.toolbar-title {
			display: none;
		}
	}
</style>
