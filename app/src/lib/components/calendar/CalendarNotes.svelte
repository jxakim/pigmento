<script lang="ts">
	import { compactScreen } from "#lib/compactScreen.svelte.ts"
	import Icon from "#lib/components/Icon.svelte"
	import { getNote, saveNote } from "#lib/periodNotes.svelte.ts"
	import { formatPeriodName, getPeriodKey } from "./calendarDates.ts"
	import type { CalendarLevel } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		date: Date
	}

	let { level, date }: Props = $props()

	const periodKey = $derived(getPeriodKey(level, date))
	const title = $derived(`Notat for ${formatPeriodName(level, date)}`)
	const note = $derived(getNote(periodKey))

	function saveChange(event: Event & { currentTarget: HTMLTextAreaElement }) {
		saveNote(periodKey, event.currentTarget.value)
	}
</script>

{#snippet noteField()}
	<textarea class="note-field" aria-label={title} placeholder="Skriv et notat …" value={note} oninput={saveChange}></textarea>
{/snippet}

{#if compactScreen.current}
	<button type="button" class="notes-bar" command="show-modal" commandfor="notes-dialog">
		<Icon name="edit_note" />
		<span class="notes-bar-text">
			<span class="notes-bar-title">{title}</span>
			<span class="notes-bar-preview">{note || "Skriv et notat …"}</span>
		</span>
	</button>

	<dialog id="notes-dialog" class="notes-sheet" closedby="any" aria-label={title}>
		<div class="sheet-header">
			<Icon name="edit_note" />
			<h2>{title}</h2>
			<button type="button" class="close-button" aria-label="Lukk" command="close" commandfor="notes-dialog">
				<Icon name="close" />
			</button>
		</div>
		<div class="sheet-note">
			{@render noteField()}
		</div>
		<button type="button" class="done-button" command="close" commandfor="notes-dialog">Ferdig</button>
	</dialog>
{:else}
	<section class="notes" aria-labelledby="notes-title">
		<div class="notes-header">
			<Icon name="edit_note" />
			<h2 id="notes-title">{title}</h2>
		</div>
		{@render noteField()}
	</section>
{/if}

<style>
	.notes,
	.sheet-note {
		display: flex;
		flex-direction: column;
	}

	.notes {
		gap: 0.75rem;
		height: 100%;
		padding: 1rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.notes-header,
	.sheet-header {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.note-field {
		flex: 1;
		width: 100%;
		min-height: 0;
		padding: 0.75rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: 0.625rem;
		background: #fffdfe;
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.875rem;
		line-height: 1.5;
		resize: none;
	}

	.note-field:focus {
		outline: 0.125rem solid var(--pg-pink);
		outline-offset: 0.0625rem;
	}

	.notes-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		min-height: 3.5rem;
		padding: 0.5rem 0.875rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		text-align: left;
		cursor: pointer;
	}

	.notes-bar-text {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.0625rem;
		min-width: 0;
	}

	.notes-bar-title {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.notes-bar-preview {
		overflow: hidden;
		font-size: 0.875rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.notes-sheet {
		position: fixed;
		inset: auto 0 0;
		width: 100%;
		max-width: none;
		margin: 0;
		padding: 0.75rem 1rem 1.25rem;
		border: 0;
		border-radius: 1.125rem 1.125rem 0 0;
		background: var(--pg-card);
		color: var(--pg-ink);
	}

	.notes-sheet[open] {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.notes-sheet::backdrop {
		background: rgb(12 16 20 / 0.5);
	}

	.sheet-header h2 {
		flex: 1;
	}

	.close-button {
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: 0.625rem;
		background: var(--pg-card);
		color: var(--pg-ink);
		cursor: pointer;
	}

	.sheet-note .note-field {
		height: 12.5rem;
		font-size: 1rem;
	}

	.done-button {
		min-height: 3rem;
		border: 0;
		border-radius: 0.625rem;
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
	}
</style>
