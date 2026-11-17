<script lang="ts">
	import TodaysAppointments from "#lib/components/home/TodaysAppointments.svelte"
	import UpcomingDays from "#lib/components/home/UpcomingDays.svelte"
	import WaitingInquiries from "#lib/components/home/WaitingInquiries.svelte"
	import Icon from "#lib/components/Icon.svelte"
	import { openInquiryCount, todayLabel, todaysAppointments } from "#lib/sampleData.ts"
</script>

<div class="home">
	<header class="header">
		<div class="greeting">
			<h1 class="ds-heading" data-size="lg">God morgen</h1>
			<p class="ds-paragraph">{todayLabel} · {todaysAppointments.length} timer i dag · {openInquiryCount} venter på svar</p>
		</div>
		<button type="button" class="ds-button" data-variant="primary" data-color="neutral">
			<Icon name="add" />
			Ny booking
		</button>
	</header>

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

	.home,
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

	.greeting {
		gap: 0.375rem;
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
</style>
