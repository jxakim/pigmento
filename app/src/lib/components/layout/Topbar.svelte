<script lang="ts">
	import type { Snippet } from "svelte"

	interface Props {
		end?: Snippet
	}

	let { end }: Props = $props()
</script>

<header class="topbar">
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
			padding: 0 1rem;
			background: var(--ds-color-accent-background-tinted);
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
		font-size: 1.125rem;
	}
</style>
