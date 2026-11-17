<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
</script>

<button type="button" class="new-booking-button">
	<Icon name="add" />
	Ny booking
</button>

<style>
	.new-booking-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.75rem;
		padding: 0 1.125rem;
		border: 0;
		border-radius: var(--pg-button-radius);
		background: var(--pg-pink);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.9375rem;
		font-weight: 600;
		cursor: pointer;
	}

	.new-booking-button:hover {
		background: var(--pg-pink-hover);
	}
</style>
