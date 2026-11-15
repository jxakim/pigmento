<script lang="ts">
	import { Calendar, type CalendarOptions } from "fullcalendar"
	import dayGridPlugin from "fullcalendar/daygrid"
	import interactionPlugin from "fullcalendar/interaction"
	import norwegianLocale from "fullcalendar/locales/nb"
	import multiMonthPlugin from "fullcalendar/multimonth"
	import classicThemePlugin from "fullcalendar/themes/classic"
	import timeGridPlugin from "fullcalendar/timegrid"
	import { untrack } from "svelte"

	import "fullcalendar/skeleton.css"
	import "fullcalendar/themes/classic/theme.css"
	import "fullcalendar/themes/classic/palette.css"

	interface Props {
		options: CalendarOptions
		date: Date
		calendar?: Calendar
	}

	let { options, date, calendar = $bindable() }: Props = $props()

	let element: HTMLDivElement

	const sharedOptions: CalendarOptions = {
		plugins: [classicThemePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin],
		locale: norwegianLocale,
		height: "100%",
		headerToolbar: false
	}

	$effect(() => {
		const instance = new Calendar(element, {
			...sharedOptions,
			...untrack(() => options),
			initialDate: untrack(() => date)
		})
		instance.render()
		calendar = instance

		return () => {
			instance.destroy()
			calendar = undefined
		}
	})

	$effect(() => {
		calendar?.gotoDate(date)
	})
</script>

<div class="full-calendar" bind:this={element}></div>

<style>
	.full-calendar {
		height: 100%;
	}

	.full-calendar :global(.selected-day) {
		background: var(--ds-color-accent-surface-tinted);
		box-shadow: inset 0 0 0 2px var(--ds-color-accent-border-default);
		border-radius: 0.25rem;
	}
</style>
