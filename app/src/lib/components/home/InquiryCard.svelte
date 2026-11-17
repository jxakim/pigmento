<script lang="ts">
	import type { Inquiry } from "#lib/sampleData.ts"

	interface Props {
		inquiry: Inquiry
	}

	let { inquiry }: Props = $props()
</script>

<article class="inquiry">
	<div class="header">
		<span class="instagram-handle">{inquiry.instagramHandle}</span>
		<span class="received-ago">{inquiry.receivedAgo}</span>
	</div>
	<p class="message">{inquiry.message}</p>
	<div class="footer">
		{#if inquiry.hasWaitedLong}
			<span class="waited-long">Har ventet lenge</span>
		{/if}
		<a class="open-instagram" href="https://instagram.com/direct/inbox/" target="_blank" rel="noopener noreferrer">Åpne på Instagram</a>
	</div>
</article>

<style>
	.inquiry {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.125rem 1.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.header,
	.footer {
		display: flex;
		flex-wrap: wrap;
	}

	.header {
		justify-content: space-between;
		align-items: baseline;
		gap: 0.25rem 0.75rem;
	}

	.footer {
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
	}

	.instagram-handle {
		font-size: 1rem;
		font-weight: 600;
	}

	.received-ago {
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
	}

	.message {
		color: var(--pg-ink-soft);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.waited-long {
		margin-inline-end: auto;
		color: var(--pg-pink-deep);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.open-instagram {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.875rem;
		padding: 0 0.875rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
	}

	.open-instagram:hover {
		border-color: var(--pg-ink);
		background: var(--pg-ink);
		color: #ffffff;
	}
</style>
