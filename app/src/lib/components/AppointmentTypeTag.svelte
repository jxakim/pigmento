<script lang="ts">
	import { type AppointmentType, appointmentTypeDetails } from "#lib/appointmentTypes.ts"

	interface Props {
		type: AppointmentType
	}

	let { type }: Props = $props()
</script>

<span class="type-tag" style:background={appointmentTypeDetails[type].background} style:color={appointmentTypeDetails[type].text}>{appointmentTypeDetails[type].label}</span>

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
