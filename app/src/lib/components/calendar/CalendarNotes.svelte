<script lang="ts">
	import { MediaQuery } from "svelte/reactivity"
	import Icon from "#lib/components/Icon.svelte"
	import { getNote, saveNote } from "#lib/periodNotes.svelte.ts"
	import { formatPeriodName, getPeriodKey } from "./calendarDates.ts"
	import type { CalendarLevel } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		date: Date
	}

	let { level, date }: Props = $props()

	const isCompactScreen = new MediaQuery("max-width: 57.5rem")

	const periodKey = $derived(getPeriodKey(level, date))
	const title = $derived(`Notat for ${formatPeriodName(level, date)}`)

	function saveChange(event: Event & { currentTarget: HTMLTextAreaElement }) {
		saveNote(periodKey, event.currentTarget.value)
	}
</script>

{#snippet noteField()}
	<textarea class="ds-input note-field" aria-label={title} placeholder="Skriv et notat …" value={getNote(periodKey)} oninput={saveChange}></textarea>
{/snippet}

{#if isCompactScreen.current}
	<button type="button" class="ds-button" data-variant="secondary" data-color="neutral" data-size="sm" command="show-modal" commandfor="notes-dialog">
		<Icon name="edit_note" />
		{title}
	</button>

	<dialog id="notes-dialog" class="ds-dialog" data-placement="bottom" closedby="any" aria-label={title}>
		<div class="dialog-content">
			<h2 class="ds-heading" data-size="xs">{title}</h2>
			<div class="dialog-note">
				{@render noteField()}
			</div>
			<button type="button" class="ds-button" data-color="neutral" command="close" commandfor="notes-dialog">Ferdig</button>
		</div>
	</dialog>
{:else}
	<section class="notes ds-card" data-color="neutral" aria-labelledby="notes-title">
		<h2 id="notes-title" class="ds-heading" data-size="2xs">{title}</h2>
		{@render noteField()}
	</section>
{/if}

<style>
	.notes,
	.dialog-content {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.notes {
		height: 100%;
	}

	.notes .note-field {
		flex: 1;
		resize: none;
	}

	.dialog-note .note-field {
		height: 12rem;
		resize: none;
	}
</style>
