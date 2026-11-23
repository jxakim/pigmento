<script lang="ts">
	import { formatDifference, formatDuration, getTotals, type WorkDay } from "#lib/workHours.ts"

	interface Props {
		monthName: string
		days: WorkDay[]
	}

	let { monthName, days }: Props = $props()

	const loggedDays = $derived(days.filter((day) => day.logged))
	const totals = $derived(getTotals(loggedDays))
	const differenceInMinutes = $derived(totals.workedMinutes - totals.plannedMinutes)
</script>

<section class="month-summary" aria-labelledby="month-summary-title">
	<div class="heading">
		<h2 id="month-summary-title" class="title">Hittil i {monthName}</h2>
		<p class="logged-days">{loggedDays.length} dager ført</p>
	</div>
	<dl class="totals">
		<div class="total">
			<dt>Planlagt</dt>
			<dd>{formatDuration(totals.plannedMinutes)}</dd>
		</div>
		<div class="total">
			<dt>Jobbet</dt>
			<dd>{formatDuration(totals.workedMinutes)}</dd>
		</div>
		<div class="total">
			<dt>Forskjell</dt>
			<dd class="difference">{differenceInMinutes === 0 ? "0 t" : formatDifference(differenceInMinutes)}</dd>
		</div>
	</dl>
</section>

<style>
	.month-summary {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	.heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.title {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.logged-days {
		color: var(--pg-ink-muted);
		font-size: 0.8125rem;
		font-weight: 600;
	}

	.totals {
		display: flex;
		gap: 0.75rem;
		margin: 0;
	}

	.total {
		display: flex;
		flex: 1;
		flex-direction: column;
		gap: 0.125rem;
	}

	dt {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
	}

	dd {
		margin: 0;
		font-family: var(--pg-font-heading);
		font-size: 1.625rem;
		font-weight: 700;
	}

	.difference {
		color: var(--pg-pink-deep);
	}
</style>
