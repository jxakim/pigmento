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
		headerToolbar: false,
		selectable: true,
		// Et klikk velger én dag, mens å dra musen over flere dager eller timer velger en periode.
		selectMinDistance: 5,
		slotMinTime: "07:00",
		slotMaxTime: "21:00",
		allDaySlot: false,
		expandRows: true
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
		--fc-classic-today: var(--ds-color-neutral-background-tinted);
		height: 100%;
	}

	.full-calendar :global(.selectable-day) {
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.full-calendar :global(.selectable-day:hover),
	.full-calendar :global(.selected-day) {
		background-color: var(--ds-color-neutral-surface-tinted);
	}

	.full-calendar :global(.selected-day) {
		box-shadow: inset 0 0 0 0.125rem var(--ds-color-neutral-border-default);
		border-radius: var(--ds-border-radius-sm);
	}
</style>
