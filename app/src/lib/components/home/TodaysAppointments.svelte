<script lang="ts">
	import PageSection from "#lib/components/PageSection.svelte"
	import { todaysAppointments } from "#lib/sampleData.ts"
	import AppointmentCard from "./AppointmentCard.svelte"
</script>

<PageSection id="todays-appointments" title="I dag" link={{ href: "/calendar", label: "Åpne kalender" }}>
	{#each todaysAppointments as appointment (appointment.startTime)}
		<AppointmentCard {appointment} />
	{/each}
</PageSection>
