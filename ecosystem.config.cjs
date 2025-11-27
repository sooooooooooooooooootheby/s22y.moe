module.exports = {
	apps: [
		{
			name: "s22y.moe",
			port: "3002",
			exec_mode: "cluster",
			instances: "max",
			script: "./.output/server/index.mjs",
		},
	],
};
