<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import NewBookingButton from "#lib/components/NewBookingButton.svelte"
	import NotificationBell from "#lib/components/notifications/NotificationBell.svelte"
	import CalendarLevelSwitcher from "./CalendarLevelSwitcher.svelte"
	import CalendarTitle from "./CalendarTitle.svelte"
	import { formatCompactPeriod } from "./calendarDates.ts"
	import { type CalendarLevel, levelLabels } from "./calendarLevels.ts"
	import WorkHoursToggle from "./WorkHoursToggle.svelte"

	interface Props {
		level: CalendarLevel
		date: Date
		isWorkHoursVisible: boolean
		onLevelChange: (level: CalendarLevel) => void
		onPrevious: () => void
		onToday: () => void
		onNext: () => void
		onToggleWorkHours: () => void
		onBack?: () => void
	}

	let { level, date, isWorkHoursVisible, onLevelChange, onPrevious, onToday, onNext, onToggleWorkHours, onBack }: Props = $props()

	const periodName = $derived(levelLabels[level].toLowerCase())
</script>

<header class="toolbar">
	{#if onBack}
		<button type="button" class="icon-button back-button" aria-label="Tilbake" onclick={onBack}>
			<Icon name="arrow_back" />
		</button>
	{/if}

	<div class="title">
		<CalendarTitle {level} {date} />
		<p class="compact-title" aria-hidden="true">{formatCompactPeriod(level, date)}</p>
	</div>

	<div class="period-navigation">
		<button type="button" class="icon-button" aria-label="Forrige {periodName}" onclick={onPrevious}>
			<Icon name="chevron_left" />
		</button>
		<button type="button" class="today-button" onclick={onToday}>I dag</button>
		<button type="button" class="icon-button" aria-label="Neste {periodName}" onclick={onNext}>
			<Icon name="chevron_right" />
		</button>
	</div>

	<div class="level-switcher">
		<CalendarLevelSwitcher {level} {onLevelChange} />
	</div>

	<div class="actions">
		<WorkHoursToggle isPressed={isWorkHoursVisible} onToggle={onToggleWorkHours} />
		<NotificationBell />
		<NewBookingButton iconOnlyOnMobile />
	</div>
</header>

<style>
	.toolbar,
	.period-navigation,
	.actions {
		display: flex;
		align-items: center;
	}

	.toolbar {
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.title {
		margin-inline-end: 0.125rem;
	}

	.compact-title {
		display: none;
	}

	.period-navigation {
		gap: 0.375rem;
		margin-inline-end: auto;
	}

	.actions {
		gap: 0.75rem;
		margin-inline-start: auto;
	}

	.icon-button,
	.today-button {
		display: grid;
		place-items: center;
		height: 2.75rem;
		border: 0.0625rem solid var(--pg-button-border);
		border-radius: var(--pg-button-radius);
		background: var(--pg-card);
		color: var(--pg-ink);
		font-family: var(--pg-font-body);
		white-space: nowrap;
		cursor: pointer;
	}

	.icon-button {
		width: 2.75rem;
		padding: 0;
	}

	.today-button {
		padding: 0 1rem;
		font-size: 0.875rem;
		font-weight: 600;
	}

	@media (hover: hover) {
		.icon-button:hover,
		.today-button:hover {
			border-color: var(--pg-ink);
			background: var(--pg-ink);
			color: #ffffff;
		}
	}

	/* På mobil er toppen to rader: perioden i midten med «I dag» til høyre, og så visningsvalget. Man blar med sveip, så pilene er ikke med. */
	@media (max-width: 57.5rem) {
		.toolbar {
			display: grid;
			grid-template-columns: 4rem minmax(0, 1fr) 4rem;
			gap: 0.5rem;
		}

		.back-button {
			grid-column: 1;
			grid-row: 1;
			justify-self: start;
		}

		.title {
			grid-column: 2;
			grid-row: 1;
			margin-inline-end: 0;
			text-align: center;
		}

		.title :global(.calendar-title) {
			position: absolute;
			width: 0.0625rem;
			height: 0.0625rem;
			overflow: hidden;
			clip-path: inset(50%);
		}

		.compact-title {
			display: block;
			font-family: var(--pg-font-heading);
			font-size: 1.1875rem;
			font-weight: 700;
			letter-spacing: -0.01em;
			line-height: 1.15;
		}

		.period-navigation {
			display: contents;
		}

		.period-navigation .icon-button {
			display: none;
		}

		.today-button {
			grid-column: 3;
			grid-row: 1;
			justify-self: end;
			padding: 0 0.875rem;
			border-radius: 0.625rem;
		}

		.back-button {
			border-radius: 0.625rem;
		}

		.level-switcher {
			grid-column: 1 / -1;
			grid-row: 2;
		}

		.actions {
			display: none;
		}
	}
</style>
