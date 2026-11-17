<script lang="ts">
	import SidebarNavigation from "./SidebarNavigation.svelte"
</script>

<aside class="sidebar">
	<div class="logo">
		<img src="/logo.png" alt="" width="52" height="52" />
		<span class="app-name">Pigmento</span>
	</div>

	<SidebarNavigation />

	<div class="user">
		<span class="user-name">Studioet</span>
		<span class="user-role">Innlogget som eier</span>
	</div>
</aside>

<style>
	.sidebar {
		view-transition-name: sidebar;
		display: flex;
		flex: 1 1 14.375rem;
		flex-direction: column;
		gap: 2rem;
		padding: 1.75rem 1rem;
		background: var(--pg-sidebar);
		color: #f1f3f2;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0 0.5rem;
	}

	.logo img {
		display: block;
		border-radius: 0.75rem;
		object-fit: cover;
	}

	.app-name {
		font-family: var(--pg-font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.user {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
		margin-top: auto;
		padding: 0.875rem 0.75rem;
		border-top: 0.0625rem solid var(--pg-sidebar-line);
	}

	.user-name {
		font-size: 0.875rem;
		font-weight: 600;
	}

	.user-role {
		color: var(--pg-sidebar-muted);
		font-size: 0.8125rem;
	}

	/* På mobil er navigasjonen flyttet til menyen nederst (se BottomNavigation.svelte). */
	@media (max-width: 57.5rem) {
		.sidebar {
			display: none;
		}
	}
</style>
