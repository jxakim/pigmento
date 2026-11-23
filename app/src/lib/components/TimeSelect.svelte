<script lang="ts">
	interface Props {
		label: string
		value: string
		options: string[]
		isLabelHidden?: boolean
		onChange: (time: string) => void
	}

	let { label, value, options, isLabelHidden = false, onChange }: Props = $props()

	const id = $props.id()
</script>

<div class="time-select">
	<label class="label" class:is-hidden={isLabelHidden} for={id}>{label}</label>
	<select {id} {value} onchange={(event) => onChange(event.currentTarget.value)}>
		{#each options as time (time)}
			<option value={time}>{time}</option>
		{/each}
	</select>
</div>

<style>
	.time-select {
		display: flex;
		flex-direction: column;
		gap: 0.375rem;
		min-width: 0;
	}

	.label {
		color: var(--pg-ink-muted);
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		text-transform: uppercase;
	}

	.is-hidden {
		position: absolute;
		width: 0.0625rem;
		height: 0.0625rem;
		overflow: hidden;
		clip-path: inset(50%);
	}

	select {
		min-height: 2.75rem;
		padding: 0 0.625rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		font-size: 0.875rem;
	}

	@media (max-width: 57.5rem) {
		select {
			font-size: 1rem;
		}
	}
</style>
