<script lang="ts">
	import Icon from "#lib/components/Icon.svelte"
	import NewBookingButton from "#lib/components/NewBookingButton.svelte"
	import NotificationBell from "#lib/components/notifications/NotificationBell.svelte"
	import CalendarLevelSwitcher from "./CalendarLevelSwitcher.svelte"
	import CalendarTitle from "./CalendarTitle.svelte"
	import { formatCalendarTitle } from "./calendarDates.ts"
	import { type CalendarLevel, levelLabels } from "./calendarLevels.ts"

	interface Props {
		level: CalendarLevel
		date: Date
		appointmentCount: number
		onLevelChange: (level: CalendarLevel) => void
		onPrevious: () => void
		onToday: () => void
		onNext: () => void
	}

	let { level, date, appointmentCount, onLevelChange, onPrevious, onToday, onNext }: Props = $props()

	const periodName = $derived(levelLabels[level].toLowerCase())
	const appointmentCountLabel = $derived(`${appointmentCount} ${appointmentCount === 1 ? "avtale" : "avtaler"}`)
	const summary = $derived([formatCalendarTitle(level, date).range, appointmentCountLabel].filter(Boolean).join(" · "))
</script>

<header class="toolbar">
	<div class="title">
		<CalendarTitle {level} {date} />
		<p class="summary">{summary}</p>
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
		gap: 0.75rem;
	}

	.title {
		margin-inline-end: 0.125rem;
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

	.icon-button:hover,
	.today-button:hover {
		border-color: var(--pg-ink);
		background: var(--pg-ink);
		color: #ffffff;
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

		.today-button,
		.bell {
			display: none;
		}

		.icon-button {
			border-radius: 0.625rem;
		}

		.level-switcher {
			flex: 1 0 100%;
			order: 1;
		}
	}
</style>
