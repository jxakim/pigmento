<script lang="ts">
	import type { Snippet } from "svelte"

	interface Props {
		id: string
		title: string
		link?: { href: string; label: string }
		children: Snippet
	}

	let { id, title, link, children }: Props = $props()
</script>

<section class="page-section" aria-labelledby={id}>
	<div class="page-section-header">
		<h2 {id} class="ds-heading" data-size="sm">{title}</h2>
		{#if link}
			<a class="ds-link" href={link.href} data-size="sm" data-color="neutral">{link.label}</a>
		{/if}
	</div>
	{@render children()}
</section>

<style>
	.page-section {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
	}

	.page-section-header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
	}
</style>
