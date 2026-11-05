<script lang="ts">
	// Designsystemet: web-komponenter, komponent-CSS og tema
	import "@digdir/designsystemet-web"
	import "@digdir/designsystemet-css"
	import "../../design-tokens-build/pigmento.css"
	import "../app.css"

	import favicon from "#lib/assets/favicon.svg"
	import { page } from "$app/state"
	import { inquiryCount } from "../lib/sample-data"
	import type { LayoutProps } from "./$types"

	let { children }: LayoutProps = $props()

	const nav = [
		{ href: "/", label: "Forside", count: 0 },
		{ href: "/kalender", label: "Kalender", count: 0 },
		{ href: "/kunder", label: "Kunder", count: 0 },
		{ href: "/avtaler", label: "Avtaler", count: 0 },
		{ href: "/foresporsler", label: "Forespørsler", count: inquiryCount }
	]

	function isActive(href: string): boolean {
		return href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href)
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pigmento</title>
</svelte:head>

<a class="ds-skip-link" href="#hovedinnhold">Hopp til hovedinnhold</a>

<div class="ds-alert" data-color="info" role="alert">
	Dette er en prototype laget av Claude og kan ikke brukes i produksjon.
</div>

<div class="shell">
	<aside class="sidebar" data-color-scheme="dark">
		<div class="brand">
			<img src="/logo.png" alt="" width="52" height="52" />
			<p class="ds-heading" data-size="sm">Pigmento</p>
		</div>

		<nav aria-label="Hovedmeny">
			<ul class="nav-list">
				{#each nav as item (item.href)}
					{@const active = isActive(item.href)}
					<li>
						<a
							class="ds-button"
							data-variant={active ? 'secondary' : 'tertiary'}
							aria-current={active ? 'page' : undefined}
							href={item.href}
						>
							{item.label}
							{#if item.count > 0}
								<span class="ds-badge" data-count={item.count}></span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="user">
			<p class="ds-label">Studioet</p>
			<p class="ds-paragraph" data-size="sm">Innlogget som eier</p>
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
		flex: 1 1 15rem;
		display: flex;
		flex-direction: column;
		gap: var(--ds-size-8);
		padding: var(--ds-size-6) var(--ds-size-4);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--ds-size-3);
	}

	.brand img {
		border-radius: var(--ds-border-radius-md);
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--ds-size-1);
	}

	.nav-list a {
		width: 100%;
		justify-content: space-between;
	}

	.user {
		margin-top: auto;
	}

	.content {
		flex: 999 1 36rem;
		min-width: 0;
		padding: var(--ds-size-8) var(--ds-size-10);
	}
</style>
