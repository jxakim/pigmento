<script lang="ts" module>
	const columnsByWindowSize = new Map<string, number>()
	const defaultColumns = 4

	function getWindowSizeKey(): string {
		return `${window.innerWidth}x${window.innerHeight}`
	}

	function getRememberedColumns(): number | undefined {
		const isRunningInBrowser = typeof window !== "undefined"
		return isRunningInBrowser ? columnsByWindowSize.get(getWindowSizeKey()) : undefined
	}
</script>

<script lang="ts">
	import type { Calendar, CalendarOptions, DatesSetInfo } from "fullcalendar"
	import FullCalendar from "./FullCalendar.svelte"

	interface Props {
		date: Date
		onOpenMonth: (month: Date, monthElement: HTMLElement) => void
	}

	let { date, onOpenMonth }: Props = $props()

	let container: HTMLDivElement
	let calendar = $state<Calendar>()
	let firstMonthOfYear = new Date()
	let latestFitAttempt = 0
	let shownColumns = getRememberedColumns() ?? defaultColumns
	let isFindingColumns = $state(false)

	const columnOptions = [1, 2, 3, 4, 6]

	const options: CalendarOptions = {
		initialView: "multiMonthYear",
		selectable: false,
		singleMonthMinWidth: 40,
		multiMonthMaxColumns: shownColumns,
		singleMonthClass: "year-month",
		singleMonthHeaderClass: "year-month-title",
		fixedWeekCount: false,
		dayCellClass: ({ isToday }) => (isToday ? "year-day year-today" : "year-day"),
		datesSet: handleDatesSet
	}

	function handleDatesSet({ view }: DatesSetInfo) {
		firstMonthOfYear = view.currentStart
		requestAnimationFrame(() => {
			makeMonthsAccessible()
			fitAllMonthsInView()
		})
	}

	function getMonthElements(): HTMLElement[] {
		return Array.from(container.querySelectorAll<HTMLElement>(".year-month"))
	}

	function getMonthDate(monthElement: HTMLElement): Date {
		const monthIndex = getMonthElements().indexOf(monthElement)
		return new Date(firstMonthOfYear.getFullYear(), firstMonthOfYear.getMonth() + monthIndex, 1)
	}

	function makeMonthsAccessible() {
		for (const monthElement of getMonthElements()) {
			const monthName = getMonthDate(monthElement).toLocaleDateString("nb-NO", { month: "long", year: "numeric" })
			monthElement.tabIndex = 0
			monthElement.setAttribute("role", "button")
			monthElement.setAttribute("aria-label", `Åpne ${monthName}`)
		}
	}

	function openClickedMonth(event: Event) {
		const monthElement = (event.target as Element).closest<HTMLElement>(".year-month")
		if (!monthElement) {
			return
		}
		event.preventDefault()
		onOpenMonth(getMonthDate(monthElement), monthElement)
	}

	function openMonthOnEnterOrSpace(event: KeyboardEvent) {
		if (event.key === "Enter" || event.key === " ") {
			openClickedMonth(event)
		}
	}

	function isScrollable(element: Element): boolean {
		return ["auto", "scroll"].includes(getComputedStyle(element).overflowY)
	}

	function findMonthScroller(): Element | undefined {
		let element = container.querySelector(".year-month")?.parentElement
		while (element && element !== container) {
			if (isScrollable(element)) {
				return element
			}
			element = element.parentElement
		}
		return undefined
	}

	function hasScrollbar(): boolean {
		const scroller = findMonthScroller()
		return scroller !== undefined && scroller.scrollHeight > scroller.clientHeight + 1
	}

	function waitForRender(): Promise<void> {
		return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
	}

	async function showColumns(columns: number) {
		shownColumns = columns
		calendar?.setOption("multiMonthMaxColumns", columns)
		await waitForRender()
	}

	async function fitAllMonthsInView() {
		const rememberedColumns = getRememberedColumns()
		if (rememberedColumns === undefined) {
			await findColumnsThatFit()
		} else if (rememberedColumns !== shownColumns) {
			await showColumns(rememberedColumns)
		}
	}

	// Prøver seg frem (skjult): flere kolonner til alt får plass, deretter færre så lenge alt fortsatt får plass.
	async function findColumnsThatFit() {
		const fitAttempt = ++latestFitAttempt
		const isOutdated = () => fitAttempt !== latestFitAttempt
		const windowSizeKey = getWindowSizeKey()
		let index = columnOptions.indexOf(shownColumns)
		isFindingColumns = true

		while (hasScrollbar() && index < columnOptions.length - 1) {
			index++
			await showColumns(columnOptions[index])
			if (isOutdated()) {
				return
			}
		}

		while (!hasScrollbar() && index > 0) {
			await showColumns(columnOptions[index - 1])
			if (isOutdated()) {
				return
			}
			if (hasScrollbar()) {
				await showColumns(columnOptions[index])
				break
			}
			index--
		}

		columnsByWindowSize.set(windowSizeKey, columnOptions[index])
		isFindingColumns = false
	}

	$effect(() => {
		if (!calendar) {
			return
		}
		const resizeObserver = new ResizeObserver(fitAllMonthsInView)
		resizeObserver.observe(container)
		return () => resizeObserver.disconnect()
	})
</script>

<!-- svelte-ignore a11y_no_static_element_interactions (månedene inni har role="button") -->
<div class="year-view" class:is-finding-columns={isFindingColumns} bind:this={container} onclick={openClickedMonth} onkeydown={openMonthOnEnterOrSpace}>
	<FullCalendar {options} {date} bind:calendar />
</div>

<style>
	.year-view {
		height: 100%;
	}

	.year-view.is-finding-columns :global(.year-month) {
		visibility: hidden;
	}

	.year-view :global(.year-month) {
		container-type: inline-size;
		margin: 0.25rem 0.25rem 0;
		padding: 0.5rem;
		cursor: pointer;
		border-radius: 0.5rem;
		transition: background-color 0.15s ease;
	}

	/* Teksten skaleres med månedens bredde (cqi), så tosifrede datoer alltid får plass i rutene sine. */
	.year-view :global(.year-month *) {
		pointer-events: none;
		margin: 0;
		padding: 0;
		font-size: clamp(0.5rem, 9.5cqi, 1rem);
		line-height: 1.15;
		background: none;
	}

	.year-view :global(.year-day),
	.year-view :global(.year-day *) {
		justify-content: center;
		text-align: center;
	}

	.year-view :global(.year-month-title),
	.year-view :global(.year-month-title *) {
		padding-bottom: 0.125rem;
		font-size: clamp(0.8rem, 14cqi, 1.2rem);
		line-height: 1.3;
	}

	@media (max-width: 57.5rem) {
		.year-view :global(.year-month) {
			margin: 0.25rem 0.25rem 0;
			padding: 0.375rem;
		}

		.year-view :global(.year-month *) {
			border: none;
		}
	}

	@media (max-width: 23rem) {
		.year-view :global(.year-month) {
			margin: 0.125rem 0.125rem 0;
			padding: 0.25rem;
		}

		.year-view :global(.year-month-title),
		.year-view :global(.year-month-title *) {
			padding-bottom: 0;
		}
	}

	.year-view :global(.year-today) {
		background: var(--ds-color-accent-surface-tinted);
		border-radius: 0.25rem;
		font-weight: 700;
	}

	.year-view :global(.year-month:hover) {
		background-color: var(--ds-color-accent-surface-tinted);
	}

	.year-view :global(.year-month:focus-visible) {
		outline: 0.125rem solid var(--ds-color-accent-border-default);
		outline-offset: 0.125rem;
	}
</style>
