<script lang="ts">
	import { appointmentTitle } from "#lib/appointmentTypes.ts"
	import AppointmentTypeTag from "#lib/components/AppointmentTypeTag.svelte"
	import type { Appointment } from "#lib/sampleData.ts"

	interface Props {
		appointment: Appointment
	}

	let { appointment }: Props = $props()
</script>

<article class="appointment">
	<div class="time">
		<span class="start-time">{appointment.startTime}</span>
		<span class="end-time">til {appointment.endTime}</span>
	</div>
	<div class="details">
		<span class="client-name">{appointmentTitle(appointment)}</span>
		{#if appointment.description}
			<span class="description">{appointment.description}</span>
		{/if}
	</div>
	<AppointmentTypeTag type={appointment.type} />
</article>

<style>
	.appointment {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem 1.25rem;
		padding: 1rem 1.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.time,
	.details {
		display: flex;
		flex-direction: column;
	}

	.time {
		flex: 0 0 4.75rem;
		align-items: center;
		padding: 0.5rem 0;
		border-radius: 0.625rem;
		background: var(--pg-pink-tint);
	}

	.start-time {
		font-family: var(--pg-font-heading);
		font-size: 1.375rem;
		font-weight: 700;
	}

	.end-time,
	.description {
		color: var(--pg-ink-muted);
	}

	.end-time {
		font-size: 0.75rem;
	}

	.details {
		flex: 1 1 12.5rem;
		min-width: 0;
		gap: 0.125rem;
	}

	.client-name {
		font-size: 1.0625rem;
		font-weight: 600;
	}

	.description {
		font-size: 0.875rem;
	}
</style>
