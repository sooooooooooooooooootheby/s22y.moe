<template>
	<div class="w-full overflow-hidden">
		<span
			class="text-iris-moon relative before:absolute before:top-2/3 before:left-full before:ml-[1ch] before:-translate-y-1/2 before:whitespace-nowrap before:content-['\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500']"
		>
			Settings
		</span>
		<ul class="opacity-75">
			<li class="flex w-full cursor-pointer items-center justify-between" v-for="item in settings" :key="item.key" @click="changeCrtShadow">
				<span>{{ item.label }}</span>
				<span>
					{{ item.checked ? "[x]" : "[ ]" }}
				</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
interface SettingItem {
	label: string;
	checked: boolean;
	key: string;
}

const settings = ref<SettingItem[]>([
	{
		label: "CRT Shadow",
		checked: false,
		key: "crtShadow",
	},
]);

const crtShadow = useState("crtShadow", () => false);

const changeCrtShadow = () => {
	const firstSetting = settings.value[0];

	if (firstSetting) {
		const newCheckedState = !firstSetting.checked;
		firstSetting.checked = newCheckedState;
		crtShadow.value = newCheckedState;
		localStorage.setItem(firstSetting.key, String(newCheckedState));
	}
};

onMounted(() => {
	const firstSetting = settings.value[0];

	if (firstSetting) {
		const key = firstSetting.key;
		const storedValue = localStorage.getItem(key);
		const crtShadowStatus: boolean = storedValue === "true";
		firstSetting.checked = crtShadowStatus;
		crtShadow.value = crtShadowStatus;
	}
});
</script>
