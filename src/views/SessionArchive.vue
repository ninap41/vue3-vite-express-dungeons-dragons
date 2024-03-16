<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, nextTick } from "vue"
import { session_keys } from "../types/types";
import { useLocalStorage } from "../composition/useLocalStorage";
import { useData } from "../composition/useData";

const { getAll, deleteOne } = useData()
const { sessionGuard } = useLocalStorage()

const displayArchive: any = ref([])
const getArchive = async  () => {
		const data = await  getAll("entries", "entries")
		Object.keys(data).forEach((key) => {
			displayArchive.value.push(data[key])
		})
}

const deleteFromArchive = async ($event: Event, id: string) => {
	await deleteOne("entries", id, "Entry")
	displayArchive.value = displayArchive.value.filter((obj: any) => obj.id !== id)	
}

function setNoteContent(note: any) {
	window.localStorage.setItem(String(session_keys.draft), note.content)
}

onMounted(async () => {
	await sessionGuard()
	getArchive()

})
</script>

<template>
	<main>Session Archive Get sessions here, delete, merge,yada</main>

	<div v-if="displayArchive">
		<div v-for="note of displayArchive">
			<h3>
				{{ note.date }} <button @click="() => setNoteContent(note)">Add To Drafts</button>
				<button @click="deleteFromArchive($event, note.id)">Delete</button>
			</h3>
			{{ displayArchive.value }}
			<div v-html="note.content"></div>
		</div>
	</div>
</template>
