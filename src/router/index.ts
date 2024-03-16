import { createRouter, createWebHistory } from "vue-router"
import Notes from "../views/SessionNotes.vue"
import SessionArchive from "../views/SessionArchive.vue"
import World from "../views/World.vue"
import CharacterSheet from "@/views/CharacterSheet.vue"
import CreateUpdateCharacter from "@/views/CreateUpdateCharacter.vue"
import { useLocalStorage } from "@/composition/useLocalStorage"
import { useToast } from "vue-toast-notification"
import { session_keys } from "@/types/types"
import ChooseCharacter from "@/views/ChooseCharacter.vue"

export const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "choose-character",
			component: ChooseCharacter
		},
		{
			path: "/character-sheet",
			name: "character-sheet",
			component: CharacterSheet,
		},
		{
			path: "/update",
			name: "update",
			component: CreateUpdateCharacter,
		},
		{
			path: "/session-notes",
			name: "session-notes",

			component: Notes,
		},
		{
			path: "/session-archive",
			name: "session-archive",

			component: SessionArchive,
		},
		{
			path: "/world",
			name: "world",
			component: World,
		},
	],
})

 
const { getStorage, setStorage, retrieveDraftFromLocalStorage, clearStorage, } = useLocalStorage()
const $toast = useToast()

//frustrated -- I've done this a hundred times but today is just not my day 
// router.beforeEach(async (to, from, next) => {
// 	const storageKey = await getStorage(session_keys.characterName, "Storage Key")
// 	if (!storageKey && from.path !== "/") next("/")
// 	else next()
// })

export default router
