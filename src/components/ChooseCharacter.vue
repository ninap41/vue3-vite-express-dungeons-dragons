<script setup lang="ts">
import { ref } from "vue"
import { Character, session_keys } from "../types/types"
import { useFileStorage } from "../composition/useFileStorage"
import { useToast } from "vue-toast-notification"
const props = defineProps<{
	characters: Array<Character>
}>()

// async function retrieveEntryFromLocalStorage(key: session_keys, callback: any) {
// 	var cache = window.localStorage.getItem(String(key))
// 	if (!cache) {
// 		var new_cache = `Hello! I didn't detect any session notes saved to drafts. So Here is a Placeholder! Store your campaign notes here bub.  ${key}`
// 		window.localStorage.setItem(String(key), new_cache)
// 		if (callback) callback({ cache })
// 	} else {
// 		const data = window.localStorage.getItem(String(key))
// 		if (callback) callback({ data })
// 	}
// }
</script>

<template></template>

<style scoped></style>
