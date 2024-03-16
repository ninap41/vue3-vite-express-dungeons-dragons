import axios from "axios"
import { ref, onBeforeMount, type Ref } from "vue"
import router from "../router"
import { useToast } from "vue-toast-notification"
import { CRUD as _CRUD, session_keys, CRUD, Character } from "../types/types"
import "vue-toast-notification/dist/theme-sugar.css"
const $toast = useToast()

/* Includes localStorage setup and api references */
export function useData() {
	const api = "http://localhost:3000/api/"
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

	

	return {
		scaffoldTables,
		deleteOne,
		createOne,
		updateOne,
		getAll,
		getOne,
		isEmpty,
	}
}
