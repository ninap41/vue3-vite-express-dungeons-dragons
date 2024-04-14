import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"


// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	server: {
		proxy: {
			"/api/*": {
				target: "http://localhost:3000",
				changeOrigin: true,
				secure: false,
				ws: true,
			},
		},
	},
	resolve: {
		
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
			"!": fileURLToPath(new URL("./node_modules", import.meta.url)),
			"~bootstrap": fileURLToPath(new URL("./node_modules/bootstrap", import.meta.url)),


		},
	},
})
