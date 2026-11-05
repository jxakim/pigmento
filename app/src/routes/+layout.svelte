<script lang="ts">
	// Designsystemet: web-komponenter, komponent-CSS og tema (rosa, generert fra design-tokens/)
	import "@digdir/designsystemet-web"
	import "@digdir/designsystemet-css"
	import "../../design-tokens-build/pigmento.css"
	import "../app.css"

	import favicon from "#lib/assets/favicon.svg"
	import { page } from "$app/state"
	import Icon from "../lib/Icon.svelte"
	import { inquiryCount } from "../lib/sample-data"
	import type { LayoutProps } from "./$types"

	let { children }: LayoutProps = $props()

	const nav = [
		{ href: "/", label: "Forside", icon: "home", count: 0 },
		{ href: "/kalender", label: "Kalender", icon: "calendar_month", count: 0 },
		{ href: "/kunder", label: "Kunder", icon: "group", count: 0 },
		{ href: "/avtaler", label: "Avtaler", icon: "format_list_bulleted", count: 0 },
		{ href: "/foresporsler", label: "Forespørsler", icon: "inbox", count: inquiryCount }
	] as const

	function isActive(href: string): boolean {
		return href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href)
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pigmento</title>
</svelte:head>

<a class="ds-skip-link" href="#hovedinnhold">Hopp til hovedinnhold</a>

<div class="shell">
	<aside class="sidebar">
		<div class="brand">
			<img src="/logo.png" alt="" width="52" height="52" />
			<span class="wordmark">Pigmento</span>
		</div>

		<nav aria-label="Hovedmeny">
			<ul class="nav-list">
				{#each nav as item (item.href)}
					{@const active = isActive(item.href)}
					<li>
						<a class="nav-link" class:active aria-current={active ? "page" : undefined} href={item.href}>
							<Icon name={item.icon} />
							<span class="nav-label">{item.label}</span>
							{#if item.count > 0}
								<span class="nav-badge">{item.count}</span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="user">
			<span class="user-name">Studioet</span>
			<span class="user-role">Innlogget som eier</span>
		</div>
	</aside>

	<main id="hovedinnhold" class="content">
		{@render children()}
	</main>
</div>

<style>
	.shell {
		display: flex;
		flex-wrap: wrap;
		min-height: 100vh;
	}

	.sidebar {
		flex: 1 1 230px;
		display: flex;
		flex-direction: column;
		gap: 32px;
		padding: 28px 16px;
		background: var(--pg-sidebar);
		color: var(--pg-page);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 0 8px;
	}

	.brand img {
		display: block;
		width: 52px;
		height: 52px;
		border-radius: 12px;
		object-fit: cover;
	}

	.wordmark {
		font-family: var(--pg-font-heading);
		font-size: 24px;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 12px;
		min-height: 22px;
		padding: 11px 12px;
		border-radius: 8px;
		color: var(--pg-sidebar-text);
		text-decoration: none;
		font-size: 15px;
		font-weight: 500;
	}

	.nav-link:hover {
		background: var(--pg-sidebar-hover);
		color: #ffffff;
	}

	.nav-link.active {
		background: var(--pg-sidebar-hover);
		color: #ffffff;
		box-shadow: inset 3px 0 0 var(--pg-pink);
	}

	.nav-label {
		flex: 1;
	}

	.nav-badge {
		padding: 2px 8px;
		border-radius: 999px;
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-size: 12px;
		font-weight: 700;
	}

	.user {
		margin-top: auto;
		padding: 14px 12px;
		border-top: 1px solid var(--pg-sidebar-line);
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.user-name {
		font-size: 14px;
		font-weight: 600;
	}

	.user-role {
		font-size: 13px;
		color: #a9b1b7;
	}

	.content {
		flex: 999 1 600px;
		min-width: 0;
		padding: 40px 48px 56px;
	}
</style>
