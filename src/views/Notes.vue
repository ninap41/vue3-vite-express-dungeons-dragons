<template>
	<main>
		<div>
			<button @click="saveDraft()">
				<b>Save Draft (Local Storage)</b>
			</button>
			<button @click="archiveSession()">
				<b>Archive Session</b>
			</button>
		</div>
		<div v-if="editor">
			<button
				@click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }"
			>
				<b>bold</b>
			</button>
			<button
				@click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }"
			>
				italic
			</button>
			<button
				@click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }"
			>
				strike
			</button>
			<button
				@click="editor.chain().focus().toggleCode().run()"
				:disabled="!editor.can().chain().focus().toggleCode().run()"
				:class="{ 'is-active': editor.isActive('code') }"
			>
				code
			</button>
			<button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
			<button @click="editor.chain().focus().clearNodes().run()">clear nodes</button>
			<button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
				paragraph
			</button>
			<button
				@click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
			>
				h1
			</button>
			<button
				@click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
			>
				h2
			</button>
			<button
				@click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
			>
				h3
			</button>
			<button
				@click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
			>
				h4
			</button>
			<button
				@click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
			>
				h5
			</button>
			<button
				@click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
			>
				h6
			</button>
			<button
				@click="editor.chain().focus().toggleBulletList().run()"
				:class="{ 'is-active': editor.isActive('bulletList') }"
			>
				bullet list
			</button>
			<button
				@click="editor.chain().focus().toggleOrderedList().run()"
				:class="{ 'is-active': editor.isActive('orderedList') }"
			>
				ordered list
			</button>
			<button
				@click="editor.chain().focus().toggleCodeBlock().run()"
				:class="{ 'is-active': editor.isActive('codeBlock') }"
			>
				code block
			</button>
			<button
				@click="editor.chain().focus().toggleBlockquote().run()"
				:class="{ 'is-active': editor.isActive('blockquote') }"
			>
				blockquote
			</button>
			<button @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
			<button @click="editor.chain().focus().setHardBreak().run()">hard break</button>
			<button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
				undo
			</button>
			<button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
				redo
			</button>
			<editor-content class="editor" v-model="editor.options.content" :editor="editor" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3"
import { onMounted, ref } from "vue"
import StarterKit from "@tiptap/starter-kit"
import axios from "axios"

function saveDraft() {
	window.localStorage.setItem("session", editor.value.getHTML())
	alert("saved")
}
var editor = ref(
	new Editor({
		content: "motherfucker",
		extensions: [StarterKit],
	})
)
function retrieveLocalStorage() {
	const cache = window.localStorage.getItem("session")
	if (!cache) {
		window.localStorage.setItem("session", "default set session")
	}
	editor.value.chain().clearContent().insertContent(cache).run()
}

function archiveSession() {
	axios.put("http://localhost:3000/api/entries/createOne", {
		id: Math.floor(Math.random() * 9999),
		content: editor.value.getHTML(),
		date: new Date().toLocaleDateString(),
		tags: [],
	})

	window.localStorage.removeItem("session")
	editor.value.chain().clearContent()
}

onMounted(async () => {
	retrieveLocalStorage()
})
</script>
<style>
.editor,
.contenteditable,
.ProseMirror,
.ProseMirror {
	color: white;
	background-color: black;
	min-height: 400px !important;
	max-height: 100vh;
	font-feature-settings: "liga" 0;
	overflow: auto;
}
button {
	background-color: black;

	color: gray;
	padding: 0.5rem;
	font-size: large;
	color: rgba(235, 235, 235, 0.64);
}
</style>
