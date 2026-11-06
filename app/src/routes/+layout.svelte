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
		{ href: "/calendar", label: "Kalender", icon: "calendar_month", count: 0 },
		{ href: "/clients", label: "Kunder", icon: "group", count: 0 },
		{ href: "/appointments", label: "Avtaler", icon: "format_list_bulleted", count: 1 },
		{ href: "/requests", label: "Forespørsler", icon: "inbox", count: inquiryCount }
	] as const

	function isActive(href: string): boolean {
		return href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href)
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pigmento</title>
</svelte:head>

<div class="content-container">
	<aside class="sidebar">
		<div class="logo-container">
			<img src="/logo.png" alt="" width="52" height="52" />
			<span>Pigmento</span>
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
	.content-container {
		display: flex;
		flex-wrap: wrap;
		min-height: 100vh;
	}

	.sidebar {
		flex: 1 1 20rem;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 1rem 0.75rem;
		background: var(--pg-sidebar);
		color: var(--pg-page);
	}

	.logo-container {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0.5rem;
	}

	.logo-container img {
		display: block;
		width: 52px;
		height: 52px;
		border-radius: 100%;
		object-fit: cover;
	}

	.logo-container > span {
		font-family: var(--pg-font-heading);
		font-size: 24px;
		font-weight: 700;
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-height: 2rem;
		padding: 0.925rem;
		border-radius: 0.5rem;
		color: var(--pg-sidebar-text);
		text-decoration: none;
		font-size: 0.85em;
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
		padding: 0.2rem 0.5rem;
		border-radius: 100%;
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-size: 0.7em;
		font-weight: 700;
	}

	.user {
		margin-top: auto;
		padding: 0.8rem 0.5rem 0 0.5rem;
		border-top: 1px solid var(--pg-sidebar-line);
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.user-name {
		font-size: 0.8em;
		font-weight: 600;
	}

	.user-role {
		font-size: 0.7em;
		color: #a9b1b7;
	}

	.content {
		flex: 999 1 600px;
		min-width: 0;
		padding: 2rem 2rem;
	}
</style>
