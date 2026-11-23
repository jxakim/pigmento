<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"

	interface Props {
		iconOnlyOnMobile?: boolean
		isRoundOnMobile?: boolean
	}

	let { iconOnlyOnMobile = false, isRoundOnMobile = false }: Props = $props()
</script>

<button type="button" class="new-booking-button" class:icon-only-on-mobile={iconOnlyOnMobile || isRoundOnMobile} class:is-round-on-mobile={isRoundOnMobile} aria-label="Ny booking">
	<Icon name="add" />
	<span class="label">Ny booking</span>
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
		white-space: nowrap;
		cursor: pointer;
	}

	@media (hover: hover) {
		.new-booking-button:hover {
			background: var(--pg-pink-hover);
		}
	}

	@media (max-width: 57.5rem) {
		.icon-only-on-mobile {
			justify-content: center;
			width: 2.75rem;
			padding: 0;
			border-radius: 0.625rem;
		}

		.icon-only-on-mobile .label {
			display: none;
		}

		.is-round-on-mobile {
			flex: none;
			width: 3.5rem;
			height: 3.5rem;
			border-radius: 50%;
		}
	}
</style>
