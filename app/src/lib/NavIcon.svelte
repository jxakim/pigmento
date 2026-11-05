<script lang="ts">
	type Props = { name: "home" | "calendar" | "users" | "list" | "inbox" }
	let { name }: Props = $props()
</script>

<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
	{#if name === "home"}
		<path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
	{:else if name === "calendar"}
		<rect x="4" y="5" width="16" height="15" rx="2" />
		<path d="M4 10h16M9 3v4M15 3v4" />
	{:else if name === "users"}
		<circle cx="9" cy="8" r="3.5" />
		<path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
		<path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18 14.3c1.8.9 3 2.8 3 5.7" />
	{:else if name === "list"}
		<path d="M8 6h12M8 12h12M8 18h12" />
		<circle cx="4" cy="6" r="1" />
		<circle cx="4" cy="12" r="1" />
		<circle cx="4" cy="18" r="1" />
	{:else}
		<path d="M4 13l2.5-7.5A2 2 0 0 1 8.4 4h7.2a2 2 0 0 1 1.9 1.5L20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
		<path d="M4 13h5l1 2h4l1-2h5" />
	{/if}
</svg>
