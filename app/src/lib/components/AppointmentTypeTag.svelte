<script lang="ts">
	import { appointmentTypeStyle } from "#lib/appointmentTypes.ts"
	import type { AppointmentType } from "#lib/sampleData.ts"

	interface Props {
		type: AppointmentType
	}

	let { type }: Props = $props()
</script>

<span class="type-tag" style:background={appointmentTypeStyle[type].background} style:color={appointmentTypeStyle[type].text}>{type}</span>

<style>
	.type-tag {
		display: inline-block;
		padding: 0.25rem 0.625rem;
		border-radius: 62.5rem;
		font-size: 0.75rem;
		font-weight: 600;
		white-space: nowrap;
	}
</style>
