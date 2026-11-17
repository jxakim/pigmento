<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { getUrgentNotifications } from "#lib/notifications.svelte.ts"

	const urgentNotifications = $derived(getUrgentNotifications())
	const headline = $derived(`${urgentNotifications.length} ${urgentNotifications.length === 1 ? "varsel haster" : "varsler haster"}:`)
	const summary = $derived(urgentNotifications.map((notification) => notification.title).join(" · "))
</script>

{#if urgentNotifications.length > 0}
	<div class="banner" role="status">
		<Icon name="notifications" />
		<p class="text"><strong>{headline}</strong> {summary}</p>
		<a class="show-notifications" href="/notifications">Se varsler</a>
	</div>
{/if}

<style>
	.banner {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.5rem 0.5rem 1.25rem;
		border: 0.0625rem solid var(--pg-pink);
		border-radius: 0.75rem;
		background: var(--pg-pink-tint);
		box-shadow: inset 0.25rem 0 0 var(--pg-pink-deep);
	}

	.text {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		font-size: 0.875rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.show-notifications {
		display: inline-flex;
		align-items: center;
		flex: none;
		min-height: 2.75rem;
		padding: 0 1rem;
		border-radius: var(--pg-button-radius);
		background: var(--pg-ink);
		color: #ffffff;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
	}

	.show-notifications:hover {
		background: var(--pg-pink-deep);
		color: #ffffff;
	}
</style>
