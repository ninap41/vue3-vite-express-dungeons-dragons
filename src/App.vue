<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router"
import HelloWorld from "./components/HelloWorld.vue"
</script>

<template>
	<div>
		<header>
			<nav>
				<RouterLink to="/">Character (home)</RouterLink>
				<RouterLink to="/notes">Notes</RouterLink>
				<RouterLink to="/archive">Archive</RouterLink>
				<RouterLink to="/world">World</RouterLink>
			</nav>
			<HelloWorld msg="dungeons&dragons" />
		</header>

		<RouterView />
	</div>
</template>

<style scoped>
nav > a {
	margin-right: 1rem;
	text-decoration: none;
	color: hsla(160, 100%, 80%, 1);
	transition: 0.4s;
	background-color: darkslategray;
	border-radius: 15px;
	padding: 1rem;
}
</style>
