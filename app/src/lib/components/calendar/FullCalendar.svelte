<script lang="ts">
	import { Calendar, type CalendarOptions } from "fullcalendar"
	import dayGridPlugin from "fullcalendar/daygrid"
	import interactionPlugin from "fullcalendar/interaction"
	import norwegianLocale from "fullcalendar/locales/nb"
	import classicThemePlugin from "fullcalendar/themes/classic"
	import timeGridPlugin from "fullcalendar/timegrid"
	import { untrack } from "svelte"
	import { calendarAppearance } from "./calendarAppearance.ts"

	import "fullcalendar/skeleton.css"
	import "fullcalendar/themes/classic/theme.css"
	import "fullcalendar/themes/classic/palette.css"
	import "./calendarTheme.css"

	interface Props {
		options: CalendarOptions
		date: Date
		calendar?: Calendar
	}

	let { options, date, calendar = $bindable() }: Props = $props()

	let element: HTMLDivElement

	const sharedOptions: CalendarOptions = {
		plugins: [classicThemePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin],
		locale: norwegianLocale,
		height: "100%",
		borderless: true,
		headerToolbar: false,
		selectable: true,
		// Et klikk velger én dag, mens å dra musen over flere dager eller timer velger en periode.
		selectMinDistance: 5,
		slotMinTime: "07:00",
		slotMaxTime: "19:00",
		slotDuration: "01:00",
		slotHeaderFormat: { hour: "2-digit", minute: "2-digit", hour12: false },
		allDaySlot: false,
		expandRows: true,
		...calendarAppearance
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
</style>
