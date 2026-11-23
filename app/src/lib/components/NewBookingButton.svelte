<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"

	interface Props {
		iconOnlyOnMobile?: boolean
		isFloatingOnMobile?: boolean
	}

	let { iconOnlyOnMobile = false, isFloatingOnMobile = false }: Props = $props()
</script>

<button type="button" class="new-booking-button" class:icon-only-on-mobile={iconOnlyOnMobile || isFloatingOnMobile} class:is-floating-on-mobile={isFloatingOnMobile} aria-label="Ny booking">
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

		.is-floating-on-mobile {
			position: fixed;
			right: 1rem;
			bottom: calc(var(--pg-bottom-bar-space) + 1rem);
			z-index: 20;
			width: 3.5rem;
			height: 3.5rem;
			border-radius: 50%;
			box-shadow: 0 0.375rem 1rem rgb(20 23 26 / 0.22);
		}
	}
</style>
