<template>
	<main>
		<div class="session-buttons">
			<button @click="saveDraft_()">
				<b>Save Draft</b>
			</button>
			<button @click="saveNote()">
				<b class="tooltip">Archive Session Note <span class=""></span></b>
				
			</button>
			<br><br>
		</div>
		<div v-if="editor">
			<button @click="editor.chain().focus().toggleBold().run()"
				:disabled="!editor.can().chain().focus().toggleBold().run()"
				:class="{ 'is-active': editor.isActive('bold') }">
				<b>B</b>
			</button>
			<button @click="editor.chain().focus().toggleItalic().run()"
				:disabled="!editor.can().chain().focus().toggleItalic().run()"
				:class="{ 'is-active': editor.isActive('italic') }">
				I
			</button>
			<button @click="editor.chain().focus().toggleStrike().run()"
				:disabled="!editor.can().chain().focus().toggleStrike().run()"
				:class="{ 'is-active': editor.isActive('strike') }">
				s
			</button>
			<button @click="editor.chain().focus().toggleCode().run()"
				:disabled="!editor.can().chain().focus().toggleCode().run()"
				:class="{ 'is-active': editor.isActive('code') }">
				{{ String(`</>`) }}
			</button>
			<button @click="editor.chain().focus().unsetAllMarks().run()">clear STYLE</button>
			<button @click="editor.chain().focus().clearNodes().run()">clear ALL</button>
			<button @click="editor.chain().focus().setParagraph().run()"
				:class="{ 'is-active': editor.isActive('paragraph') }">
				paragraph
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
				H1
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
				H2
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
				H3
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
				h4
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
				h5
			</button>
			<button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
				:class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
				h6
			</button>
			<button @click="editor.chain().focus().toggleBulletList().run()"
				:class="{ 'is-active': editor.isActive('bulletList') }">
				[*,*,*]
			</button>
			<button @click="editor.chain().focus().toggleOrderedList().run()"
				:class="{ 'is-active': editor.isActive('orderedList') }">
				[1,2,3]
			</button>
			<button @click="editor.chain().focus().toggleCodeBlock().run()"
				:class="{ 'is-active': editor.isActive('codeBlock') }">
				{{ String(`</>`) }}
			</button>
			<button @click="editor.chain().focus().toggleBlockquote().run()"
				:class="{ 'is-active': editor.isActive('blockquote') }">
				"..."
			</button>
			<button @click="editor.chain().focus().setHorizontalRule().run()">horizontal rule</button>
			<button @click="editor.chain().focus().setHardBreak().run()">hard break</button>
			<button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
				{{ String("<-") }} </button>
					<button @click="editor.chain().focus().redo().run()"
						:disabled="!editor.can().chain().focus().redo().run()">
						>
					</button>
					<editor-content class="editor" v-model="editor.options.content" :editor="editor" />
		</div>
	</main>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3"
import { onBeforeMount, onMounted, ref } from "vue"
import StarterKit from "@tiptap/starter-kit"
import axios from "axios"
//@ts-ignore
import router from "../router"
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useLocalStorage } from "../composition/useLocalStorage"
import { useData } from "../composition/useData"

import { session_keys } from "../types/types"

const $toast = useToast();
const {   retrieveDraftFromLocalStorage, setStorage, clearStorage, removeItem, sessionGuard } = useLocalStorage()
const { createOne} = useData()

var editor: any;
onBeforeMount(() => {
	editor = ref(
		new Editor({
			content: "",
			extensions: [StarterKit],
		}))
	retrieveDraftFromLocalStorage(session_keys.draft, (args: any) => editor.value.chain().clearContent().insertContent(args.cache).run())
})

async function saveDraft_() {
	setStorage(session_keys.draft, editor.value.getHTML())
	$toast.success(`Saved Draft To localStorage Key: <b>${session_keys.draft}</b> `)
	$toast.warning("Keep in mind you can only have one draft saved at a time... ")
}
async function saveNote() {
		await createOne("entries", {
		id: Math.floor(Math.random() * 9999),
		content: editor.value.getHTML(),
		date: new Date().toLocaleDateString(),
		tags: [],
	}, "entry")
	editor.value.chain().clearContent()
	removeItem(session_keys.draft)
	router.push("session-archive")
}
//@ts-ignore
onMounted(async () => {
	await sessionGuard()
	setInterval(() =>{}, 3000)
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

}

.session-buttons button {
	border-radius: 10px;
	background-color: "green";
	color: rgb(255, 245, 153);
	border: hsla(160, 100%, 80%, 1);

	background-color: rgb(76, 79, 47);
}
</style>../composition/useData
