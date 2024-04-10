<template>
  <div>
	<br><br>
    <div style="position: relative">
      <div class="editor-title glow">Session Notes</div>

      <div class="editor" v-if="editor">
        <div class="editor-buttons">
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
          >
            <b>B</b>
          </button>
          <button
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
          >
            I
          </button>
          <button
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
          >
            s
          </button>

          <button @click="editor.chain().focus().unsetAllMarks().run()">
            clear style
          </button>

          <button
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
          >
            {{String('<p>')}}
          </button>

          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            H1
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            H2
          </button>
          <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          >
            h3
          </button>

          <button
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
          >
            <i class="pi pi-list">(* * *)</i>
          </button>
          <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
          >
            <i class="pi pi-list"> (1, 2, 3)</i>
          </button>
          <button
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }"
          >
            <i class="pi pi-code"></i>
          </button>
          <button
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }"
          >
            <i class="pi pi-ellipsis-h"></i>
          </button>
          <button @click="editor.chain().focus().setHorizontalRule().run()">
            ---
          </button>
          <button @click="editor.chain().focus().setHardBreak().run()">
            hard break
          </button>
          <button
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >
            <i class="pi pi-replay"></i>
          </button>
          <button
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
          >
            <i class="pi pi-refresh"></i>
          </button>
          <button @click="editor.chain().focus().clearNodes().run()">
            <i class="pi pi-trash"></i>
          </button>
        </div>
        <editor-content
          class="editor"
          v-model="editor.options.content"
          :editor="editor"
        />
      </div>

	  <div class="session-buttons">
			<button @click="saveDraft_()">
				<b class="tooltip">Save Draft<span class="tooltiptext">This will save your note as a draft in browser</span></b> 
			</button>
			<button @click="saveNote()">
				<b class="tooltip">Archive <span class="tooltiptext">This will refresh the wysiwig and archive your session note to the archive page.</span></b>
			</button>
		<div class="countdown-container">
			<!-- <p class="tooltip countdown-tooltip"><div>Draft Save Countdown: {{ saveCountdown }}</div> <div class="tooltiptext">Saves a draft once every thirty seconds</div></p> -->
		</div>
    </div>
</div>

</div>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from "@tiptap/vue-3";
import { onBeforeMount, onMounted, ref } from "vue";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
//@ts-ignore
import router from "../router";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { useLocalStorage } from "../composition/useLocalStorage";
import { useData } from "../composition/useData";

import { session_keys } from "../types/types";

const $toast = useToast();
const {
  retrieveDraftFromLocalStorage,
  setStorage,
  clearStorage,
  removeItem,
  sessionGuard,
} = useLocalStorage();
const { createOne } = useData();
const saveCountdown = ref(30);
var editor: any;
onBeforeMount(() => {
  editor = ref(
    new Editor({
      content: "",
      extensions: [StarterKit],
    })
  );
  retrieveDraftFromLocalStorage(session_keys.draft, (args: any) =>
    editor.value.chain().clearContent().insertContent(args.cache).run()
  );
});

async function saveDraft_() {
  setStorage(session_keys.draft, editor.value.getHTML());
  $toast.success(
    `Saved Draft To localStorage Key: <b>${session_keys.draft}</b> `
  );
  $toast.warning(
    "Keep in mind you can only have one draft saved at a time... "
  );
}
async function saveNote() {
  await createOne(
    "entries",
    {
      id: Math.floor(Math.random() * 9999),
      content: editor.value.getHTML(),
      date: new Date().toLocaleDateString(),
      tags: [],
    },
    "entry"
  );
  editor.value.chain().clearContent();
  removeItem(session_keys.draft);
  router.push("session-archive");
}

//@ts-ignore
onMounted(async () => {
  await sessionGuard();
  // setInterval(() => {
  //   saveCountdown.value -= 1;
  //   if (saveCountdown.value === 0) {
  //     setStorage(session_keys.draft, editor.value.getHTML());
  //     $toast.warning(`${saveCountdown.value} Updated Session Draft`);
  //     saveCountdown.value = 30;
  //   }
  // }, 1000);
});
</script>
<style>
@import "@/assets/wysiwig.css";
@import "@/assets/tooltip.css";
@import "@/assets/dropdown.css";
.editor,
.contenteditable,
.ProseMirror,
.ProseMirror {
  position: relative;
  color: white;
  z-index: 20;
  background-color: black;
  min-height: 400px !important;
  max-height: 100vh;
  font-feature-settings: "liga" 0;
  overflow: auto;
}

.editor-buttons {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
}


.editor-title {
	background-color: rgb(25, 88, 65);
	padding: 0rem 1rem;
  border-radius: 1rem;
  position: absolute;
  font-size: 30px;
  color: white;
  z-index: 100;
  top: -30px;
  left: 30px;
}

button {
  background-color: black;
  color: gray;
  padding: 0.25rem;
}

.session-buttons {
	position: absolute;
	display: flex;
	justify-content: bottom;
	flex-direction: row-reverse;
	bottom: 0;
	right: 0;
	z-index: 999;
}

.session-buttons button {
  border-radius: 10px;
  border: none;
  margin: 1rem;
  color: rgb(255, 245, 153);
  box-shadow: none;
}

.countdown-tooltip {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
}

.countdown-container {
  align-self: center;
}
</style>
