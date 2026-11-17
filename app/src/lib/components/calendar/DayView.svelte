<script lang="ts">
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
	}

	let { date }: Props = $props()
</script>

<FullCalendar options={{ initialView: "timeGridDay" }} {date} />
