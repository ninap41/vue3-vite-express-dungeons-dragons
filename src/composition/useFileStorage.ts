import axios from "axios"
import { ref, onBeforeMount } from "vue"
import router from "../router"
import { useToast } from "vue-toast-notification"
import { CRUD as _CRUD, session_keys, CRUD, Character } from "../types/types"
import "vue-toast-notification/dist/theme-sugar.css"
const $toast = useToast()

/* Includes localStorage setup and api references */
export function useFileStorage() {
	const api = "http://localhost:3000/api/"
	const scaffold = ref(false)
	const tables_ = ["characters", "entries"]

	// entries
	function saveDraft(html: string) {
		window.localStorage.setItem(String(session_keys.entries), html)
		$toast.success(`Saved Draft To localStorage Key: <b>${session_keys.entries}</b> `)
		$toast.warning("Keep in mind you can only have one draft saved at a time... ")
	}
	async function getAll(tableName: string) {
		console.log(`${api}${tableName}/readAll`)
		const res = await axios.get(`${api}${tableName}/readAll`)
		if (res.data) return res.data
		else $toast.error("Could not find that character")
	}

	async function updateOne(tableName: string, body: any) {
		const res = await axios.post(`${api}${tableName}/updateOne`, body)
		if (!res.data) $toast.success("Successfully updated")
		else $toast.error("Could not find that character")
	}

	async function createOne(tableName: string, body: any) {
		const res = await axios.put(`${api}${tableName}/createOne`, body)
		if (!res.data) $toast.success("Successfully created new character")
		else $toast.error("Could not find that character")
	return
	}

	async function getOne(tableName: string, id: any) {
		const res = await axios.get(`${api}${tableName}/readAll`)
		if (res.data) res.data.filter((item: any) => item.id === String(id))
		else $toast.error("Could not find that character")
	}
	async function deleteOne(tableName: string, id: any) {
		await axios.get(`${api}${tableName}/deleteOne/${id}`)
	}

	const archiveSession = async (table: string, body: any, callback: any) => {
		try {
			await axios.put(api + table + "/createOne", {
				id: Math.floor(Math.random() * 9999),
				content: body,
				date: new Date().toLocaleDateString(),
				tags: [],
			})
			$toast.success(`Note has been saved!`)
		} catch (err) {
			$toast.error("Something went wrong. email the dumb dev (500 error)")
		}
		router.push("archive")
		window.localStorage.removeItem(String(session_keys.entries))
		if (callback) callback()
	}

	async function retrieveEntryFromLocalStorage(key: session_keys, callback: any) {
		var cache = window.localStorage.getItem(String(key))
		if (!cache) {
			var new_cache = `Hello! I didn't detect any session notes saved to drafts. So Here is a Placeholder! Store your campaign notes here bub.  ${key}`
			window.localStorage.setItem(String(key), new_cache)
			if (callback) callback({ cache })
		} else {
			const data = window.localStorage.getItem(String(key))
			if (callback) callback({ data })
		}
	}

	async function createNewCharacter(characterName: string) {
		var char: Character = new Character(characterName)
		await createOne("characters", char)
		setSessionCharacterToLocalStorage(session_keys.character, characterName)
	}

	async function getSessionCharacterToLocalStorage(key: session_keys, characterName?: string) {
		const data = window.localStorage.getItem("character")
		if (data) return data
		else return null
	}

	async function setSessionCharacterToLocalStorage(key: session_keys, characterName: string) {
		// this is an existing character
		window.localStorage.setItem("character", characterName)
	}

	//db
	async function scaffoldTables(customTables?: any) {
		if(!scaffold.value){
			$toast.default("scaffolding tables")
			const responses = []
			const t = tables_ || customTables
			for (var i = 0; i < t.length; i++) {
				const res = await axios.get(`${api}${t[i]}/check`)
				responses.push(`for  <b style="color:yellow">"${t[i]}"</b>  ` + res.data)
			}
			const data = await Promise.all(responses)
			data.forEach((res) => $toast.default(res))
			scaffold.value = true
		}
	
	}

	

	return {
		saveDraft,
		scaffoldTables,
		retrieveEntryFromLocalStorage,
		setSessionCharacterToLocalStorage,
		getSessionCharacterToLocalStorage,
		archiveSession,
		createNewCharacter,
		deleteOne,
		createOne,
		updateOne,
		getAll,
		getOne,
	}
}

/* 

The DND API

{
	"main": {
		"ability-scores": "/api/ability-scores",
		"alignments": "/api/alignments",
		"backgrounds": "/api/backgrounds",
		"classes": "/api/classes",
		"conditions": "/api/conditions",
		"damage-types": "/api/damage-types",
		"equipment": "/api/equipment",
		"equipment-categories": "/api/equipment-categories",
		"feats": "/api/feats",
		"features": "/api/features",
		"languages": "/api/languages",
		"magic-items": "/api/magic-items",
		"magic-schools": "/api/magic-schools",
		"monsters": "/api/monsters",
		"proficiencies": "/api/proficiencies",
		"races": "/api/races",
		"rule-sections": "/api/rule-sections",
		"rules": "/api/rules",
		"skills": "/api/skills",
		"spells": "/api/spells",
		"subclasses": "/api/subclasses",
		"subraces": "/api/subraces",
		"traits": "/api/traits",
		"weapon-properties": "/api/weapon-properties"
	},
	"classes": [
		{
			"index": "barbarian",
			"name": "Barbarian",
			"url": "/api/classes/barbarian"
		},
		{
			"index": "bard",
			"name": "Bard",
			"url": "/api/classes/bard"
		},
		{
			"index": "cleric",
			"name": "Cleric",
			"url": "/api/classes/cleric"
		},
		{
			"index": "druid",
			"name": "Druid",
			"url": "/api/classes/druid"
		},
		{
			"index": "fighter",
			"name": "Fighter",
			"url": "/api/classes/fighter"
		},
		{
			"index": "monk",
			"name": "Monk",
			"url": "/api/classes/monk"
		},
		{
			"index": "paladin",
			"name": "Paladin",
			"url": "/api/classes/paladin"
		},
		{
			"index": "ranger",
			"name": "Ranger",
			"url": "/api/classes/ranger"
		},
		{
			"index": "rogue",
			"name": "Rogue",
			"url": "/api/classes/rogue"
		},
		{
			"index": "sorcerer",
			"name": "Sorcerer",
			"url": "/api/classes/sorcerer"
		},
		{
			"index": "warlock",
			"name": "Warlock",
			"url": "/api/classes/warlock"
		},
		{
			"index": "wizard",
			"name": "Wizard",
			"url": "/api/classes/wizard"
		}
	]
}

*/
