<script setup lang="ts">
import axios from "axios"
import { onMounted, ref, nextTick } from "vue"

const displayArchive: any = ref([])
const getArchive = () => {
	try {
		return axios.get("http://localhost:3000/api/entries/readAll").then((res) => {
			Object.keys(res.data).forEach((key) => {
				displayArchive.value.push(res.data[key])
			})
		})
	} catch (err) {
		alert(err)
	}
}

const deleteFromArchive = async ($event: Event, id: string) => {
	try {
		await axios.delete(`http://localhost:3000/api/entries/deleteOne/${id}`)
		displayArchive.value = displayArchive.value.filter((obj: any) => obj.id !== id)
	} catch (err) {
		console.log(err)
	}
}
function setNoteContent(note: any) {
	// window.localStorage.setItem("session", note.content)
}

onMounted(() => {
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
