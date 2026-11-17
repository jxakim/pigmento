<script lang="ts">
	import { getUrgentNotifications } from "#lib/notifications.svelte.ts"

	const urgentNotifications = $derived(getUrgentNotifications())
	const headline = $derived(`${urgentNotifications.length} ${urgentNotifications.length === 1 ? "varsel haster" : "varsler haster"}:`)
	const summary = $derived(urgentNotifications.map((notification) => notification.title).join(" · "))
</script>

{#if urgentNotifications.length > 0}
	<div class="ds-alert" data-color="warning" role="status">
		<div class="banner">
			<p class="ds-paragraph" data-size="sm"><strong>{headline}</strong> {summary}</p>
			<a class="ds-link" href="/notifications" data-size="sm" data-color="neutral">Se varsler</a>
		</div>
	</div>
{/if}

<style>
	.banner {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.banner p {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.banner a {
		flex-shrink: 0;
	}
</style>
