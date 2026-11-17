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
					{#if isCurrentPage(item.href)}
						<span class="current-indicator" data-color-scheme="light" data-color="accent"></span>
					{/if}
					<span class="ds-badge--position" data-placement="top-right">
						<Icon name={item.icon} />
						{#if item.badgeCount}
							<span class="ds-badge" data-color-scheme="light" data-color="accent" data-count={formatBadgeCount(item.badgeCount)}></span>
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
		position: relative;
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
		color: var(--ds-color-neutral-text-default);
	}

	.current-indicator {
		position: absolute;
		inset-block-start: 0;
		inset-inline: 25%;
		height: 0.1875rem;
		background: var(--ds-color-base-default);
	}
</style>
