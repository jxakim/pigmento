<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import { getOpenNotifications } from "#lib/notifications.svelte.ts"
	import { urgencyColor } from "#lib/notificationUrgency.ts"

	const maxShownNotifications = 4
	const popoverId = $props.id()

	let isOpen = $state(false)
	let bell: HTMLDivElement

	const openNotifications = $derived(getOpenNotifications())
	const shownNotifications = $derived(openNotifications.slice(0, maxShownNotifications))

	function closeWhenClickingOutside(event: MouseEvent) {
		if (isOpen && !bell.contains(event.target as Node)) {
			isOpen = false
		}
	}

	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === "Escape") {
			isOpen = false
		}
	}
</script>

<svelte:window onclick={closeWhenClickingOutside} onkeydown={closeOnEscape} />

<div class="bell" bind:this={bell}>
	<button type="button" class="bell-button" aria-label="Varsler, {openNotifications.length} åpne" aria-expanded={isOpen} aria-controls={popoverId} onclick={() => (isOpen = !isOpen)}>
		<Icon name="notifications" />
		{#if openNotifications.length > 0}
			<span class="count">{openNotifications.length}</span>
		{/if}
	</button>

	{#if isOpen}
		<div id={popoverId} class="popover">
			<div class="popover-header">
				<h2>Varsler</h2>
				<a class="open-count" href="/notifications">{openNotifications.length} åpne</a>
			</div>

			<ul class="notification-list">
				{#each shownNotifications as notification (notification.id)}
					<li>
						<a class="notification-link" href="/notifications">
							<span class="urgency-bar" style:background={urgencyColor[notification.urgency]}></span>
							<span class="text">
								<span class="title">{notification.title}</span>
								<span class="description">{notification.description}</span>
							</span>
							<span class="due-label">{notification.dueLabel}</span>
						</a>
					</li>
				{:else}
					<li class="no-notifications">Ingenting å følge opp akkurat nå.</li>
				{/each}
			</ul>

			<a class="show-all" href="/notifications">Se alle varsler</a>
		</div>
	{/if}
</div>

<style>
	.bell {
		position: relative;
	}

	.bell-button {
		position: relative;
		display: grid;
		place-items: center;
		width: 2.75rem;
		height: 2.75rem;
		padding: 0;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		cursor: pointer;
	}

	.bell-button:hover {
		border-color: var(--pg-ink);
		background: var(--pg-ink);
		color: #ffffff;
	}

	.count {
		position: absolute;
		top: -0.4375rem;
		right: -0.4375rem;
		display: grid;
		place-items: center;
		min-width: 1.25rem;
		height: 1.25rem;
		padding: 0 0.3125rem;
		border: 0.125rem solid var(--pg-page);
		border-radius: 62.5rem;
		background: var(--pg-pink-deep);
		color: #ffffff;
		font-size: 0.6875rem;
		font-weight: 700;
		line-height: 1;
	}

	.popover {
		position: absolute;
		top: 3.375rem;
		right: 0;
		z-index: 40;
		width: min(25rem, calc(100vw - 2rem));
		overflow: hidden;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
		box-shadow: 0 0.875rem 2.25rem rgb(20 23 26 / 0.18);
	}

	.popover-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding: 0.875rem 1rem 0.625rem;
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.open-count {
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.notification-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.notification-link {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.625rem 1rem 0.625rem 0.75rem;
		border-top: 0.0625rem solid var(--pg-row-line);
		color: var(--pg-ink);
		text-decoration: none;
	}

	.notification-link:hover {
		background: var(--pg-pink-wash);
		color: var(--pg-ink);
	}

	.urgency-bar {
		align-self: stretch;
		flex: none;
		width: 0.25rem;
		border-radius: 0.125rem;
	}

	.text {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.0625rem;
		min-width: 0;
	}

	.title,
	.description {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.title {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.description {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
	}

	.due-label {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}

	.no-notifications {
		padding: 0.75rem 1rem;
		border-top: 0.0625rem solid var(--pg-row-line);
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
	}

	.show-all {
		display: block;
		padding: 0.75rem 1rem;
		border-top: 0.0625rem solid var(--pg-row-line);
		font-size: 0.875rem;
		font-weight: 600;
		text-align: center;
	}
</style>
