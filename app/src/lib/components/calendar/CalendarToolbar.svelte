<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import NewBookingButton from "#lib/components/NewBookingButton.svelte"
	import NotificationBell from "#lib/components/notifications/NotificationBell.svelte"
	import CalendarLevelSwitcher from "./CalendarLevelSwitcher.svelte"
	import CalendarTitle from "./CalendarTitle.svelte"
	import { formatCalendarTitle } from "./calendarDates.ts"
	import { type CalendarLevel, levelLabels } from "./calendarLevels.ts"
	import WorkHoursToggle from "./WorkHoursToggle.svelte"

	interface Props {
		level: CalendarLevel
		date: Date
		appointmentCount: number
		isWorkHoursVisible: boolean
		onLevelChange: (level: CalendarLevel) => void
		onPrevious: () => void
		onToday: () => void
		onNext: () => void
		onToggleWorkHours: () => void
		onBack?: () => void
	}

	let { level, date, appointmentCount, isWorkHoursVisible, onLevelChange, onPrevious, onToday, onNext, onToggleWorkHours, onBack }: Props = $props()

	const periodName = $derived(levelLabels[level].toLowerCase())
	const appointmentCountLabel = $derived(`${appointmentCount} ${appointmentCount === 1 ? "avtale" : "avtaler"}`)
	const summary = $derived([formatCalendarTitle(level, date).range, appointmentCountLabel].filter(Boolean).join(" · "))
</script>

<header class="toolbar" class:has-back-button={onBack}>
	{#if onBack}
		<button type="button" class="icon-button" aria-label="Tilbake" onclick={onBack}>
			<Icon name="arrow_back" />
		</button>
	{/if}

	<div class="title">
		<CalendarTitle {level} {date} />
		<p class="summary">{summary}</p>
	</div>

	<div class="period-navigation">
		<button type="button" class="icon-button" aria-label="Forrige {periodName}" onclick={onPrevious}>
			<Icon name="chevron_left" />
		</button>
		<button type="button" class="today-button" onclick={onToday}>
			<span class="today-icon"><Icon name="today" /></span>
			<span class="today-label">I dag</span>
		</button>
		<button type="button" class="icon-button" aria-label="Neste {periodName}" onclick={onNext}>
			<Icon name="chevron_right" />
		</button>
	</div>

	<div class="level-switcher">
		<div class="level-switcher-control">
			<CalendarLevelSwitcher {level} {onLevelChange} />
		</div>
		<div class="mobile-work-hours-toggle">
			<WorkHoursToggle isPressed={isWorkHoursVisible} onToggle={onToggleWorkHours} />
		</div>
	</div>

	<div class="actions">
		<div class="desktop-work-hours-toggle">
			<WorkHoursToggle isPressed={isWorkHoursVisible} onToggle={onToggleWorkHours} />
		</div>
		<div class="bell">
			<NotificationBell />
		</div>
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

	.mobile-work-hours-toggle,
	.today-icon {
		display: none;
	}

	.summary {
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

	/* På mobil står tittelen og knappene på en rad, og visningsvalget får en rad for seg selv. */
	@media (max-width: 57.5rem) {
		.toolbar {
			flex-wrap: wrap;
			gap: 0.5rem;
		}

		.title {
			flex: 1;
			min-width: 0;
		}

		.summary {
			display: block;
			color: var(--pg-ink-muted);
			font-size: 0.8125rem;
		}

		.period-navigation {
			gap: 0.5rem;
			margin-inline-end: 0;
		}

		.bell,
		.desktop-work-hours-toggle {
			display: none;
		}

		.has-back-button .today-button {
			display: none;
		}

		.has-back-button .title :global(.calendar-title) {
			font-size: 1.125rem;
		}

		.today-button {
			width: 2.75rem;
			padding: 0;
			border-radius: 0.625rem;
		}

		.today-icon {
			display: block;
		}

		.today-label {
			position: absolute;
			width: 0.0625rem;
			height: 0.0625rem;
			overflow: hidden;
			clip-path: inset(50%);
		}

		.title {
			overflow: hidden;
		}

		.icon-button {
			border-radius: 0.625rem;
		}

		.level-switcher {
			display: flex;
			flex: 1 0 100%;
			gap: 0.5rem;
			order: 1;
		}

		.level-switcher-control {
			flex: 1;
			min-width: 0;
		}

		.mobile-work-hours-toggle {
			display: block;
		}
	}
</style>
