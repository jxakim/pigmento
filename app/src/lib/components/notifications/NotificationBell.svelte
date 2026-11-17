<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { getOpenNotifications } from "#lib/notifications.svelte.ts"
	import { urgencyBarColor } from "#lib/notificationUrgency.ts"

	const maxShownNotifications = 4
	const popoverId = $props.id()

	const openNotifications = $derived(getOpenNotifications())
	const shownNotifications = $derived(openNotifications.slice(0, maxShownNotifications))
</script>

<button type="button" class="ds-button" data-variant="tertiary" data-color="neutral" data-icon="true" popovertarget={popoverId} aria-label="Varsler, {openNotifications.length} åpne">
	<span class="ds-badge--position" data-placement="top-right">
		<Icon name="notifications" />
		{#if openNotifications.length > 0}
			<span class="ds-badge" data-color-scheme="light" data-color="accent" data-count={openNotifications.length}></span>
		{/if}
	</span>
</button>

<div class="ds-popover" popover id={popoverId} data-placement="bottom" data-color-scheme="light">
	<div class="popover-header">
		<h2 class="ds-heading" data-size="2xs">Varsler</h2>
		<a class="ds-link" href="/notifications" data-size="sm" data-color="neutral">Se alle</a>
	</div>

	<ul class="notification-list">
		{#each shownNotifications as notification (notification.id)}
			<li>
				<a class="notification-link" href="/notifications">
					<span class="urgency-bar" style:background={urgencyBarColor[notification.urgency]}></span>
					<span class="text">
						<span class="title">{notification.title}</span>
						<span class="due-label">{notification.dueLabel}</span>
					</span>
				</a>
			</li>
		{:else}
			<li class="no-notifications">Ingenting å følge opp akkurat nå.</li>
		{/each}
	</ul>
</div>

<style>
	.popover-header,
	.notification-link,
	.text {
		display: flex;
	}

	.popover-header {
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
		margin-bottom: 0.5rem;
	}

	.notification-list {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		width: min(22rem, 80vw);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.notification-link {
		align-items: stretch;
		gap: 0.75rem;
		padding: 0.5rem;
		border-radius: var(--ds-border-radius-md);
		color: inherit;
		text-decoration: none;
	}

	.notification-link:hover {
		background: var(--ds-color-accent-surface-tinted);
	}

	.urgency-bar {
		width: 0.25rem;
		border-radius: 62.5rem;
	}

	.text {
		flex-direction: column;
		min-width: 0;
	}

	.title {
		font-size: 0.9375rem;
		font-weight: 600;
	}

	.due-label,
	.no-notifications {
		color: var(--ds-color-neutral-text-subtle);
		font-size: 0.8125rem;
	}
</style>
