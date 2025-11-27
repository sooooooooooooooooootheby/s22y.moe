<template>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col gap-1" v-if="frontmatter">
			{{ frontmatter }}
			<div class="-mb-1 flex items-center gap-2">
				<span class="px-1.5">{{ props.posts.title }}</span>
				<span class="">#{{ props.posts.sort }}</span>
			</div>
			<p>{{ props.posts.date }}</p>
		</div>
		<template v-if="props.posts">
			<ContentRenderer :value="props.posts" class="post" />
		</template>
		<template v-else>
			<p>cat: Documents{{ path }}.md: No such file or directory</p>
		</template>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	posts: any;
	frontmatter?: boolean;
	path?: string;
}>();
</script>
