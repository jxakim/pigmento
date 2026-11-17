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
		<h2 {id}>{title}</h2>
		{#if link}
			<a class="section-link" href={link.href}>{link.label}</a>
		{/if}
	</div>
	<div class="page-section-content">
		{@render children()}
	</div>
</section>

<style>
	.page-section,
	.page-section-content {
		display: flex;
		flex-direction: column;
	}

	.page-section {
		gap: 0.875rem;
	}

	.page-section-content {
		gap: 0.75rem;
	}

	.page-section-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.75rem;
	}

	h2 {
		font-size: 1.5rem;
		font-weight: 700;
	}

	.section-link {
		font-size: 0.875rem;
		font-weight: 600;
	}
</style>
