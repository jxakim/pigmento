<script lang="ts">
	import { formatDayCount, notificationSettings } from "#lib/notificationSettings.svelte.ts"

	const shortDayOptions = [1, 2, 3, 5, 7]
	const aftercareDayOptions = [7, 14, 28]
</script>

<section class="ds-card settings" data-color="neutral" aria-labelledby="notification-settings-title">
	<h2 id="notification-settings-title" class="ds-heading" data-size="2xs">Når skal jeg varsle deg?</h2>

	<ds-field class="ds-field">
		<label for="inquiry-wait-days">Forespørsel uten svar</label>
		<p data-field="description">Varsle etter</p>
		<select id="inquiry-wait-days" class="ds-input" bind:value={notificationSettings.inquiryWaitDays}>
			{#each shortDayOptions as days (days)}
				<option value={days}>{formatDayCount(days)}</option>
			{/each}
		</select>
	</ds-field>

	<ds-field class="ds-field">
		<label for="deposit-lead-days">Depositum mangler</label>
		<p data-field="description">Varsle før timen</p>
		<select id="deposit-lead-days" class="ds-input" bind:value={notificationSettings.depositLeadDays}>
			{#each shortDayOptions as days (days)}
				<option value={days}>{formatDayCount(days)}</option>
			{/each}
		</select>
	</ds-field>

	<ds-field class="ds-field">
		<label for="aftercare-days">Oppfølging etter tatovering</label>
		<p data-field="description">Minn meg om etterstell etter</p>
		<select id="aftercare-days" class="ds-input" bind:value={notificationSettings.aftercareDays}>
			{#each aftercareDayOptions as days (days)}
				<option value={days}>{formatDayCount(days)}</option>
			{/each}
		</select>
	</ds-field>

	<ds-field class="ds-field">
		<input id="evening-summary" type="checkbox" role="switch" class="ds-input" bind:checked={notificationSettings.sendEveningSummary} />
		<label for="evening-summary">Kveldsoppsummering</label>
		<p data-field="description">Morgendagens timer kl. 18:00</p>
	</ds-field>

	<ds-field class="ds-field">
		<input id="push-notifications" type="checkbox" role="switch" class="ds-input" disabled />
		<label for="push-notifications">Push på mobilen</label>
		<p data-field="description">Kommer i en senere versjon</p>
	</ds-field>
</section>

<style>
	.settings {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}
</style>
