<template>
	<div>
		<div class="text-iris-moon w-full overflow-hidden sm:hidden">
			<span
				class="relative before:absolute before:top-2/3 before:left-full before:ml-[1ch] before:-translate-y-1/2 before:whitespace-nowrap before:content-['\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500']"
			>
				Navigation
			</span>
			<ul class="opacity-75">
				<li
					class="flex w-full cursor-pointer items-center justify-between"
					v-for="item in navigation"
					:key="item.path"
					@click="navigateTo(item.path)"
					:class="{ 'text-rose-dawn px-1.5': isPath(item.path) }"
				>
					{{ item.title }}
				</li>
			</ul>
		</div>
		<ul class="item-center flex gap-4 max-sm:hidden">
			<li
				v-for="item in navigation"
				:key="item.path"
				@click="navigateTo(item.path)"
				class="hover:bg-rose-moon/25 cursor-pointer px-1.5"
				:class="{ 'text-rose-dawn': isPath(item.path) }"
			>
				{{ item.title }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data: navigation } = await useAsyncData("navigation", async () => {
	let navigation = await queryCollectionNavigation("page").where("published", "=", true).order("priority", "ASC");
	navigation.splice(1, 0, {
		title: "Blog",
		path: "/blog",
		stem: "Blog",
	});
	return navigation;
});

// const navigation = ref<{ path: string; label: string }[]>([
// 	{
// 		path: "/",
// 		label: "About",
// 	},
// 	{
// 		path: "/blog",
// 		label: "Blog",
// 	},
// 	{
// 		path: "/projects",
// 		label: "Projects",
// 	},
// 	{
// 		path: "/friends",
// 		label: "Friends",
// 	},
// ]);

const isPath = (path: string) => {
	return route.path === path || route.path.startsWith(path + "/");
};
</script>
