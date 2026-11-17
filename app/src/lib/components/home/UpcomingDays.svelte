<script lang="ts">
	import AppointmentTypeTag from "#lib/components/AppointmentTypeTag.svelte"
	import PageSection from "#lib/components/PageSection.svelte"
	import { upcomingDays } from "#lib/sampleData.ts"
</script>

<PageSection id="upcoming-days" title="Kommende dager">
	<div class="days">
		{#each upcomingDays as day (day.label)}
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
		{/each}
	</div>
</PageSection>

<style>
	.days {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.day,
	.appointment {
		display: flex;
		flex-wrap: wrap;
	}

	.day {
		gap: 0.5rem 1.25rem;
		padding: 1rem 1.25rem;
		border-top: 0.0625rem solid var(--pg-row-line);
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
		min-width: 0;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.appointment {
		align-items: center;
		gap: 0.375rem 0.875rem;
	}

	.start-time {
		flex: 0 0 3rem;
		font-size: 0.9375rem;
		font-weight: 600;
	}

	.client-name {
		flex: 1 1 8.75rem;
		font-size: 0.9375rem;
	}
</style>
