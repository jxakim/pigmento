<script lang="ts">
	import { formatDayCount, notificationSettings } from "#lib/notificationSettings.svelte.ts"

	const shortDayOptions = [1, 2, 3, 5, 7]
	const aftercareDayOptions = [7, 14, 28]
</script>

<section class="settings" aria-labelledby="notification-settings-title">
	<h2 id="notification-settings-title">Når skal jeg varsle deg?</h2>

	<div class="setting">
		<label class="setting-text" for="inquiry-wait-days">
			<span class="setting-label">Forespørsel uten svar</span>
			<span class="setting-help">Varsle etter</span>
		</label>
		<select id="inquiry-wait-days" class="setting-select" bind:value={notificationSettings.inquiryWaitDays}>
			{#each shortDayOptions as days (days)}
				<option value={days}>{formatDayCount(days)}</option>
			{/each}
		</select>
	</div>

	<div class="setting">
		<label class="setting-text" for="deposit-lead-days">
			<span class="setting-label">Depositum mangler</span>
			<span class="setting-help">Varsle før timen</span>
		</label>
		<select id="deposit-lead-days" class="setting-select" bind:value={notificationSettings.depositLeadDays}>
			{#each shortDayOptions as days (days)}
				<option value={days}>{formatDayCount(days)}</option>
			{/each}
		</select>
	</div>

	<div class="setting">
		<label class="setting-text" for="aftercare-days">
			<span class="setting-label">Oppfølging etter tatovering</span>
			<span class="setting-help">Minn meg om etterstell etter</span>
		</label>
		<select id="aftercare-days" class="setting-select" bind:value={notificationSettings.aftercareDays}>
			{#each aftercareDayOptions as days (days)}
				<option value={days}>{formatDayCount(days)}</option>
			{/each}
		</select>
	</div>

	<div class="setting">
		<label class="setting-text" for="evening-summary">
			<span class="setting-label">Kveldsoppsummering</span>
			<span class="setting-help">Morgendagens timer kl. 18:00</span>
		</label>
		<input id="evening-summary" class="setting-switch" type="checkbox" bind:checked={notificationSettings.sendEveningSummary} />
	</div>

	<div class="setting is-unavailable">
		<label class="setting-text" for="push-notifications">
			<span class="setting-label">Push på mobilen</span>
			<span class="setting-help">Kommer i en senere versjon</span>
		</label>
		<input id="push-notifications" class="setting-switch" type="checkbox" disabled />
	</div>
</section>

<style>
	.settings {
		display: flex;
		flex-direction: column;
		gap: 1.125rem;
		padding: 1.25rem;
		border: 0.0625rem solid var(--pg-card-border);
		border-radius: var(--pg-card-radius);
		background: var(--pg-card);
	}

	h2 {
		font-size: 1.125rem;
		font-weight: 700;
	}

	.setting {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.is-unavailable {
		opacity: 0.6;
	}

	.setting-text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.setting-label {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.setting-help {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
	}

	.setting-select {
		min-height: 2.5rem;
		padding: 0 0.625rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.875rem;
	}

	.setting-switch {
		width: 1.25rem;
		height: 1.25rem;
		accent-color: var(--pg-pink-deep);
	}
</style>
