<script lang="ts">
	import "@digdir/designsystemet-web"
	import "@digdir/designsystemet-css"
	import "../../design-tokens-build/pigmento.css"
	import "../app.css"

	import favicon from "#lib/assets/favicon.svg"
	import Sidebar from "#lib/components/layout/Sidebar.svelte"
	import Topbar from "#lib/components/layout/Topbar.svelte"
	import { setTopbarContent, type TopbarContent } from "#lib/topbarContent.ts"
	import { afterNavigate } from "$app/navigation"
	import type { LayoutProps } from "./$types"

	let { children }: LayoutProps = $props()

	const topbarContent = $state<TopbarContent>({})
	setTopbarContent(topbarContent)

	let isMenuOpen = $state(false)

	afterNavigate(closeMenu)

	function closeMenu() {
		isMenuOpen = false
	}

	function toggleMenu() {
		isMenuOpen = !isMenuOpen
	}

	function closeMenuOnEscape(event: KeyboardEvent) {
		if (event.key === "Escape") {
			closeMenu()
		}
	}
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pigmento</title>
</svelte:head>

<svelte:window onkeydown={closeMenuOnEscape} />

<div class="layout">
	<Topbar {isMenuOpen} onToggleMenu={toggleMenu} end={topbarContent.end} />
	<Sidebar isOpen={isMenuOpen} onClose={closeMenu} />

	<main class="content">
		{@render children()}
	</main>
</div>

<style>
	.layout {
		display: flex;
		flex-wrap: wrap;
		min-height: 100vh;
	}

	.content {
		flex: 999 1 37.5rem;
		min-width: 0;
		padding: var(--pg-content-padding);
	}

	@media (max-width: 57.5rem) {
		.layout {
			display: block;
		}
	}
</style>
