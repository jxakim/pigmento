<script lang="ts">
	// Designsystemet: web-komponenter, komponent-CSS og tema (rosa, generert fra design-tokens/)
	import "@digdir/designsystemet-web"
	import "@digdir/designsystemet-css"
	import "../../design-tokens-build/pigmento.css"
	import "../app.css"
	import "./layout.css"

	import favicon from "#lib/assets/favicon.svg"
	import { page } from "$app/state"
	import { inquiryCount } from "../lib/utils/sample-data"
	import type { LayoutProps } from "./$types"

	let { children }: LayoutProps = $props()

	function isActive(href: string): boolean {
		return href === "/" ? page.url.pathname === "/" : page.url.pathname.startsWith(href)
	}

	const nav = [
		{
			href: "/",
			label: "Forside",
			icon: "home",
			count: 0
		},
		{
			href: "/calendar",
			label: "Kalender",
			icon: "calendar_month",
			count: 0
		},
		{
			href: "/clients",
			label: "Kunder",
			icon: "group",
			count: 0
		},
		{
			href: "/appointments",
			label: "Avtaler",
			icon: "format_list_bulleted",
			count: 0
		},
		{
			href: "/requests",
			label:"Forespørsler",
			icon: "inbox",
			count: inquiryCount
		}
	] as const
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pigmento</title>
</svelte:head>

<div class="layout">
	<aside class="sidebar">
		<div class="sidebar-logo">
			<img
				src="/logo.png"
				alt=""
				width="52"
				height="52"
			/>
			<span>Pigmento</span>
		</div>

		<nav aria-label="Hovedmeny">
			<ul class="sidebar-nav-list">
				{#each nav as item (item.href)}
					<li>
						<a
							class="sidebar-nav-link {isActive(item.href) ? "active" : null}"
							aria-current={isActive(item.href) ? "page" : null}
							href={item.href}
						>
							<span class="material-symbols-outlined" aria-hidden="true">{item.icon}</span>
							<span class="sidebar-nav-label">{item.label}</span>
							{#if item.count > 0}
								<span class="ds-badge" data-color="accent" data-count={item.count > 99 ? "99+" : item.count}></span>
							{/if}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="sidebar-user">
			<span class="sidebar-user-name">Studio</span>
			<span class="sidebar-user-role">Innlogget som eier</span>
		</div>
	</aside>

	<main id="main-content" class="layout-content">
		{@render children()}
	</main>
</div>
