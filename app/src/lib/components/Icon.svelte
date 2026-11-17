<script lang="ts">
	interface Props {
		name: string
		size?: string
	}

	let { name, size }: Props = $props()
</script>

<!-- Ikonnavnet må også legges til i Google Fonts-lenken i app.html. -->
<span class="icon" style:font-size={size} aria-hidden="true">{name}</span>

<style>
	.icon {
		display: inline-block;
		flex: none;
		font-family: "Material Symbols Outlined", sans-serif;
		font-size: 1.25rem;
		font-weight: normal;
		line-height: 1;
		white-space: nowrap;
		user-select: none;
		font-feature-settings: "liga";
		-webkit-font-smoothing: antialiased;
	}
</style>
