import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	css: ["~/assets/css/main.css"],

	modules: ["@nuxt/content", "nuxt-studio"],
	vite: {
		plugins: [tailwindcss()],
	},
	app: {
		head: {
			title: "s22y.moe",
			htmlAttrs: {
				lang: "en",
			},
			link: [{ rel: "icon", type: "image/x-icon", href: "/icon.png" }],
		},
	},

	content: {
		build: {
			markdown: {
				highlight: {
					theme: "github-dark",
				},
			},
		},
	},

	nitro: {
		experimental: {
			websocket: true,
		},
	},
});
