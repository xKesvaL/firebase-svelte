<script lang="ts">
	export let close = true;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class="icon icon-tabler icon-tabler-menu-2"
	class:close
	width="100%"
	height="100%"
	viewBox="0 0 100 100"
	stroke-width="2"
	stroke="none"
	fill="currentColor"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<rect class="line top" width="80" height="10" x="10" y="20" rx="5" />
	<rect class="line mid" width="80" height="10" x="10" y="45" rx="5" />
	<rect class="line bot" width="80" height="10" x="10" y="70" rx="5" />
</svg>

<style lang="scss">
	svg {
		.line {
			transform-origin: center;
			transition:
				y 0.15s ease-in 0.15s,
				transform 0.15s ease-in,
				opacity 0s 0.15s;
		}

		&.close {
			.line {
				transition:
					y 0.15s ease-in,
					transform 0.15s ease-in 0.15s,
					opacity 0s 0.15s;

				&.top {
					transform: rotate(45deg);
					y: 45;
				}

				&.mid {
					opacity: 0;
				}

				&.bot {
					transform: rotate(-45deg);
					y: 45;
				}
			}
		}
	}
</style>
