<script lang="ts">
	// Google Material Symbols (Outlined). Finn ikonnavn på https://fonts.google.com/icons
	// Husk å legge nye ikonnavn til i icon_names i src/app.html (alfabetisk rekkefølge).
	type Props = { name: string; size?: number }
	let { name, size = 20 }: Props = $props()
</script>

<span class="material-symbols-outlined" style:font-size="{size}px" aria-hidden="true">{name}</span>
