<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import NotificationCard from "#lib/components/notifications/NotificationCard.svelte"
	import NotificationSettings from "#lib/components/notifications/NotificationSettings.svelte"
	import { filterLabels, matchesFilter, type NotificationFilter, notificationFilters } from "#lib/notificationFilters.ts"
	import { countHandled, getOpenNotifications, getUrgentNotifications, markAsDone, snoozeUntilTomorrow } from "#lib/notifications.svelte.ts"
	import { urgencies, urgencyColor, urgencyLabels } from "#lib/notificationUrgency.ts"

	let selectedFilter = $state<NotificationFilter>("all")

	const openNotifications = $derived(getOpenNotifications())
	const urgentCount = $derived(getUrgentNotifications().length)
	const visibleNotifications = $derived(openNotifications.filter((notification) => matchesFilter(notification, selectedFilter)))

	const urgencyGroups = $derived(
		urgencies.map((urgency) => ({ urgency, notifications: visibleNotifications.filter((notification) => notification.urgency === urgency) })).filter((group) => group.notifications.length > 0)
	)

	const summary = $derived(openNotifications.length === 0 ? "Ingen åpne varsler" : `${openNotifications.length} åpne${urgentCount > 0 ? ` · ${urgentCount} haster` : ""}`)

	const handledSummary = $derived(
		[countHandled("snoozed") > 0 && `${countHandled("snoozed")} utsatt til i morgen`, countHandled("done") > 0 && `${countHandled("done")} ferdig`].filter(Boolean).join(" · ")
	)

	function countOpen(filter: NotificationFilter): number {
		return openNotifications.filter((notification) => matchesFilter(notification, filter)).length
	}
</script>

<div class="notifications-page">
	<header class="header">
		<div class="title">
			<h1>Varsler</h1>
			<p class="summary">{summary}</p>
		</div>

		<div class="filters" role="group" aria-label="Filtrer varsler">
			{#each notificationFilters as filter (filter)}
				<label class="filter">
					<input type="radio" name="notification-filter" value={filter} bind:group={selectedFilter} />
					{filterLabels[filter]}
					<span class="filter-count">{countOpen(filter)}</span>
				</label>
			{/each}
		</div>
	</header>

	<div class="columns">
		<div class="notifications">
			{#each urgencyGroups as group (group.urgency)}
				<section class="group" aria-labelledby="notifications-{group.urgency}">
					<h2 id="notifications-{group.urgency}" class="group-heading">
						<span class="group-dot" style:background={urgencyColor[group.urgency]}></span>
						{urgencyLabels[group.urgency]}
						<span>{group.notifications.length}</span>
					</h2>
					<div class="group-notifications">
						{#each group.notifications as notification (notification.id)}
							<NotificationCard {notification} onSnooze={() => snoozeUntilTomorrow(notification.id)} onDone={() => markAsDone(notification.id)} />
						{/each}
					</div>
				</section>
			{:else}
				<div class="nothing-here">
					<span class="nothing-here-icon"><Icon name="check" /></span>
					<p class="nothing-here-title">{openNotifications.length === 0 ? "Alt er ryddet" : "Ingen varsler her"}</p>
					<p class="nothing-here-text">{openNotifications.length === 0 ? "Du har ingenting å følge opp akkurat nå." : "Prøv et annet filter for å se resten."}</p>
				</div>
			{/each}

			{#if handledSummary}
				<p class="handled-summary">{handledSummary}</p>
			{/if}
		</div>

		<aside class="settings-column">
			<NotificationSettings />
		</aside>
	</div>
</div>

<style>
	.notifications-page,
	.header,
	.notifications,
	.group {
		display: flex;
		flex-direction: column;
	}

	.notifications-page {
		gap: 1.25rem;
		padding: 1.75rem 2.25rem;
	}

	.header {
		gap: 0.875rem;
	}

	.title {
		display: flex;
		align-items: baseline;
		gap: 0.875rem;
	}

	h1 {
		font-size: 2rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	.summary {
		color: var(--pg-ink-muted);
		font-size: 0.9375rem;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.filter {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.5rem;
		padding: 0 0.875rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: 62.5rem;
		background: var(--pg-card);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
	}

	.filter input {
		position: absolute;
		opacity: 0;
		pointer-events: none;
	}

	.filter:hover {
		border-color: var(--pg-ink);
	}

	.filter:has(input:checked) {
		border-color: var(--pg-pink);
		background: var(--pg-pink);
	}

	.filter:has(input:focus-visible) {
		outline: 0.125rem solid var(--pg-ink);
		outline-offset: 0.125rem;
	}

	.filter-count {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
		font-weight: 700;
	}

	.filter:has(input:checked) .filter-count {
		color: var(--pg-ink);
	}

	.columns {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		gap: 1.5rem;
	}

	.notifications {
		flex: 1 1 28rem;
		gap: 1rem;
		min-width: 0;
	}

	.group {
		gap: 0.5rem;
	}

	.group-heading {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--pg-ink-muted);
		font-family: var(--pg-font-body);
		font-size: 0.8125rem;
		font-weight: 700;
		letter-spacing: 0.02em;
		text-transform: uppercase;
	}

	.group-dot {
		width: 0.625rem;
		height: 0.625rem;
		border-radius: 50%;
	}

	.group-notifications {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.settings-column {
		flex: 0 0 20rem;
		margin-top: 0.375rem;
	}

	.nothing-here {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		padding: 2.5rem 1.5rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
		text-align: center;
	}

	.nothing-here-icon {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.625rem;
		background: var(--pg-pink-tint);
	}

	.nothing-here-title {
		font-family: var(--pg-font-heading);
		font-size: 1.25rem;
		font-weight: 700;
	}

	.nothing-here-text,
	.handled-summary {
		color: var(--pg-ink-muted);
		font-size: 0.875rem;
	}

	.handled-summary {
		font-size: 0.8125rem;
	}

	/* På mobil er varslene en flat liste uten overskrifter, og innstillingene er ikke med. */
	@media (max-width: 57.5rem) {
		.notifications-page {
			gap: 0.625rem;
			padding: 0.875rem 1rem;
		}

		.header {
			gap: 0.625rem;
		}

		.title {
			flex-direction: column;
			gap: 0.0625rem;
		}

		h1 {
			font-size: 1.375rem;
			line-height: 1.15;
		}

		.summary {
			font-size: 0.8125rem;
		}

		.filters {
			gap: 0.375rem;
		}

		.filter {
			gap: 0.375rem;
			padding: 0 0.75rem;
			font-size: 0.8125rem;
		}

		.notifications,
		.group,
		.group-notifications {
			display: contents;
		}

		.notifications {
			gap: 0.375rem;
		}

		.columns {
			flex-flow: column nowrap;
			align-items: stretch;
			gap: 0.375rem;
		}

		.group-heading,
		.settings-column {
			display: none;
		}
	}
</style>
