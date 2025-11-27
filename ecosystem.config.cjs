module.exports = {
	apps: [
		{
			name: "s22y.moe",
			port: "3002",
			exec_mode: "fork",
			instances: 1,
			script: "./.output/server/index.mjs",
		},
	],
};
