<script lang="ts">
	import { compactScreen } from "#lib/compactScreen.svelte.ts"
	import Icon from "#lib/components/Icon.svelte"
	import { urgencyColor, urgencyLabels } from "#lib/notificationUrgency.ts"
	import type { AppNotification } from "#lib/sampleData.ts"

	interface Props {
		notification: AppNotification
		onSnooze: () => void
		onDone: () => void
	}

	let { notification, onSnooze, onDone }: Props = $props()

	const opensInNewTab = $derived(notification.actionHref.startsWith("https://"))
</script>

<article class="notification" class:is-urgent={notification.urgency === "urgent"} style:--urgency-color={urgencyColor[notification.urgency]}>
	<span class="icon-box">
		<Icon name={notification.icon} size={compactScreen.current ? "1.125rem" : undefined} />
	</span>
	<div class="text">
		<div class="title-row">
			<span class="title">{notification.title}</span>
			<span class="due-label">{notification.dueLabel}</span>
		</div>
		<span class="description">{notification.description}</span>
		<span class="meta">{urgencyLabels[notification.urgency]} · {notification.dueLabel}</span>
	</div>
	<div class="actions">
		<a class="open-action" href={notification.actionHref} target={opensInNewTab ? "_blank" : undefined} rel={opensInNewTab ? "noopener noreferrer" : undefined}>{notification.actionLabel}</a>
		<button type="button" class="icon-action" aria-label="Minn meg på det i morgen" onclick={onSnooze}>
			<Icon name="snooze" />
		</button>
		<button type="button" class="icon-action" aria-label="Marker som ferdig" onclick={onDone}>
			<Icon name="check" />
		</button>
	</div>
</article>

<style>
	.notification {
		display: flex;
		align-items: center;
		gap: 1rem;
		min-height: 4.5rem;
		padding: 0.75rem 1.125rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
		box-shadow: inset 0.25rem 0 0 var(--urgency-color);
	}

	.icon-box {
		display: grid;
		place-items: center;
		flex: none;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.625rem;
		background: var(--pg-pink-tint);
	}

	.text {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.125rem;
		min-width: 0;
	}

	.title-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.title,
	.description {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		font-size: 0.9375rem;
		font-weight: 600;
	}

	.description {
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
	}

	.due-label {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.meta {
		display: none;
	}

	.actions {
		display: flex;
		flex: none;
		align-items: center;
		gap: 0.5rem;
	}

	.open-action,
	.icon-action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 2.75rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		cursor: pointer;
	}

	.open-action {
		padding: 0 0.875rem;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		white-space: nowrap;
	}

	.icon-action {
		width: 2.75rem;
		padding: 0;
	}

	.open-action:hover,
	.icon-action:hover {
		border-color: var(--pg-ink);
		background: var(--pg-ink);
		color: #ffffff;
	}

	/* På mobil er kortet kompakt: tittel, beskrivelse og hvor det haster, med to knapper. */
	@media (max-width: 57.5rem) {
		.notification {
			gap: 0.5rem;
			min-height: 4.75rem;
			padding: 0.375rem 0.375rem 0.375rem 0.875rem;
		}

		.icon-box {
			width: 2rem;
			height: 2rem;
			border-radius: 0.5625rem;
		}

		.title {
			font-size: 0.875rem;
		}

		.description {
			font-size: 0.75rem;
		}

		.due-label,
		.open-action {
			display: none;
		}

		.meta {
			display: block;
			color: var(--pg-ink-muted);
			font-size: 0.6875rem;
			font-weight: 700;
			letter-spacing: 0.03em;
			text-transform: uppercase;
		}

		.is-urgent .meta {
			color: var(--pg-pink-deep);
		}

		.actions {
			gap: 0;
		}

		.icon-action {
			border: 0;
			border-radius: 0.625rem;
			background: transparent;
		}

		.icon-action:hover {
			background: var(--pg-pink-tint);
			color: var(--pg-ink);
		}
	}
</style>
