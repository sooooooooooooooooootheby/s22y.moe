<template>
	<li class="flex flex-col">
		<div>
			<span class="mr-2">-</span>
			<span class="text-foam-moon"><slot name="label" mdc-unwrap="p" /></span>
		</div>
		<div class="flex flex-col ml-4">
			<span><slot name="describe" mdc-unwrap="p" /></span>
			<NuxtLink :to="path" target="_blank" class="break-all underline">{{ path }}</NuxtLink>
		</div>
	</li>
</template>

<script setup>
const props = defineProps({ path: { type: String, default: "/" } });
</script>
