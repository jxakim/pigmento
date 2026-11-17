<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { formatBadgeCount, getNavigationItems, isCurrentPage } from "#lib/navigation.svelte.ts"

	const bottomBarItems = $derived(getNavigationItems().filter((item) => item.isInBottomBar))
</script>

<nav class="bottom-navigation" aria-label="Hovedmeny" data-color-scheme="dark" data-color="neutral">
	<ul class="navigation-list">
		{#each bottomBarItems as item (item.href)}
			<li>
				<a class="navigation-link" href={item.href} aria-current={isCurrentPage(item.href) ? "page" : undefined}>
					<span class="ds-badge--position" data-placement="top-right">
						<Icon name={item.icon} />
						{#if item.badgeCount}
							<span class="ds-badge" data-color="neutral" data-count={formatBadgeCount(item.badgeCount)}></span>
						{/if}
					</span>
					<span class="label">{item.label}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	.bottom-navigation {
		display: none;
	}

	@media (max-width: 57.5rem) {
		.bottom-navigation {
			position: fixed;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 30;
			display: block;
			padding-bottom: env(safe-area-inset-bottom);
			background: var(--ds-color-neutral-background-default);
			color: var(--ds-color-neutral-text-default);
		}
	}

	.navigation-list {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.navigation-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.125rem;
		height: var(--pg-bottom-navigation-height);
		color: var(--ds-color-neutral-text-subtle);
		font-size: 0.6875rem;
		font-weight: 500;
		text-decoration: none;
	}

	.navigation-link[aria-current="page"] {
		box-shadow: inset 0 0.1875rem 0 var(--ds-color-neutral-border-strong);
		color: var(--ds-color-neutral-text-default);
	}
</style>
