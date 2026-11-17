<script lang="ts" module>
	export type DayAction = "add-booking" | "add-note" | "block-day" | "open-day"
</script>

<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"

	interface Props {
		day: Date
		position: { x: number; y: number }
		canOpenDay: boolean
		onSelect: (action: DayAction, day: Date) => void
		onClose: () => void
	}

	let { day, position, canOpenDay, onSelect, onClose }: Props = $props()

	interface MenuItem {
		action: DayAction
		label: string
		icon: string
	}

	const allMenuItems: MenuItem[] = [
		{ action: "add-booking", label: "Legg til booking", icon: "add" },
		{ action: "add-note", label: "Legg til notat", icon: "edit_note" },
		{ action: "block-day", label: "Blokker dagen", icon: "block" },
		{ action: "open-day", label: "Åpne dagen", icon: "today" }
	]

	let menu: HTMLDivElement

	const menuItems = $derived(canOpenDay ? allMenuItems : allMenuItems.filter((item) => item.action !== "open-day"))

	const dayLabel = $derived(day.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" }))

	const screenEdgeMargin = 8

	$effect(() => {
		if (!menu.matches(":popover-open")) {
			menu.showPopover()
		}
		const { width, height } = menu.getBoundingClientRect()
		menu.style.left = `${Math.min(position.x, window.innerWidth - width - screenEdgeMargin)}px`
		menu.style.top = `${Math.min(position.y, window.innerHeight - height - screenEdgeMargin)}px`
		menu.querySelector("button")?.focus()
	})

	function closeWhenDismissed(event: ToggleEvent) {
		if (event.newState === "closed") {
			onClose()
		}
	}
</script>

<div class="ds-dropdown day-menu" popover="auto" aria-label="Valg for {dayLabel}" bind:this={menu} ontoggle={closeWhenDismissed}>
	<span class="day-label">{dayLabel}</span>
	<ul>
		{#each menuItems as item (item.action)}
			<li>
				<button type="button" class="ds-button" data-variant="tertiary" data-color="neutral" onclick={() => onSelect(item.action, day)}>
					<Icon name={item.icon} />
					{item.label}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style>
	.day-menu {
		position: fixed;
		inset: auto;
		margin: 0;
	}

	.day-label {
		display: block;
		padding: 0.5rem 0.75rem 0.25rem;
		color: var(--ds-color-neutral-text-subtle);
		font-size: 0.875rem;
	}

	.day-label::first-letter {
		text-transform: uppercase;
	}
</style>
