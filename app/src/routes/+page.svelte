<script lang="ts">
	import { inquiryCount, today, todayLabel, typeColor, upcomingDays, waitingInquiries } from "../lib/sample-data"
</script>

<div class="page">
	<header class="page-header">
		<div>
			<h1 class="ds-heading" data-size="xl">God morgen</h1>
			<p class="ds-paragraph">
				{todayLabel} · {today.length} timer i dag · {inquiryCount} venter på svar
			</p>
		</div>
		<button class="ds-button" type="button">Ny booking</button>
	</header>

	<div class="columns">
		<div class="column">
			<section class="section" aria-labelledby="idag">
				<div class="section-header">
					<h2 class="ds-heading" data-size="md" id="idag">I dag</h2>
					<a class="ds-link" href="/kalender">Åpne kalender</a>
				</div>

				{#each today as appointment (appointment.start)}
					<div class="ds-card appointment">
						<p class="ds-label time">{appointment.start}–{appointment.end}</p>
						<div class="grow">
							<h3 class="ds-heading" data-size="xs">{appointment.client}</h3>
							<p class="ds-paragraph" data-size="sm">{appointment.note}</p>
						</div>
						<span class="ds-tag" data-color={typeColor[appointment.type]}>{appointment.type}</span>
					</div>
				{/each}
			</section>

			<section class="section" aria-labelledby="kommende">
				<h2 class="ds-heading" data-size="md" id="kommende">Kommende dager</h2>

				<table class="ds-table" data-border>
					<caption class="ds-sr-only">Kommende avtaler</caption>
					<thead>
						<tr>
							<th>Dag</th>
							<th>Tid</th>
							<th>Kunde</th>
							<th>Type</th>
						</tr>
					</thead>
					<tbody>
						{#each upcomingDays as day (day.label)}
							{#each day.items as item, i (item.start)}
								<tr>
									<td>{i === 0 ? day.label : ''}</td>
									<td>{item.start}</td>
									<td>{item.client}</td>
									<td>
										<span class="ds-tag" data-color={typeColor[item.type]}>{item.type}</span>
									</td>
								</tr>
							{/each}
						{/each}
					</tbody>
				</table>
			</section>
		</div>

		<div class="column">
			<section class="section" aria-labelledby="venter">
				<div class="section-header">
					<h2 class="ds-heading" data-size="md" id="venter">Venter på svar</h2>
					<a class="ds-link" href="/foresporsler">Se alle {inquiryCount}</a>
				</div>

				{#each waitingInquiries as inquiry (inquiry.ig)}
					<div class="ds-card inquiry">
						<div class="inquiry-top">
							<h3 class="ds-heading" data-size="xs">{inquiry.ig}</h3>
							<p class="ds-paragraph" data-size="sm">{inquiry.age}</p>
						</div>
						<p class="ds-paragraph" data-size="sm">{inquiry.text}</p>
						<div class="inquiry-bottom">
							{#if inquiry.stale}
								<span class="ds-tag" data-color="warning">Har ventet lenge</span>
							{/if}
							<a
								class="ds-button"
								data-variant="secondary"
								href="https://instagram.com/direct/inbox/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Åpne på Instagram
							</a>
						</div>
					</div>
				{/each}
			</section>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--ds-size-10);
	}

	.page-header {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: var(--ds-size-4);
	}

	.columns {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
		gap: var(--ds-size-10);
		align-items: start;
	}

	@media (max-width: 60rem) {
		.columns {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.column {
		display: flex;
		flex-direction: column;
		gap: var(--ds-size-10);
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: var(--ds-size-4);
	}

	.section-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--ds-size-3);
	}

	.appointment {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--ds-size-3) var(--ds-size-5);
	}

	.time {
		flex: 0 0 8rem;
	}

	.grow {
		flex: 1 1 12rem;
		min-width: 0;
	}

	.inquiry {
		display: flex;
		flex-direction: column;
		gap: var(--ds-size-3);
	}

	.inquiry-top,
	.inquiry-bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--ds-size-2) var(--ds-size-3);
	}

	.inquiry-bottom {
		justify-content: flex-end;
	}
</style>
