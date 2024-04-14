import axios from "axios"
import { ref, onBeforeMount, type Ref } from "vue"
import router from "../router"
import { useToast } from "vue-toast-notification"
import { CRUD as _CRUD, session_keys, CRUD, Character } from "../types/types"
import "vue-toast-notification/dist/theme-sugar.css"
import { useLocalStorage } from "./useLocalStorage"
const $toast = useToast()
const { setStorage } = useLocalStorage()

/* Includes localStorage setup and api references */
export function useData() {
	const api = "http://localhost:3000/api/"
	const dnd_api = "https://www.dnd5eapi.co/api/"

	const scaffold = ref(false)
	const tables_ = ["characters", "entries"]

	
	async function getAll(tableName: string, type?: String) {
		console.log(`${api}${tableName}/readAll`)
		const res = await axios.get(`${api}${tableName}/readAll`)
		if (res.data) return res.data
		else $toast.error(`Could not retrieve ${type}`)
	}

	async function updateOne(tableName: string, body: any,type?: String) {
		const res = await axios.post(`${api}${tableName}/updateOne`, body)
		if (res.data) $toast.success(`Successfully updated "${type}"`)
		else $toast.error(`could not update "${type}"`)
		
	}

	async function createOne(tableName: String, body: any, type?: String) {
		const res = await axios.put(`${api}${tableName}/createOne`, body)
		if (res.status === 200) $toast.success(`Created ${type}!`)
		else $toast.error(`Could not create/archive ${type}`)
	}

	async function getOne(tableName: string, id: any, type?: String) {
		const res = await axios.get(`${api}${tableName}/readAll`)
		if (res.data) res.data.filter((item: any) => item.id === String(id))
	else $toast.error(`Could not find ${type}`)
	}
	async function deleteOne(tableName: string, id: any, type?: String) {
		await axios.delete(`${api}${tableName}/deleteOne/${id}`)
	}

	async function scaffoldTables(customTables?: Array<String>) {
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

	function isEmpty(ref_: Ref<String>) {
		return !ref_.value || ref_.value === ""
	}

	const saveCharacter = async (character:  Character): Promise<void> => {
		updateOne("characters", character, character.name)
		setStorage(session_keys.characterName, character.name)
	}
	
	const getCharacterData = async (): Promise<Array<Character>> => {
		return await getAll("characters")
	}

	const getSpellKeys = async (val?: any): Promise<any> => {
		const res = await axios.get(`${dnd_api}/spells/${val ? val : ''}`)
		if (res.data) {
			const data = res.data.results.map((spell: any) => spell.index.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.substring(1)).join(' '))
			if(val) {
				// data.filter()
			}
			return data
		}
		else $toast.error(`Could not retrieve spell data ${val ? 'for "' + val + '"': ''}`)
		
	}
	const getSpell = async (val: any): Promise<any> => {
		let formatSpell = (spellName_: string) => spellName_.split(' ').map((word: string) => word.charAt(0).toLowerCase() + word.substring(1)).join('-')
const spellFormatted = formatSpell(val)
		const res = await axios.get(`${dnd_api}/spells/${ spellFormatted}`)
		if (res.data) {
			const data = res.data			
			return data
		}
		else $toast.error(`Could not retrieve spell data ${val ? 'for "' + val + '"': ''}`)
		
	}
	return {
		scaffoldTables,
		deleteOne,
		createOne,
		updateOne,
		getAll,
		getOne,
		isEmpty,
		getSpellKeys,
		getSpell,
		saveCharacter,
		getCharacterData,
	}
}
