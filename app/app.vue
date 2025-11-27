<template>
	<div :class="{ 'crt-filter': crtShadow }">
		<background />
		<div class="relative z-20">
			<app-header />
			<div class="mx-auto mt-14 w-4xl max-sm:w-full max-sm:px-4">
				<NuxtLayout>
					<NuxtPage />
				</NuxtLayout>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const crtShadow = useState("crtShadow");
</script>
