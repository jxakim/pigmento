<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { getUrgentNotifications } from "#lib/notifications.svelte.ts"

	interface Props {
		isCompact?: boolean
	}

	let { isCompact = false }: Props = $props()

	const urgentNotifications = $derived(getUrgentNotifications())
	const headline = $derived(`${urgentNotifications.length} ${urgentNotifications.length === 1 ? "varsel haster" : "varsler haster"}`)
	const titles = $derived(urgentNotifications.map((notification) => notification.title).join(" · "))
	const subjects = $derived(urgentNotifications.map((notification) => notification.subject).join(", "))
</script>

{#if urgentNotifications.length > 0}
	<div class="banner" class:is-compact={isCompact} role="status">
		<Icon name="notifications" />
		<p class="text">
			<strong>{headline}</strong><span class="titles">: {titles}</span><span class="subjects">· {subjects}</span>
		</p>
		<a class="show-notifications" href="/notifications">Se varsler</a>
		<span class="chevron"><Icon name="chevron_right" /></span>
	</div>
{/if}

<style>
	.banner {
		position: relative;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0.5rem 0.5rem 1.25rem;
		border: 0.0625rem solid var(--pg-pink);
		border-radius: 0.75rem;
		background: var(--pg-pink-tint);
		box-shadow: inset 0.25rem 0 0 var(--pg-pink-deep);
	}

	.banner.is-compact {
		padding-block: 0.375rem;
		padding-inline-end: 0.375rem;
	}

	.text {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		font-size: 0.875rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.subjects,
	.chevron {
		display: none;
	}

	.subjects {
		margin-inline-start: 0.25rem;
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

	@media (hover: hover) {
		.show-notifications:hover {
			background: var(--pg-pink-deep);
			color: #ffffff;
		}
	}

	/* På mobil er hele stripen en lenke til varslene, med navnene på det som haster. */
	@media (max-width: 57.5rem) {
		.banner {
			min-height: 2.75rem;
			padding: 0 0.625rem 0 1rem;
		}

		.text {
			font-size: 0.8125rem;
		}

		.titles {
			display: none;
		}

		.subjects,
		.chevron {
			display: inline;
		}

		.chevron {
			display: flex;
		}

		.show-notifications {
			position: absolute;
			inset: 0;
			padding: 0;
			background: transparent;
			color: transparent;
			font-size: 0;
		}

		.show-notifications:hover {
			background: transparent;
		}
	}
</style>
