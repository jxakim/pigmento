<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { formatBadgeCount, getNavigationItems, isCurrentPage } from "#lib/navigation.svelte.ts"

	const navigationItems = $derived(getNavigationItems())
</script>

<nav aria-label="Hovedmeny">
	<ul class="navigation-list">
		{#each navigationItems as item (item.href)}
			<li>
				<a class="navigation-link" href={item.href} aria-current={isCurrentPage(item.href) ? "page" : undefined}>
					{#if isCurrentPage(item.href)}
						<span class="current-indicator" data-color-scheme="light" data-color="accent"></span>
					{/if}
					<Icon name={item.icon} />
					<span class="label">{item.label}</span>
					{#if item.badgeCount}
						<span class="ds-badge" data-color-scheme="light" data-color="accent" data-count={formatBadgeCount(item.badgeCount)}></span>
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
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.navigation-link {
		position: relative;
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.925rem;
		border-radius: var(--ds-border-radius-md);
		color: var(--ds-color-neutral-text-subtle);
		font-size: 0.85em;
		font-weight: 500;
		text-decoration: none;
	}

	.navigation-link:hover,
	.navigation-link[aria-current="page"] {
		background: var(--ds-color-neutral-surface-tinted);
		color: var(--ds-color-neutral-text-default);
	}

	.current-indicator {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		width: 0.1875rem;
		background: var(--ds-color-base-default);
	}

	.label {
		flex: 1;
	}
</style>
