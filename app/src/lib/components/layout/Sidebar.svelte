<script lang="ts">
	import NotificationBell from "#lib/components/notifications/NotificationBell.svelte"
	import SidebarNavigation from "./SidebarNavigation.svelte"
</script>

<aside class="sidebar" data-color-scheme="dark" data-color="neutral">
	<div class="header">
		<div class="logo">
			<img src="/logo.png" alt="" width="52" height="52" />
			<span class="app-name">Pigmento</span>
		</div>
		<NotificationBell />
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

	.header,
	.logo {
		display: flex;
		align-items: center;
	}

	.header {
		justify-content: space-between;
		gap: 0.5rem;
	}

	.logo {
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

	/* På mobil er navigasjonen flyttet til menyen nederst (se BottomNavigation.svelte). */
	@media (max-width: 57.5rem) {
		.sidebar {
			display: none;
		}
	}
</style>
