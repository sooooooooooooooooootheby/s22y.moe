<template>
	<div class="w-full overflow-hidden">
		<span
			class="text-iris-moon relative before:absolute before:top-2/3 before:left-full before:ml-[1ch] before:-translate-y-1/2 before:whitespace-nowrap before:content-['\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500\2500']"
		>
			Online
		</span>
		<ul class="opacity-75">
			<client-only>
				<li>Connected: {{ isConnected }}</li>
				<li>Transport: {{ transport }}</li>
				<li>Viewers: {{ viewers }}</li>
			</client-only>
		</ul>
	</div>
</template>

<script setup lang="ts">
const { $socket, $isConnected, $viewers, $transport } = useNuxtApp();

const isConnected = $isConnected;
const viewers = $viewers;
const transport = $transport;
const socket = $socket;

onMounted(() => {
	if (socket && isConnected.value) {
		socket.emit("get-current-viewers");
	} else {
		console.log("[客户端组件] Socket 未连接，等待连接后自动更新");
	}
});
</script>
