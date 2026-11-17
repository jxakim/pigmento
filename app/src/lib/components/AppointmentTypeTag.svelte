<script lang="ts">
	import { appointmentTypeColor } from "#lib/appointmentTypes.ts"
	import type { AppointmentType } from "#lib/sampleData.ts"

	interface Props {
		type: AppointmentType
	}

	let { type }: Props = $props()
</script>

<span class="ds-tag" data-size="sm" data-color={appointmentTypeColor[type]}>{type}</span>
