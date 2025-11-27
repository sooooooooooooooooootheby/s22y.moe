<template>
	<div class="flex w-full gap-8">
		<div class="w-5/7 max-sm:w-full">
			<p v-if="route.path !== '/'"><span class="text-iris-moon">aliceclodia@s22y-moe</span>: cat Documents{{ route.path }}.md</p>
			<render :posts="page" :frontmatter="false" :path="route.path" />
			<app-footer />
		</div>
		<div class="relative w-2/7 max-sm:hidden">
			<div class="fixed flex w-[250px] flex-col gap-2">
				<settings />
				<online />
				<toc />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => queryCollection("page").path(route.path).first());

useHead({
	title: `${page.value?.title ? page.value?.title : "hhi!"} - s22y.moe`,
	meta: [{ name: "description", content: `${page.value?.description ? page.value?.description : "s22y.moe"}` }],
});
useSeoMeta({
	title: `${page.value?.title ? page.value?.title : "hhi!"} - s22y.moe`,
	ogTitle: `${page.value?.title ? page.value?.title : "hhi!"} - s22y.moe`,
	description: `${page.value?.description ? page.value?.description : "s22y.moe"}`,
	ogDescription: `${page.value?.description ? page.value?.description : "s22y.moe"}`,
	ogImage: "/background.webp",
	twitterCard: "summary_large_image",
});
</script>
