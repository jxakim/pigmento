<script lang="ts">
	import { inquiryCount, today, todayLabel, typeClass, upcomingDays, waitingInquiries } from "../lib/sample-data"
</script>

<div class="page">
	<header class="page-header">
		<div class="intro">
			<h1>God morgen</h1>
			<p class="sub">{todayLabel} · {today.length} timer i dag · {inquiryCount} venter på svar</p>
		</div>
		<button class="ds-button new-booking" type="button">
			<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
			Ny booking
		</button>
	</header>

	<div class="columns">
		<div class="column column-main">
			<section class="section" aria-labelledby="idag">
				<div class="section-header">
					<h2 id="idag">I dag</h2>
					<a class="small-link" href="/kalender">Åpne kalender</a>
				</div>
				<div class="stack">
					{#each today as appointment (appointment.start)}
						<article class="card appointment">
							<div class="time">
								<span class="time-start">{appointment.start}</span>
								<span class="time-end">til {appointment.end}</span>
							</div>
							<div class="who">
								<span class="client">{appointment.client}</span>
								<span class="note">{appointment.note}</span>
							</div>
							<span class="chip {typeClass[appointment.type]}">{appointment.type}</span>
						</article>
					{/each}
				</div>
			</section>

			<section class="section" aria-labelledby="kommende">
				<h2 id="kommende">Kommende dager</h2>
				<div class="card days">
					{#each upcomingDays as day (day.label)}
						<div class="day">
							<div class="day-label">{day.label}</div>
							<ul class="day-items">
								{#each day.items as item (item.start)}
									<li class="day-item">
										<span class="item-time">{item.start}</span>
										<span class="item-client">{item.client}</span>
										<span class="chip {typeClass[item.type]}">{item.type}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/each}
				</div>
			</section>
		</div>

		<div class="column column-side">
			<section class="section" aria-labelledby="venter">
				<div class="section-header">
					<h2 id="venter">Venter på svar</h2>
					<a class="small-link" href="/foresporsler">Se alle {inquiryCount}</a>
				</div>
				<div class="stack">
					{#each waitingInquiries as inquiry (inquiry.ig)}
						<article class="card inquiry">
							<div class="inquiry-top">
								<span class="ig">{inquiry.ig}</span>
								<span class="age">{inquiry.age}</span>
							</div>
							<p class="inquiry-text">{inquiry.text}</p>
							<div class="inquiry-bottom">
								{#if inquiry.stale}
									<span class="stale">Har ventet lenge</span>
								{/if}
								<a class="reply" href="https://instagram.com/direct/inbox/" target="_blank" rel="noopener noreferrer">Åpne på Instagram</a>
							</div>
						</article>
					{/each}
				</div>
			</section>
		</div>
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 36px;
	}

	.page-header {
		display: flex;
		flex-wrap: wrap;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
	}

	.intro {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	h1 {
		font-size: 40px;
		line-height: 1.1;
		font-weight: 700;
		letter-spacing: -0.02em;
	}

	.sub {
		font-size: 16px;
		color: var(--pg-ink-muted);
	}

	/* Primærknappen er Designsystemets knapp i rosa tema; kun form og størrelse justeres */
	.new-booking {
		min-height: 44px;
		padding: 0 18px;
		border-radius: 8px;
		font-size: 15px;
		font-weight: 600;
	}

	.columns {
		display: flex;
		flex-wrap: wrap;
		gap: 40px;
		align-items: flex-start;
	}

	.column {
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 36px;
	}

	.column-main {
		flex: 3 1 440px;
	}

	.column-side {
		flex: 2 1 300px;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 14px;
	}

	.section-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
	}

	h2 {
		font-size: 24px;
		font-weight: 700;
	}

	.small-link {
		font-size: 14px;
		font-weight: 600;
	}

	.stack {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.card {
		background: var(--pg-card);
		border: 1px solid var(--pg-card-border);
		border-radius: 14px;
	}

	/* I dag */
	.appointment {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 12px 20px;
		padding: 16px 20px;
	}

	.time {
		flex: 0 0 76px;
		padding: 8px 0;
		border-radius: 10px;
		background: var(--pg-pink-tint);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time-start {
		font-family: var(--pg-font-heading);
		font-size: 22px;
		font-weight: 700;
	}

	.time-end {
		font-size: 12px;
		color: var(--pg-ink-muted);
	}

	.who {
		flex: 1 1 200px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.client {
		font-size: 17px;
		font-weight: 600;
	}

	.note {
		font-size: 14px;
		color: var(--pg-ink-muted);
	}

	/* Kommende dager */
	.days {
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.day {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 20px;
		padding: 16px 20px;
		border-top: 1px solid var(--pg-row-line);
	}

	.day-label {
		flex: 0 0 120px;
		font-size: 14px;
		font-weight: 600;
	}

	.day-items {
		flex: 1 1 240px;
		min-width: 0;
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.day-item {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px 14px;
	}

	.item-time {
		flex: 0 0 48px;
		font-size: 15px;
		font-weight: 600;
	}

	.item-client {
		flex: 1 1 140px;
		font-size: 15px;
	}

	/* Venter på svar */
	.inquiry {
		padding: 18px 20px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.inquiry-top {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 4px 12px;
	}

	.ig {
		font-size: 16px;
		font-weight: 600;
	}

	.age {
		font-size: 13px;
		color: var(--pg-ink-muted);
	}

	.inquiry-text {
		font-size: 14px;
		line-height: 1.5;
		color: #2b2f38;
	}

	.inquiry-bottom {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: flex-end;
		gap: 8px;
	}

	.stale {
		margin-right: auto;
		font-size: 13px;
		font-weight: 600;
		color: var(--pg-pink-deep);
	}

	.reply {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 44px;
		padding: 0 14px;
		border-radius: 8px;
		border: 1px solid var(--pg-button-border);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-size: 14px;
		font-weight: 600;
		text-decoration: none;
	}

	.reply:hover {
		background: var(--pg-ink);
		border-color: var(--pg-ink);
		color: #ffffff;
	}
</style>
