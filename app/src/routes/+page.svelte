<script lang="ts">
	import "./page.css"
	import { inquiryCount, today, todayLabel, typeColor, upcomingDays, waitingInquiries } from "../lib/utils/sample-data"
	import ListAppointments from "../lib/components/ListAppointments.svelte";
</script>

<div class="page">
	<header class="page-header">
		<div class="page-intro">
			<h1 class="ds-heading" data-size="lg">God morgen</h1>
			<p class="ds-paragraph">{todayLabel} · {today.length} timer i dag · {inquiryCount} venter på svar</p>
		</div>
		<button
			type="button"
			class="ds-button"
			data-size="md"
			data-variant="primary"
			data-color="accent"
		>
			<span class="material-symbols-outlined" aria-hidden="true">add</span>
			Ny booking
		</button>
	</header>

	<div class="page-columns">
		<div class="page-column page-column-main">
			<ListAppointments type="section"/>

			<section class="section" aria-labelledby="upcoming">
				<h2 id="upcoming" class="ds-heading" data-size="sm">Kommende dager</h2>
				<div class="ds-card" data-color="neutral">
					{#each upcomingDays as day (day.label)}
						<div class="ds-card__block">
							<div class="upcoming-day">
							<div class="upcoming-day-label">{day.label}</div>
							<ul class="upcoming-day-items">
								{#each day.items as item (item.start)}
									<li class="upcoming-item">
										<span class="upcoming-item-time">{item.start}</span>
										<span class="upcoming-item-client">{item.client}</span>
										<span class="ds-tag" data-size="sm" data-color={typeColor[item.type]}>{item.type}</span>
									</li>
								{/each}
							</ul>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>

		<div class="page-column page-column-side">
			<section class="section" aria-labelledby="waiting">
				<div class="section-header">
					<h2 id="waiting" class="ds-heading" data-size="sm">Venter på svar</h2>
					<a
						class="ds-link"
						href="/requests"
						data-size="sm"
						data-color="accent"
					>
						Se alle {inquiryCount}
					</a>
				</div>
				{#each waitingInquiries as inquiry (inquiry.ig)}
					<article class="ds-card" data-color="neutral">
						<div class="inquiry-card">
						<div class="inquiry-header">
							<span class="inquiry-handle">{inquiry.ig}</span>
							<span class="inquiry-age">{inquiry.age}</span>
						</div>
						<p class="ds-paragraph" data-size="sm">{inquiry.text}</p>
						<div class="inquiry-footer">
							{#if inquiry.stale}
								<span class="inquiry-stale">Har ventet lenge</span>
							{/if}
							<a
								class="ds-button"
								data-size="sm"
								data-variant="tertiary"
								data-color="neutral"
								href="https://instagram.com/direct/inbox/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Åpne på Instagram
							</a>
						</div>
						</div>
					</article>
				{/each}
			</section>
		</div>
	</div>
</div>
