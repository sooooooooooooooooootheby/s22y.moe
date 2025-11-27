<template>
	<li class="flex gap-2">
		<img :src="image" alt="friend" class="size-12" />
		<div class="flex flex-col gap-1">
			<NuxtLink :to="path" target="_blank" class="text-foam-moon underline"><slot name="name" mdc-unwrap="p" /></NuxtLink>
			<span class="text-sm opacity-75"><slot name="describe" mdc-unwrap="p" /></span>
		</div>
	</li>
</template>

<script setup>
const props = defineProps({ image: { type: String, default: "/" }, path: { type: String, default: "/" } });
</script>
