<template>
	<div v-if="character" class="charsheet">
		<h1><button @click="saveCharacter">Save Character</button></h1>
		<button>toggle color</button>

		<button @click="clear()">End Session</button>
		<div class="flex-row flex-1 space-even">
			<div v-for="stat of stats">
				<div class="flex-col stat-block stat-block-center stat-title">
					<div class="tooltip">
						{{ stat.replace(stat.charAt(0), stat.charAt(0).toLocaleUpperCase()) }}
						<div class="tooltiptext">
							<!-- <div class="skills">
								<div for="Acrobatics">Acrobatics (Dex)<br /></div>
								<input name="Acrobatics" v-model="character.acrobatics.val" type="text" /><input
									name="Acrobatics-prof"
									:checked="character.acrobatics.proficiency"
									type="checkbox"
								/>{{ character.acrobatics.proficiency ? "Proficient" : "Not Proficient" }}
							</div> -->
						</div>
					</div>
					<div>
						<span><input class="score" v-model="character[stat as keyof Character].score" /></span>
						<span> <input class="modifier" v-model="character[stat as keyof Character].modifier" /></span>
					</div>
				</div>
			</div>
			<div>
				<div class="stat-block stat-block-left">
					<div>Name: <input v-model="character.name" /></div>
					<div>Class & Lvl:<input v-model="character.classlevel" /></div>
					<div>Race: <input v-model="character.race" /></div>
					<div>Background:<input v-model="character.background" /></div>
				</div>
			</div>
		</div>
		<div class="flex flex-1 space-even">
			<div class="flex-col">Party Members<br /></div>
			<div v-for="member of members">{{ member }} // check if character exists</div>
		</div>
	</div>

	<!-- Choose character-->
	<div v-else class="choose-character">
		<p class="green glow glow-medium">Choose Character</p>
		<div v-if="characters">
			<div class="dropdown-container flex-row">
				<div class="choose-character-child">
					<span>this will start a campaign session for editing an existing character in the database</span>
					<select v-model="characterName" id="character-select">
						<option value="">Choose Your Character</option>

						<option v-for="char_ of characters" v-bind:value="char_.name">{{ char_.name }}</option>
					</select>
					<button class="choose-character-button" @click="chooseCharacter()">Set Session</button>
				</div>
				<div class="choose-character-child glow glow-small">OR</div>
				<div class="choose-character-child">
					<span>this will start a campaign session for a NEW character that will be added to the characters database</span>

					<input type="text" id="character-input" v-model="newCharacterName" />
					<button class="choose-character-button" @click="newCharacter()">Create New One</button>
					<br />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, computed, ref, Ref } from "vue"

var characters = ref() // all characters from DB
var character: Ref<Character> | undefined = ref() //Session
var characterSession = ref()
var characterName = ref("") //existing
//new char
var newCharacterName = ref("")
const stats = ["intelligence", "strength", "constitution", "wisdom", "dexterity", "charisma"]
import { useFileStorage } from "../composition/useFileStorage"
import { Character, session_keys } from "../types/types"
import { useToast } from "vue-toast-notification"
import router from "../router"
const { getAll, updateOne, getSessionCharacterToLocalStorage, setSessionCharacterToLocalStorage, createNewCharacter } =
	useFileStorage()
const $toast = useToast()

const skills: any = {
	intelligence: ["Arcana", "History", "Investigation", "Nature", "Religion"],
	strength: ["Athletics"],
	constitution: [],
	wisdom: ["Animal Handling", "Medicine", "Perception", "Survival", "Insight"],
	dexterity: ["Acrobatics", "Sleight Of Hand", "Stealth", "Stealth"],
	charisma: ["Deception", "Intimidation", "Performance", "Persuasion"],
}
const members = ["bubbles", "tibbub", "wrestler"]

const getCharacterData = async () => {
	return await getAll("characters")
}
const clear = () => {
	window.localStorage.clear()
}

const saveCharacter = async () => {
	await updateOne("characters", character.value)
}
onBeforeMount(async () => {
	characters.value = await getCharacterData()
	characterSession.value = await getSessionCharacterToLocalStorage("session_keys.character", null)
	if (characterSession.value) {
		alert(characterSession.value)
		character.value = characters.value[characters.value.findIndex((c: Character) => c.name === characterSession.value)]
	}
})

const newCharacter = () => {
	if (!newCharacterName.value || newCharacterName.value === "") {
		$toast.error("please fill out a character name before hitting subimit")
	} else {
		var temp = new Character(newCharacterName.value)
		createNewCharacter(temp.name)
		setSessionCharacterToLocalStorage(session_keys.character, newCharacterName.value)
		window.location.reload()
	}
}
const chooseCharacter = async () => {
	if (characterName.value === "" || characterName.value === "--SELECT--") {
		$toast.error("Please select a character from the dropdown dingus")
	} else {
		setSessionCharacterToLocalStorage(session_keys.character, characterName.value)
		characterSession.value = await getSessionCharacterToLocalStorage(session_keys.character, null)
		if (characterSession.value) {
			console.log(characters.value)
			character.value =
				characters.value[characters.value.findIndex((c: Character) => c.name === characterSession.value.name)]
			window.location.reload()
		}
	}
}
</script>

<style scoped>
@import "@/assets/wysiwig.css";
@import "@/assets/tooltip.css";
@import "@/assets/dropdown.css";

.flex-row {
	display: flex;
	flex-direction: row;
}
.space-even {
	justify-content: space-evenly;
}

.flex-col {
	display: flex;
	flex-direction: column;
}
.stat-block {
	background-color: black;
	padding: 0.5rem;
	border-radius: 12%;
}
.stat-block-center {
	text-align: center;
}
.stat-block-left {
	text-align: left;
}

.stat-title {
	font-size: 18px;
	color: greenyellow;
}
.modifier {
	width: 20px;
	border: none;
}
.score {
	border-radius: 6px;
	width: 50px;
	font-size: 40px;
}

.skills {
	width: 100%;
}
input {
	color: white;
	border: none;
	background-color: black;
}

#character-select,
#character-input {
	min-width: 300px;
	border-radius: 12px;
	background-color: rgb(52, 118, 54);
	height: 30px;
	margin: 12px;
	color: white;
	font-weight: bold;
	font-size: 16px;
	text-align: center;
}

.choose-character-child {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.choose-character-button {
	border-radius: 12px;
	background-color: rgb(47, 79, 79);
	color: yellowgreen;
	padding: 1rem;
	width: 100%;
	border: none;
}
.choose-character {
	max-width: 80%;
	margin: 0 auto;
}
.flex-row {
	display: flex;
	justify-content: space-evenly;
	flex-direction: row;
}
</style>
