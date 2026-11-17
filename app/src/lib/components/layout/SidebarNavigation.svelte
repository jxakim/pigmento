<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { openInquiryCount } from "#lib/sampleData.ts"
	import { page } from "$app/state"

	interface NavigationItem {
		href: string
		label: string
		icon: string
		badgeCount?: number
	}

	const navigationItems: NavigationItem[] = [
		{ href: "/", label: "Forside", icon: "home" },
		{ href: "/calendar", label: "Kalender", icon: "calendar_month" },
		{ href: "/clients", label: "Kunder", icon: "group" },
		{ href: "/appointments", label: "Avtaler", icon: "format_list_bulleted" },
		{ href: "/requests", label: "Forespørsler", icon: "inbox", badgeCount: openInquiryCount }
	]

	function isCurrentPage(href: string): boolean {
		return href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href)
	}

	function formatBadgeCount(count: number): string {
		return count > 99 ? "99+" : String(count)
	}
</script>

<nav aria-label="Hovedmeny">
	<ul class="navigation-list">
		{#each navigationItems as item (item.href)}
			<li>
				<a class="navigation-link" href={item.href} aria-current={isCurrentPage(item.href) ? "page" : undefined}>
					<Icon name={item.icon} />
					<span class="label">{item.label}</span>
					{#if item.badgeCount}
						<span class="ds-badge" data-color="neutral" data-count={formatBadgeCount(item.badgeCount)}></span>
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

	.navigation-link[aria-current="page"] {
		box-shadow: inset 0.1875rem 0 0 var(--ds-color-neutral-border-strong);
	}

	.label {
		flex: 1;
	}
</style>
