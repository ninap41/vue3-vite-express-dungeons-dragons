<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import "vue-toast-notification/dist/theme-sugar.css";
import Title from "./components/Title.vue";
import { onMounted, computed, ref, onRenderTriggered } from "vue";
import axios from "axios";
import router from "./router";
import { useLocalStorage } from "./composition/useLocalStorage";
import { session_keys } from "./types/types";
const { clear, getStorage, authenticated } = useLocalStorage();

const endSession = async () => {
  await router.push("/").then(() => {
    clear()
    window.location.reload()
  })
};

var auth = computed(() => authenticated())

</script>
<!-- https://vue-final-modal.org/get-started/guide/setup -->
<template>
  <div>
    <header>
      <nav v-if="auth">
	{{ auth }}
        <RouterLink to="/character-sheet">Campaign view</RouterLink>
        <RouterLink to="/update">Make/Edit Character</RouterLink>
        <RouterLink to="/session-notes">Notes</RouterLink>
        <RouterLink to="/session-archive">Session Archive</RouterLink>
        <RouterLink to="/world">World</RouterLink>
        <a class="end-session" @click="endSession()"
          ><span class="tooltip"
            >End Session
            <div class="tooltiptext">
              This will redirect you back to the Choose Character page
            </div>
          </span></a
        >
      </nav>
      <Title msg="dungeons&dragons" />
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
nav > a {
  margin-right: 1rem;
  text-decoration: none;
  color: hsla(160, 100%, 80%, 1);
  background-color: darkslategray;
  transition: 0.4s;
  cursor: pointer;
  border-radius: 15px;
  padding: 1rem;
}

.tooltiptext {
	font-size: 10px;
}
.end-session {
  background-color: rgb(79, 47, 47);

}
</style>
