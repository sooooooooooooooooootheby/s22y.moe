import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
	collections: {
		page: defineCollection({
			type: "page",
			source: "**/**.md",
		}),
		blog: defineCollection({
			type: "page",
			source: "blog/**.md",
			schema: z.object({
				pid: z.number(),
				title: z.string(),
				sort: z.string(),
				date: z.date(),
			}),
		}),
	},
});
