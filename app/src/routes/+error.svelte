<script lang="ts">
	import { page } from "$app/state"
</script>

<section class="error-page">
	{#if page.status === 404}
		<h1>Denne siden er ikke laget ennå</h1>
		<p>Den kommer i en senere versjon.</p>
	{:else}
		<h1>Noe gikk galt</h1>
		<p>{page.error?.message}</p>
	{/if}
	<a class="home-link" href="/">Til forsiden</a>
</section>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.75rem;
		padding: 2.5rem 3rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
	}

	p {
		color: var(--pg-ink-muted);
	}

	.home-link {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		padding: 0 1rem;
		border-radius: var(--pg-button-radius);
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-weight: 600;
		text-decoration: none;
	}

	@media (max-width: 57.5rem) {
		.error-page {
			padding: 1rem;
		}
	}
</style>
