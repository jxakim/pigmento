<script lang="ts">
	import AppointmentTypeTag from "#lib/components/AppointmentTypeTag.svelte"
	import PageSection from "#lib/components/PageSection.svelte"
	import { upcomingDays } from "#lib/sampleData.ts"
</script>

<PageSection id="upcoming-days" title="Kommende dager">
	<div class="ds-card" data-color="neutral">
		{#each upcomingDays as day (day.label)}
			<div class="ds-card__block">
				<div class="day">
					<span class="day-label">{day.label}</span>
					<ul class="appointments">
						{#each day.appointments as appointment (appointment.startTime)}
							<li class="appointment">
								<span class="start-time">{appointment.startTime}</span>
								<span class="client-name">{appointment.clientName}</span>
								<AppointmentTypeTag type={appointment.type} />
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>
</PageSection>

<style>
	.day,
	.appointment {
		display: flex;
		flex-wrap: wrap;
	}

	.day {
		align-items: baseline;
		gap: 0.5rem 1.25rem;
	}

	.day-label {
		flex: 0 0 7.5rem;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.appointments {
		display: flex;
		flex: 1 1 15rem;
		flex-direction: column;
		gap: 0.625rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.appointment {
		align-items: center;
		gap: 0.375rem 0.875rem;
		font-size: 0.9375rem;
	}

	.start-time {
		flex: 0 0 3rem;
		font-weight: 600;
	}

	.client-name {
		flex: 1 1 8.75rem;
	}
</style>
