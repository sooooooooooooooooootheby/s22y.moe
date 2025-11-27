<template>
	<div>
		<div class="w-full overflow-hidden sm:hidden text-iris-moon">
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
					:class="{ 'px-1.5': isPath(item.path) }"
				>
					{{ item.label }}
				</li>
			</ul>
		</div>
		<ul class="item-center flex gap-4 max-sm:hidden">
			<li v-for="item in navigation" :key="item.path" @click="navigateTo(item.path)" class="cursor-pointer hover:bg-rose-moon/25 px-1.5" :class="{ 'text-rose-dawn': isPath(item.path) }">
				{{ item.label }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const navigation = ref<{ path: string; label: string }[]>([
	{
		path: "/",
		label: "About",
	},
	{
		path: "/blog",
		label: "Blog",
	},
	{
		path: "/projects",
		label: "Projects",
	},
	{
		path: "/friends",
		label: "Friends",
	},
]);

const isPath = (path: string) => {
	return route.path === path || route.path.startsWith(path + "/");
};
</script>
