<script lang="ts">
	import { appointmentTypeStyle, appointmentTypes } from "#lib/appointmentTypes.ts"
	import type { ScheduledAppointment } from "#lib/sampleData.ts"
	import { countByType } from "./calendarAppointments.ts"

	interface Props {
		appointments: ScheduledAppointment[]
	}

	let { appointments }: Props = $props()

	const countsByType = $derived(countByType(appointments))
	const totalLabel = $derived(`${appointments.length} ${appointments.length === 1 ? "avtale" : "avtaler"}`)
</script>

<section class="distribution" aria-labelledby="distribution-title">
	<div class="distribution-header">
		<h2 id="distribution-title">Fordeling</h2>
		<span class="total">{totalLabel}</span>
	</div>

	<div class="bar" aria-hidden="true">
		{#each appointmentTypes as type (type)}
			{#if countsByType[type] > 0}
				<span class="segment" style:background={appointmentTypeStyle[type].dot} style:flex-grow={countsByType[type]}></span>
			{/if}
		{/each}
	</div>

	<ul class="legend">
		{#each appointmentTypes as type (type)}
			<li class="legend-item">
				<span class="dot" style:background={appointmentTypeStyle[type].dot}></span>
				<span class="type-name">{type}</span>
				<span class="count">{countsByType[type]}</span>
			</li>
		{/each}
		<li class="legend-item notification-day">
			<span class="dot"></span>
			<span class="type-name"><span class="long-label">Dag med varsel</span><span class="short-label">Varsel</span></span>
		</li>
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
		padding: 1rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.distribution-header,
	.legend-item {
		display: flex;
		align-items: center;
	}

	.distribution-header {
		justify-content: space-between;
		align-items: baseline;
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.total {
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.bar {
		display: flex;
		height: 0.625rem;
		overflow: hidden;
		border-radius: 62.5rem;
		background: var(--pg-row-line);
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

	.dot {
		flex: none;
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
	}

	.type-name {
		flex: 1;
	}

	.count {
		font-weight: 700;
	}

	.notification-day {
		padding-top: 0.5rem;
		border-top: 0.0625rem solid var(--pg-row-line);
	}

	.notification-day .dot {
		background: var(--pg-pink-deep);
	}

	.notification-day .type-name {
		color: var(--pg-ink-muted);
	}

	.short-label {
		display: none;
	}

	/* På mobil blir fordelingen én rad med tegnforklaring over kalenderen. */
	@media (max-width: 57.5rem) {
		.distribution {
			padding: 0.625rem 0.25rem 0;
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
			gap: 0.25rem 0.875rem;
		}

		.legend-item {
			gap: 0.375rem;
			font-size: 0.75rem;
		}

		.dot {
			width: 0.625rem;
			height: 0.625rem;
		}

		.type-name {
			flex: none;
			color: var(--pg-ink-muted);
		}

		.notification-day {
			padding-top: 0;
			border-top: none;
		}

		.long-label {
			display: none;
		}

		.short-label {
			display: inline;
		}
	}
</style>
