<template>
	<div class="w-full overflow-hidden" v-if="toc && toc.body.toc?.links.length !== 0">
		<span
			class="text-iris-moon relative before:absolute before:top-2/3 before:left-full before:ml-[1ch] before:-translate-y-1/2 before:whitespace-nowrap before:content-['\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500']"
		>
			On This Page
		</span>
		<ul class="opacity-75">
			<li v-for="item in toc.body.toc?.links" :key="item.id" :class="{ 'text-iris-moon opacity-100': activeId === item.id }">
				<NuxtLink :to="`#${item.id}`"> {{ generateHashTags(item.depth) }} {{ item.text }} </NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();
const dataKey = computed(() => route.path);

const { data: toc } = await useAsyncData(`toc-${dataKey.value}`, () => {
	if (route.path.startsWith("/blog")) {
		return queryCollection("blog").path(route.path).first();
	} else {
		return queryCollection("page").path(route.path).first();
	}
});

const generateHashTags = (n: number): string => {
	if (typeof n !== "number" || n < 0) {
		return "";
	}
	return "#".repeat(n);
};

const activeId = ref<string | null>(null);
let observer: IntersectionObserver | null = null;

const handleIntersect: IntersectionObserverCallback = (entries) => {
	const visibleEntries = entries.filter((entry) => entry.isIntersecting);

	if (visibleEntries.length > 0) {
		const first = visibleEntries[0];
		if (first && (first.target as HTMLElement).id) {
			activeId.value = (first.target as HTMLElement).id;
		} else {
			activeId.value = null;
		}
	}
};

onMounted(() => {
	observer = new IntersectionObserver(handleIntersect, {
		rootMargin: "0px 0px -60% 0px",
		threshold: 0,
	});

	const headers = document.querySelectorAll("h1[id], h2[id], h3[id], h4[id]");

	headers.forEach((header) => {
		observer?.observe(header);
	});
});

onBeforeUnmount(() => {
	observer?.disconnect();
});
</script>
