<script lang="ts">
	import CountBadge from "#lib/components/CountBadge.svelte"
	import Icon from "#lib/components/Icon.svelte"
	import { getNavigationItems, isCurrentPage } from "#lib/navigation.svelte.ts"

	const navigationItems = $derived(getNavigationItems())
</script>

<nav aria-label="Hovedmeny">
	<ul class="navigation-list">
		{#each navigationItems as item (item.href)}
			<li>
				<a class="navigation-link" href={item.href} aria-current={isCurrentPage(item.href) ? "page" : undefined}>
					<Icon name={item.icon} />
					<span class="label">{item.label}</span>
					{#if item.badgeCount}
						<CountBadge count={item.badgeCount} />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.navigation-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.navigation-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		min-height: 2.75rem;
		padding: 0.6875rem 0.75rem;
		border-radius: var(--pg-button-radius);
		color: var(--pg-sidebar-text);
		font-size: 0.9375rem;
		font-weight: 500;
		text-decoration: none;
	}

	.navigation-link:hover,
	.navigation-link[aria-current="page"] {
		background: var(--pg-sidebar-hover);
		color: #ffffff;
	}

	.navigation-link[aria-current="page"] {
		box-shadow: inset 0.1875rem 0 0 var(--pg-pink);
	}

	.label {
		flex: 1;
	}
</style>
