<script setup lang="ts">
import axios from "axios"
import { onMounted, ref } from "vue"

const displayArchive: any = ref([])
const getArchive = () => {
	try {
		axios.get("http://localhost:3000/api/entries/all").then((res) => {
			console.log(res.data)
			Object.keys(res.data).forEach((key) => displayArchive.value.push(res.data[key]))
		})
	} catch (err) {
		alert(err)
	}
}

const deleteFromArchive = async (id: string) => {
	displayArchive.value = []
	try {
		await axios.delete(`http://localhost:3000/api/entries/delete/${id}`).then((res) => {
			displayArchive.value = null
			Object.keys(res.data).forEach((key) => displayArchive.push(res.data[key]))
		})
	} catch (err) {
		console.log(err)
	}
	window.location.reload()
}
function setNoteContent(note: any) {
	window.localStorage.setItem("session", note.content)
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
				<button @click="deleteFromArchive(note.id)">Delete</button>
			</h3>
			<div v-html="note.content"></div>
		</div>
	</div>
</template>
