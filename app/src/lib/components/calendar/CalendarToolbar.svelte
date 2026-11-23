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

	/* På mobil er toppen to rader: pilene med «I dag» og perioden i liten tekst, og så visningsvalget. Resten rører man ikke på mobil. */
	@media (max-width: 57.5rem) {
		.toolbar {
			gap: 0.5rem;
		}

		.back-button {
			order: 1;
		}

		.period-navigation {
			order: 2;
			gap: 0.5rem;
			margin-inline-end: 0;
		}

		.title {
			order: 3;
			flex: 1;
			min-width: 0;
			margin-inline-end: 0;
			text-align: right;
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

		.icon-button,
		.today-button {
			border-radius: 0.625rem;
		}

		.level-switcher {
			order: 4;
			flex: 1 0 100%;
		}

		.actions {
			display: none;
		}
	}
</style>
