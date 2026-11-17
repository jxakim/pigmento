<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { formatBadgeCount, getNavigationItems, handleNavigationClick, isCurrentPage } from "#lib/navigation.svelte.ts"

	const bottomBarItems = $derived(getNavigationItems().filter((item) => item.isInBottomBar))
</script>

<nav class="bottom-navigation" aria-label="Hovedmeny">
	<ul class="navigation-list">
		{#each bottomBarItems as item (item.href)}
			<li>
				<a class="navigation-link" href={item.href} onclick={() => handleNavigationClick(item)} aria-current={isCurrentPage(item.href) ? "page" : undefined}>
					<span class="icon-with-badge">
						<Icon name={item.icon} />
						{#if item.badgeCount}
							<span class="badge">{formatBadgeCount(item.badgeCount)}</span>
						{/if}
					</span>
					<span>{item.label}</span>
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
			view-transition-name: bottom-navigation;
			display: block;
			padding-bottom: env(safe-area-inset-bottom);
			background: var(--pg-sidebar);
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
		height: var(--pg-bottom-bar-height);
		color: var(--pg-sidebar-text);
		font-size: 0.6875rem;
		font-weight: 500;
		text-decoration: none;
	}

	.navigation-link[aria-current="page"] {
		box-shadow: inset 0 0.1875rem 0 var(--pg-pink);
		color: #ffffff;
	}

	.icon-with-badge {
		position: relative;
		display: inline-flex;
	}

	.badge {
		position: absolute;
		top: -0.375rem;
		right: -0.625rem;
		display: grid;
		place-items: center;
		min-width: 1rem;
		height: 1rem;
		padding: 0 0.25rem;
		border-radius: 62.5rem;
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-size: 0.625rem;
		font-weight: 700;
		line-height: 1;
	}
</style>
