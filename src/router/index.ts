import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Notes from "../views/Notes.vue"
import Archive from "../views/Archive.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "character",
			component: Home,
		},
		{
			path: "/notes",
			name: "notes",

			component: Notes,
		},
		{
			path: "/archive",
			name: "archive",

			component: Archive,
		},
	],
})

export default router
