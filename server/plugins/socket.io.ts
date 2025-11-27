import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";

export default defineNitroPlugin((nitroApp: NitroApp) => {
	// 创建 engine 实例
	const engine = new Engine({
		transports: ["websocket", "polling"],
	});

	// 创建 Socket.IO 服务器实例
	const io = new Server({
		cors: {
			origin: "*", // 允许所有来源，生产环境应该限制
			methods: ["GET", "POST"],
		},
	});

	io.bind(engine);

	// 发送在线用户数的辅助函数
	const broadcastOnlineUsers = () => {
		try {
			// 使用安全的方式获取socket数量
			const count = io.engine.clientsCount;
			io.emit("online-users", count);
		} catch (error) {
			console.error("[服务端] 广播在线人数时出错:", error);
		}
	};

	io.on("connection", (socket) => {
		broadcastOnlineUsers();

		// 处理获取当前查看者的请求
		socket.on("get-current-viewers", () => {
			try {
				const count = io.engine.clientsCount;
				socket.emit("online-users", count);
			} catch (error) {
				console.error("[服务端] 处理 get-current-viewers 请求时出错:", error);
			}
		});

		// 处理断开连接事件
		socket.on("disconnect", (reason) => {
			setTimeout(() => {
				const count = io.engine.clientsCount;
				broadcastOnlineUsers();
			}, 100);
		});

		// 处理连接错误
		socket.on("error", (error) => {
			console.error(`[服务端] 连接 ${socket.id} 发生错误:`, error);
		});
	});

	// 错误处理
	io.on("error", (error) => {
		console.error("Socket.IO server error:", error);
	});

	nitroApp.router.use(
		"/socket.io/",
		defineEventHandler({
			handler(event) {
				engine.handleRequest(event.node.req as any, event.node.res);
				event._handled = true;
			},
			websocket: {
				open(peer) {
					// @ts-expect-error private method and property
					engine.prepare(peer._internal.nodeReq);
					// @ts-expect-error private method and property
					engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
				},
			},
		})
	);
});
