<script lang="ts">
	import { appointmentTypeColor, appointmentTypes } from "#lib/appointmentTypes.ts"
	import type { ScheduledAppointment } from "#lib/sampleData.ts"
	import { countByType } from "./calendarAppointments.ts"
	import type { CalendarLevel } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		appointments: ScheduledAppointment[]
	}

	let { level, appointments }: Props = $props()

	const countsByType = $derived(countByType(appointments))
	const totalLabel = $derived(`${appointments.length} ${appointments.length === 1 ? "avtale" : "avtaler"}`)
</script>

<section class="distribution ds-card" data-color="neutral" aria-labelledby="distribution-title">
	<div class="distribution-header">
		<h2 id="distribution-title" class="ds-heading" data-size="2xs">Fordeling</h2>
		<span class="total">{totalLabel}</span>
	</div>

	<div class="bar" aria-hidden="true">
		{#each appointmentTypes as type (type)}
			{#if countsByType[type] > 0}
				<span class="segment" data-color={appointmentTypeColor[type]} style:flex-grow={countsByType[type]}></span>
			{/if}
		{/each}
	</div>

	<ul class="legend">
		{#each appointmentTypes as type (type)}
			<li class="legend-item">
				<span class="swatch" data-color={appointmentTypeColor[type]}></span>
				<span class="type-name">{type}</span>
				<span class="count">{countsByType[type]}</span>
			</li>
		{/each}
		{#if level === "month"}
			<li class="legend-item">
				<span class="swatch notification-swatch"></span>
				<span class="type-name">Dag med varsel</span>
			</li>
		{/if}
	</ul>
</section>

<style>
	.distribution,
	.legend {
		display: flex;
		flex-direction: column;
	}

	.distribution {
		gap: 0.75rem;
	}

	.distribution-header,
	.legend-item {
		display: flex;
		align-items: center;
	}

	.distribution-header {
		justify-content: space-between;
		gap: 0.75rem;
	}

	.total,
	.count {
		font-weight: 600;
	}

	.total {
		color: var(--ds-color-neutral-text-subtle);
		font-size: 0.8125rem;
	}

	.bar {
		display: flex;
		height: 0.625rem;
		overflow: hidden;
		border-radius: 62.5rem;
		background: var(--ds-color-neutral-surface-tinted);
	}

	.segment,
	.swatch {
		background: var(--ds-color-base-default);
	}

	.notification-swatch {
		background: var(--ds-color-accent-border-strong);
	}

	.legend {
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.legend-item {
		gap: 0.625rem;
		font-size: 0.875rem;
	}

	.swatch {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
	}

	.type-name {
		flex: 1;
	}

	/* På mobil blir fordelingen én rad med tegnforklaring over kalenderen. */
	@media (max-width: 57.5rem) {
		.distribution {
			padding: 0;
			border: none;
			background: none;
		}

		.distribution-header,
		.bar {
			display: none;
		}

		.legend {
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.25rem 1rem;
		}

		.type-name {
			flex: none;
			color: var(--ds-color-neutral-text-subtle);
		}
	}
</style>
