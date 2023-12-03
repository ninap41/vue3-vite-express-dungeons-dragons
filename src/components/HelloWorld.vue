<script setup lang="ts">
defineProps<{
	msg: string
}>()
</script>

<template>
	<div class="greetings">
		<h1 class="green glow">{{ msg }}</h1>
		<h3>
			Dungeons And Dragons notes app and character app.
			<a href="https://www.dndbeyond.com/" target="_blank" rel="noopener">D&d Beyond</a> +
			<a href="https://www.dndbeyond.com/spells" target="_blank" rel="noopener">Spells</a>. What's next?
		</h3>
	</div>
</template>

<style scoped>
h1 {
	font-weight: 500;
	font-size: 2.6rem;
	position: relative;
}

h3 {
	font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
	text-align: center;
}
.greetings h3 {
	margin-top: -30px;
	text-align: right;
}
@media (min-width: 1024px) {
	.greetings h1 {
		text-align: right;
	}
}
.greetings h1 {
	letter-spacing: 9px;
	font-weight: 100;
}
</style>
