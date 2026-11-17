<script lang="ts">
	import type { AppointmentType } from "#lib/sampleData.ts"

	interface Props {
		type: AppointmentType
	}

	let { type }: Props = $props()

	const colorByType: Record<AppointmentType, string> = {
		Konsultasjon: "info",
		Tatovering: "neutral",
		"Touch-up": "warning"
	}
</script>

<span class="ds-tag" data-size="sm" data-color={colorByType[type]}>{type}</span>
