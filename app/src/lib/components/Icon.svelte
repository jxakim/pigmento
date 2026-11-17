<script lang="ts">
	interface Props {
		name: string
	}

	let { name }: Props = $props()
</script>

<!-- Ikonnavnet må også legges til i Google Fonts-lenken i app.html. -->
<span class="icon" aria-hidden="true">{name}</span>

<style>
	.icon {
		display: inline-block;
		flex: none;
		font-family: "Material Symbols Outlined", sans-serif;
		font-size: 1.3rem;
		font-weight: normal;
		line-height: 1;
		white-space: nowrap;
		user-select: none;
		font-feature-settings: "liga";
		-webkit-font-smoothing: antialiased;
	}
</style>
