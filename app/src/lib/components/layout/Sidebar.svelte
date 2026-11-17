<script lang="ts">
	import SidebarNavigation from "./SidebarNavigation.svelte"

	interface Props {
		isOpen: boolean
		onClose: () => void
	}

	let { isOpen, onClose }: Props = $props()
</script>

<button type="button" class="backdrop" class:is-visible={isOpen} tabindex="-1" aria-label="Lukk meny" onclick={onClose}></button>

<aside id="sidebar" class="sidebar" class:is-open={isOpen} data-color-scheme="dark" data-color="neutral">
	<div class="logo">
		<img src="/logo.png" alt="" width="52" height="52" />
		<span class="app-name">Pigmento</span>
	</div>

	<SidebarNavigation />

	<div class="user">
		<span class="user-name">Studio</span>
		<span class="user-role">Innlogget som eier</span>
	</div>
</aside>

<style>
	.sidebar {
		display: flex;
		flex: 1 1 20rem;
		flex-direction: column;
		gap: 0.625rem;
		padding: 1rem 0.75rem;
		background: var(--ds-color-neutral-background-default);
		color: var(--ds-color-neutral-text-default);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 0.5rem;
	}

	.logo img {
		border-radius: 50%;
		object-fit: cover;
	}

	.app-name {
		font-family: var(--pg-font-heading);
		font-size: 1.5rem;
		font-weight: 700;
	}

	.user {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: auto;
		padding: 0.8rem 0.5rem 0;
		border-top: 0.0625rem solid var(--ds-color-neutral-border-subtle);
	}

	.user-name {
		font-size: 0.8em;
		font-weight: 600;
	}

	.user-role {
		font-size: 0.7em;
		color: var(--ds-color-neutral-text-subtle);
	}

	.backdrop {
		display: none;
	}

	/* På mobil glir menyen inn over innholdet, med en mørk bakgrunn bak som lukker den ved klikk. */
	@media (max-width: 57.5rem) {
		.sidebar {
			position: fixed;
			top: var(--pg-topbar-height);
			bottom: 0;
			left: 0;
			z-index: 20;
			width: min(20rem, 85vw);
			overflow-y: auto;
			transform: translateX(-100%);
			visibility: hidden;
			transition:
				transform 0.25s ease,
				visibility 0.25s;
		}

		.sidebar.is-open {
			transform: none;
			visibility: visible;
		}

		.backdrop {
			position: fixed;
			inset: var(--pg-topbar-height) 0 0 0;
			z-index: 10;
			display: block;
			padding: 0;
			border: 0;
			background: rgb(0 0 0 / 0.4);
			opacity: 0;
			pointer-events: none;
			transition: opacity 0.25s ease;
		}

		.backdrop.is-visible {
			opacity: 1;
			pointer-events: auto;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.sidebar,
		.backdrop {
			transition: none;
		}
	}
</style>
