<script lang="ts">
	import NotificationCard from "#lib/components/notifications/NotificationCard.svelte"
	import NotificationSettings from "#lib/components/notifications/NotificationSettings.svelte"
	import PageSection from "#lib/components/PageSection.svelte"
	import { filterLabels, matchesFilter, type NotificationFilter, notificationFilters } from "#lib/notificationFilters.ts"
	import { countHandled, getOpenNotifications, getUrgentNotifications, markAsDone, snoozeUntilTomorrow } from "#lib/notifications.svelte.ts"
	import { urgencies, urgencyLabels } from "#lib/notificationUrgency.ts"

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
		<h1 class="ds-heading" data-size="lg">Varsler</h1>
		<p class="ds-paragraph">{summary}</p>
	</header>

	<div class="filters" role="group" aria-label="Filtrer varsler">
		{#each notificationFilters as filter (filter)}
			<label class="ds-chip" data-color="accent">
				<input type="radio" class="ds-input" name="notification-filter" value={filter} bind:group={selectedFilter} />
				{filterLabels[filter]}
				{countOpen(filter)}
			</label>
		{/each}
	</div>

	<div class="columns">
		<div class="notifications">
			{#each urgencyGroups as group (group.urgency)}
				<PageSection id="notifications-{group.urgency}" title={urgencyLabels[group.urgency]}>
					{#each group.notifications as notification (notification.id)}
						<NotificationCard {notification} onSnooze={() => snoozeUntilTomorrow(notification.id)} onDone={() => markAsDone(notification.id)} />
					{/each}
				</PageSection>
			{:else}
				<div class="ds-card" data-color="neutral">
					<p class="ds-paragraph">{openNotifications.length === 0 ? "Alt er ryddet. Du har ingenting å følge opp akkurat nå." : "Ingen varsler i dette filteret."}</p>
				</div>
			{/each}

			{#if handledSummary}
				<p class="ds-paragraph" data-size="sm">{handledSummary}</p>
			{/if}
		</div>

		<aside class="settings-column">
			<NotificationSettings />
		</aside>
	</div>
</div>

<style>
	.notifications-page,
	.header {
		display: flex;
		flex-direction: column;
	}

	.notifications-page,
	.notifications {
		gap: 1.5rem;
	}

	.notifications-page {
		padding: 1.75rem 2.25rem;
	}

	.header {
		gap: 0.375rem;
	}

	.filters,
	.columns {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.columns {
		align-items: flex-start;
		gap: 2rem;
	}

	.notifications {
		display: flex;
		flex: 3 1 28rem;
		flex-direction: column;
		min-width: 0;
	}

	.settings-column {
		flex: 1 1 18rem;
	}
</style>
