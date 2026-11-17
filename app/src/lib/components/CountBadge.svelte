<script lang="ts">
	import { formatBadgeCount } from "#lib/navigation.svelte.ts"

	interface Props {
		count: number
	}

	let { count }: Props = $props()
</script>

<span class="count-badge">{formatBadgeCount(count)}</span>

<style>
	.count-badge {
		padding: 0.125rem 0.5rem;
		border-radius: 62.5rem;
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-size: 0.75rem;
		font-weight: 700;
	}
</style>
