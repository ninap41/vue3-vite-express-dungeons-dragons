import axios from "axios"
import { ref, onBeforeMount } from "vue"
import router from "../router"
import { useToast } from "vue-toast-notification"
import { CRUD as _CRUD, session_keys, CRUD, Character } from "../types/types"
import "vue-toast-notification/dist/theme-sugar.css"
const $toast = useToast()

/* Includes localStorage setup and api references */
export function useLocalStorage() {

	async function retrieveDraftFromLocalStorage(key: session_keys, callback: any) {
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

    
	async function getStorage(key: session_keys, characterName?: string) {
		const data = window.localStorage.getItem(key as any)
		if (data) return data
		else return null
	}

	async function setStorage(key_: session_keys, characterName: string) {
        console.log(4)
		window.localStorage.setItem(key_ as unknown as string, characterName)
        console.log(5)

	}

	const clearStorage= () => {
        window.localStorage.clear()
    }

    const removeItem=(key:session_keys)=> {
        window.localStorage.removeItem(String(key))

    }
	return {
		retrieveDraftFromLocalStorage,
        getStorage,
        setStorage,
        clearStorage,
        removeItem
	}
}
