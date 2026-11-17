<script lang="ts">
	import TodaysAppointments from "#lib/components/home/TodaysAppointments.svelte"
	import UpcomingDays from "#lib/components/home/UpcomingDays.svelte"
	import WaitingInquiries from "#lib/components/home/WaitingInquiries.svelte"
	import NewBookingButton from "#lib/components/NewBookingButton.svelte"
	import NotificationBell from "#lib/components/notifications/NotificationBell.svelte"
	import UrgentNotificationsBanner from "#lib/components/notifications/UrgentNotificationsBanner.svelte"
	import { openInquiryCount, todayLabel, todaysAppointments } from "#lib/sampleData.ts"
</script>

<div class="home">
	<header class="header">
		<div class="greeting">
			<h1>God morgen</h1>
			<p class="summary">{todayLabel} · {todaysAppointments.length} timer i dag · {openInquiryCount} venter på svar</p>
		</div>
		<div class="actions">
			<NotificationBell />
			<NewBookingButton />
		</div>
	</header>

	<UrgentNotificationsBanner />

	<div class="columns">
		<div class="column main-column">
			<TodaysAppointments />
			<UpcomingDays />
		</div>
		<div class="column side-column">
			<WaitingInquiries />
		</div>
	</div>
</div>

<style>
	.home,
	.greeting,
	.column {
		display: flex;
		flex-direction: column;
	}

	.home {
		gap: 2.25rem;
		padding: 2.5rem 3rem 3.5rem;
	}

	.column {
		gap: 2.25rem;
	}

	.header,
	.columns {
		display: flex;
		flex-wrap: wrap;
	}

	.header {
		justify-content: space-between;
		align-items: flex-end;
		gap: 1rem;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 0.875rem;
	}

	.greeting {
		gap: 0.375rem;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.1;
	}

	.summary {
		color: var(--pg-ink-muted);
		font-size: 1rem;
	}

	.columns {
		align-items: flex-start;
		gap: 2.5rem;
	}

	.column {
		min-width: 0;
	}

	.main-column {
		flex: 3 1 27.5rem;
	}

	.side-column {
		flex: 2 1 18.75rem;
	}

	@media (max-width: 57.5rem) {
		.home {
			padding: 1rem;
		}
	}
</style>
