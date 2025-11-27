<template>
	<div>
		<div class="fixed top-0 z-50 w-full backdrop-blur-lg">
			<div class="relative z-22 mx-auto flex w-4xl items-center justify-between py-2 max-sm:w-full max-sm:px-4">
				<div class="text-white">s22y.moe ><span class="cursor">_</span></div>
				<navigation class="max-sm:hidden" />
				<span class="sm:hidden" @click="isMenu = !isMenu">≡</span>
			</div>
		</div>
		<div class="fixed top-0 left-0 z-21 h-screen w-screen px-4 pt-12 backdrop-blur-lg" v-if="isMenu">
			<div class="flex w-full flex-col gap-2">
				<navigation @click="isMenu = !isMenu" />
				<settings />
				<online />
				<toc />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const isMenu = ref<boolean>(false);
</script>

<style scoped>
.cursor {
	animation: blink 1s infinite;
}

/* 定义闪烁动画 */
@keyframes blink {
	0%,
	100% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
}
</style>
