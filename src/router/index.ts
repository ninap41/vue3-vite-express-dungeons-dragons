import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Notes from "../views/SessionNotes.vue"
import Archive from "../views/Archive.vue"
import World from "../views/World.vue"

import CharacterSheet from "@/views/CharacterSheet.vue"
import CreateUpdateCharacter from "@/views/CreateUpdateCharacter.vue"

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "charactersheet",
			component: CharacterSheet,
		},
		{
			path: "/create-update",
			name: "makenew",
			component: CreateUpdateCharacter,
		},
		{
			path: "/session-notes",
			name: "session-notes",

			component: Notes,
		},
		{
			path: "/archive",
			name: "archive",

			component: Archive,
		},
		{
			path: "/world",
			name: "world",

			component: World,
		},
	],
})

export default router
