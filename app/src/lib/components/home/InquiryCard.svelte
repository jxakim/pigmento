<script lang="ts">
	import type { Inquiry } from "#lib/sampleData.ts"

	interface Props {
		inquiry: Inquiry
	}

	let { inquiry }: Props = $props()
</script>

<article class="ds-card" data-color="neutral">
	<div class="inquiry">
		<div class="header">
			<span class="instagram-handle">{inquiry.instagramHandle}</span>
			<span class="received-ago">{inquiry.receivedAgo}</span>
		</div>
		<p class="ds-paragraph" data-size="sm">{inquiry.message}</p>
		<div class="footer">
			{#if inquiry.hasWaitedLong}
				<span class="waited-long">Har ventet lenge</span>
			{/if}
			<a class="ds-button" data-size="sm" data-variant="tertiary" data-color="neutral" href="https://instagram.com/direct/inbox/" target="_blank" rel="noopener noreferrer">
				Åpne på Instagram
			</a>
		</div>
	</div>
</article>

<style>
	.inquiry {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
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

	.instagram-handle,
	.waited-long {
		font-weight: 600;
	}

	.received-ago,
	.waited-long {
		font-size: 0.8125rem;
	}

	.received-ago {
		color: var(--ds-color-neutral-text-subtle);
	}

	.waited-long {
		margin-inline-end: auto;
		color: var(--ds-color-neutral-text-default);
	}
</style>
