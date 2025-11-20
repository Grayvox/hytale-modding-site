import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import svg from "@poppanator/sveltekit-svg";
import { defineConfig } from "vite";
import { writeFileSync } from "fs";

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		svg({
			includePaths: ["./src/lib/icons/"]
		})
	]
});
