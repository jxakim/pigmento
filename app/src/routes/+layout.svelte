<script lang="ts">
	import "@digdir/designsystemet-web"
	import "@digdir/designsystemet-css"
	import "../../design-tokens-build/pigmento.css"
	import "../app.css"

	import favicon from "#lib/assets/favicon.svg"
	import BottomNavigation from "#lib/components/layout/BottomNavigation.svelte"
	import Sidebar from "#lib/components/layout/Sidebar.svelte"
	import { onNavigate } from "$app/navigation"
	import type { LayoutProps } from "./$types"

	let { children }: LayoutProps = $props()

	onNavigate((navigation) => {
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		if (!document.startViewTransition || prefersReducedMotion) {
			return
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pigmento</title>
</svelte:head>

<div class="layout">
	<Sidebar />

	<main class="content">
		{@render children()}
	</main>

	<BottomNavigation />
</div>

<style>
	.layout {
		display: flex;
		flex-wrap: wrap;
		min-height: 100dvh;
	}

	.content {
		flex: 999 1 37.5rem;
		min-width: 0;
	}

	@media (max-width: 57.5rem) {
		.layout {
			display: block;
		}

		.content {
			padding-bottom: var(--pg-bottom-bar-space);
		}
	}
</style>
