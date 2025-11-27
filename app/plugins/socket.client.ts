import { io } from "socket.io-client";
import { ref } from "vue";

const socket = io("", {
	autoConnect: true,
	reconnection: true,
});

const isConnected = ref<boolean>(false);
const viewers = ref<number>(0);
const transport = ref<string>("N/A");

export default defineNuxtPlugin(() => {
	if (socket.connected) {
		isConnected.value = true;
		transport.value = socket.io.engine.transport.name;
	}

	socket.on("connect", () => {
		isConnected.value = true;
		transport.value = socket.io.engine.transport.name;

		socket.emit("get-current-viewers");
		socket.io.engine.on("upgrade", (rawTransport) => {
			transport.value = rawTransport.name;
		});
	});

	socket.on("disconnect", (reason) => {
		isConnected.value = false;
		transport.value = "N/A";
	});

	// 监听连接错误
	socket.on("connect_error", (error) => {
		console.error(`[客户端] 连接错误:`, error);
	});

	// 监听在线用户数更新
	socket.on("online-users", (count: any) => {
		if (typeof count === "number") {
			viewers.value = count;
		} else if (count !== undefined && count !== null) {
			const numCount = Number(count);
			if (!isNaN(numCount)) {
				viewers.value = numCount;
			} else {
				console.warn(`[客户端] 收到的在线人数不是有效数字:`, count);
			}
		}
	});

	return {
		provide: {
			socket,
			isConnected,
			viewers,
			transport,
		},
	};
});
