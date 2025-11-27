<template>
	<div>
		<p class="pt-0!">Welcome to S22y.moe 28.03.0 LTS (GNU/Linux 5.15.0-46-generic x86_64)</p>
		<div class="ml-2 flex flex-col">
			<span>* Documentation: https://s22y.moe</span>
			<span>* Management: https://s22y.moe</span>
			<span>* Support: https://s22y.moe</span>
		</div>

		<template v-if="systemInfo">
			<p class="ml-2">System information as of {{ currentTime }}</p>

			<div class="ml-2 flex flex-col">
				<span>System load: {{ systemInfo.systemLoad }}</span>
				<span>Usage of: {{ systemInfo.diskUsedPercentage }}% of {{ systemInfo.totalDiskSize }}GB</span>
				<span>Memory usage: {{ systemInfo.memoryUsage }}%</span>
				<span>Swap usage: {{ systemInfo.swapUsage }}%</span>
				<span>Processes: {{ systemInfo.processes }}</span>
				<span>Users logged in: {{ systemInfo.usersLoggedIn }}</span>
				<span>IPv4 address for eth0: 3.28.4.15</span>
			</div>

			<p>Last login: {{ pastLoginTime }} from {{ randomIP }}</p>
		</template>
		<template v-else>
			<p class="ml-2">System information as of ...</p>
			<div class="ml-2 flex flex-col">
				<span>System load: ...</span>
				<span>Usage of: ...</span>
				<span>Memory usage: ...</span>
				<span>Swap usage: ...</span>
				<span>Processes: ...</span>
				<span>Users logged in: ...</span>
				<span>IPv4 address for eth0: ...</span>
			</div>
			<p>Last login: ... from ...</p>
		</template>
		<p><span class="text-iris-moon">aliceclodia@s22y-moe</span>: cat Documents/about.md</p>
	</div>
</template>

<script lang="ts" setup>
const systemInfo = ref<any>(null);
const currentTime = ref("");
const pastLoginTime = ref("");
const randomIP = ref("");

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getRandomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min: number, max: number, decimalPlaces: number) => {
	const value = Math.random() * (max - min) + min;
	return value.toFixed(decimalPlaces);
};

const generateRandomIP = () => {
	const getRandomOctet = () => getRandomInt(1, 254);
	return `${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}.${getRandomOctet()}`;
};

const formatCurrentTime = (date: Date) => {
	const year = date.getFullYear();
	const month = MONTHS[date.getMonth()];
	const dayOfMonth = date.getDate();
	const dayOfWeek = DAYS[date.getDay()];

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;
	const hoursStr = hours.toString().padStart(2, "0");

	return `${dayOfWeek} ${month} ${dayOfMonth} ${hoursStr}:${minutes}:${seconds} ${ampm} UTC+8 ${year}`;
};

const formatPastLoginTime = (date: Date) => {
	const year = date.getFullYear();
	const month = MONTHS[date.getMonth()];
	const dayOfMonth = date.getDate().toString().padStart(2, "0");
	const dayOfWeek = DAYS[date.getDay()];

	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	return `${dayOfWeek} ${month} ${dayOfMonth} ${hours}:${minutes}:${seconds} ${year}`;
};

const generateSystemInfoData = () => {
	return {
		systemLoad: getRandomFloat(0.01, 1.5, getRandomInt(3, 7)),
		diskUsedPercentage: getRandomFloat(2.0, 60.0, 1),
		totalDiskSize: getRandomFloat(100.0, 500.0, 2),
		memoryUsage: getRandomInt(15, 90),
		swapUsage: getRandomInt(0, 50),
		processes: getRandomInt(80, 500),
		usersLoggedIn: getRandomInt(0, 5),
	};
};

onMounted(() => {
	const now = new Date();

	systemInfo.value = generateSystemInfoData();
	currentTime.value = formatCurrentTime(now);
	pastLoginTime.value = formatPastLoginTime(now);
	randomIP.value = generateRandomIP();
});
</script>
