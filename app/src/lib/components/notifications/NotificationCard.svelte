<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import type { AppNotification, NotificationCategory, NotificationUrgency } from "#lib/sampleData.ts"

	interface Props {
		notification: AppNotification
		onSnooze: () => void
		onDone: () => void
	}

	let { notification, onSnooze, onDone }: Props = $props()

	const urgencyColor: Record<NotificationUrgency, string> = {
		urgent: "danger",
		soon: "warning",
		later: "neutral"
	}

	const categoryIcon: Record<NotificationCategory, string> = {
		inquiry: "chat_bubble",
		deposit: "payments",
		reminder: "alarm",
		"follow-up": "healing"
	}

	const opensInNewTab = $derived(notification.actionHref.startsWith("https://"))
</script>

<article class="ds-card" data-color="neutral">
	<div class="notification">
		<span class="urgency-bar" data-color={urgencyColor[notification.urgency]}></span>
		<span class="category-icon">
			<Icon name={categoryIcon[notification.category]} />
		</span>
		<div class="text">
			<span class="title">{notification.title}</span>
			<span class="description">{notification.description}</span>
		</div>
		<span class="due-label">{notification.dueLabel}</span>
		<div class="actions">
			<a class="ds-button" data-size="sm" data-variant="secondary" data-color="neutral" href={notification.actionHref} target={opensInNewTab ? "_blank" : undefined} rel={opensInNewTab ? "noopener noreferrer" : undefined}>
				{notification.actionLabel}
			</a>
			<button type="button" class="ds-button" data-size="sm" data-variant="tertiary" data-color="neutral" data-icon="true" aria-label="Minn meg på det i morgen" onclick={onSnooze}>
				<Icon name="snooze" />
			</button>
			<button type="button" class="ds-button" data-size="sm" data-variant="tertiary" data-color="neutral" data-icon="true" aria-label="Marker som ferdig" onclick={onDone}>
				<Icon name="check" />
			</button>
		</div>
	</div>
</article>

<style>
	.notification {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1rem;
	}

	.urgency-bar {
		align-self: stretch;
		width: 0.25rem;
		border-radius: 62.5rem;
		background: var(--ds-color-base-default);
	}

	.category-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--ds-border-radius-md);
		background: var(--ds-color-neutral-surface-tinted);
	}

	.text {
		display: flex;
		flex: 1 1 14rem;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 0;
	}

	.title {
		font-weight: 600;
	}

	.description,
	.due-label {
		color: var(--ds-color-neutral-text-subtle);
		font-size: 0.875rem;
	}

	.due-label {
		font-weight: 600;
		white-space: nowrap;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}
</style>
