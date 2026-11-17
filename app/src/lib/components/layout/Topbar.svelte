<script lang="ts">
	import type { Snippet } from "svelte"
	import Icon from "#lib/components/Icon.svelte"

	interface Props {
		isMenuOpen: boolean
		onToggleMenu: () => void
		end?: Snippet
	}

	let { isMenuOpen, onToggleMenu, end }: Props = $props()
</script>

<header class="topbar" data-color-scheme="dark" data-color="neutral">
	<button
		type="button"
		class="ds-button"
		data-variant="tertiary"
		data-color="neutral"
		data-icon="true"
		aria-expanded={isMenuOpen}
		aria-controls="sidebar"
		aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
		onclick={onToggleMenu}
	>
		<Icon name={isMenuOpen ? "close" : "menu"} />
	</button>
	<span class="app-name">Pigmento</span>
	{#if end}
		<div class="end">
			{@render end()}
		</div>
	{/if}
</header>

<style>
	.topbar {
		display: none;
	}

	@media (max-width: 57.5rem) {
		.topbar {
			position: sticky;
			top: 0;
			z-index: 30;
			display: flex;
			align-items: center;
			gap: 0.5rem;
			height: var(--pg-topbar-height);
			padding: 0 0.5rem;
			background: var(--ds-color-neutral-background-default);
			color: var(--ds-color-neutral-text-default);
		}
	}

	@media (max-width: 30rem) {
		.topbar:has(.end) .app-name {
			display: none;
		}
	}

	.app-name {
		font-family: var(--pg-font-heading);
		font-size: 1.25rem;
		font-weight: 700;
	}

	.end {
		display: flex;
		min-width: 0;
		margin-inline-start: auto;
		padding-inline-end: 0.5rem;
		font-size: 1.125rem;
	}
</style>
