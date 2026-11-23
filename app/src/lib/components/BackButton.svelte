<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { goto } from "$app/navigation"

	interface Props {
		fallbackHref: string
	}

	let { fallbackHref }: Props = $props()

	function goBack() {
		if (history.length > 1) {
			history.back()
		} else {
			goto(fallbackHref)
		}
	}
</script>

<button type="button" class="back-button" aria-label="Tilbake" onclick={goBack}>
	<Icon name="arrow_back" />
</button>

<style>
	.back-button {
		display: none;
		flex: none;
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

	@media (max-width: 57.5rem) {
		.back-button {
			display: grid;
		}
	}
</style>
