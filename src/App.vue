<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import "vue-toast-notification/dist/theme-sugar.css"
import Title from "./components/Title.vue"
import { onMounted, ref } from "vue"
import axios from "axios"
</script>
<!-- https://vue-final-modal.org/get-started/guide/setup -->
<template>
	<div>
		<header>
			<nav>
				<RouterLink to="/">Character Sheet</RouterLink>
				<RouterLink to="/create-update">Make/Edit Character</RouterLink>
				<RouterLink to="/session-notes">Notes</RouterLink>
				<RouterLink to="/archive">Archive</RouterLink>
				<RouterLink to="/world">World</RouterLink>
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

	border-radius: 15px;
	padding: 1rem;
}
</style>
