<script lang="ts">
	import "@digdir/designsystemet-web"
	import "@digdir/designsystemet-css"
	import "../../design-tokens-build/pigmento.css"
	import "../app.css"

	import favicon from "#lib/assets/favicon.svg"
	import BottomNavigation from "#lib/components/layout/BottomNavigation.svelte"
	import Sidebar from "#lib/components/layout/Sidebar.svelte"
	import Topbar from "#lib/components/layout/Topbar.svelte"
	import { setTopbarContent, type TopbarContent } from "#lib/topbarContent.ts"
	import type { LayoutProps } from "./$types"

	let { children }: LayoutProps = $props()

	const topbarContent = $state<TopbarContent>({})
	setTopbarContent(topbarContent)
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Pigmento</title>
</svelte:head>

<div class="layout">
	<Topbar end={topbarContent.end} />
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

		.content {
			padding-bottom: calc(var(--pg-content-padding) + var(--pg-bottom-navigation-height));
		}
	}
</style>
