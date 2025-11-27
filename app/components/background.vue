<template>
	<div class="crt-background">
		<div class="crt-content">
			<div class="background-image-container">
				<div
					class="absolute inset-0 bg-cover bg-center max-sm:bg-position-[65%_0] opacity-50 brightness-125 sepia-50 backdrop-blur-sm backdrop-contrast-150 backdrop-saturate-150"
					:style="{ backgroundImage: `url('${imageUrl}')` }"
				></div>
				<div class="absolute inset-0 bg-bg opacity-85"></div>
			</div>
			<div class="scanline-overlay"></div>
		</div>
		<div class="flicker-overlay"></div>
	</div>
</template>

<script setup>
const imageUrl = ref("/background.webp");
</script>

<style scoped>
.crt-background {
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	background-color: #000;
	overflow: hidden;
}

.crt-content {
	position: absolute;
	inset: 0;
	overflow: hidden;
}

.background-image-container {
	position: absolute;
	inset: 0;
	filter: contrast(120%) saturate(150%);
}

.scanline-overlay {
	position: absolute;
	inset: 0;
	z-index: 10;
	background:
		repeating-linear-gradient(to right, rgba(31, 34, 48, 0.08) 0, rgba(31, 34, 48, 0.08) 1px, transparent 1px, transparent 3px),
		repeating-linear-gradient(transparent 0, transparent 1px, rgba(31, 34, 48, 0.2) 1px, rgba(31, 34, 48, 0.3) 2px);
	background-size: 100% 4px;
	pointer-events: none;

	animation: scanline-anim 8s linear infinite;
}
</style>
