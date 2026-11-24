<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"

	interface Props {
		isPressed: boolean
		onToggle: () => void
	}

	let { isPressed, onToggle }: Props = $props()
</script>

<button type="button" class="work-hours-toggle" aria-pressed={isPressed} onclick={onToggle}>
	<Icon name="schedule" />
	<span class="label">Arbeidstid</span>
</button>

<style>
	.work-hours-toggle {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.75rem;
		padding: 0 0.875rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: 62.5rem;
		background: var(--pg-card);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
	}

	.work-hours-toggle[aria-pressed="true"] {
		border-color: var(--pg-pink);
		background: var(--pg-pink);
	}

	@media (max-width: 90rem) {
		.work-hours-toggle {
			padding: 0 0.75rem;
		}

		.label {
			position: absolute;
			width: 0.0625rem;
			height: 0.0625rem;
			overflow: hidden;
			clip-path: inset(50%);
		}
	}

	@media (hover: hover) {
		.work-hours-toggle:hover {
			border-color: var(--pg-ink);
		}
	}
</style>
