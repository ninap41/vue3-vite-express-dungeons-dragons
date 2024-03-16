<template>
	<div v-if="character" class="charsheet">
 <h1><button @click="saveCharacter()">Save Character</button></h1>
		<button>toggle color</button>

		<button @click="clear()">End Session</button>
		<div class="flex-row flex-1 space-even">
			<div v-for="stat of stats">
				<div class="flex-col stat-block stat-block-center stat-title">
					<div class="tooltip">
						{{ stat.replace(stat.charAt(0), stat.charAt(0).toLocaleUpperCase()) }}
						<div class="tooltiptext skill-text">
							<span v-for="skill of skills[stat]" class="skills">		
								<span>{{skill}}</span>
							<span><input name="val" v-model="character[skill as keyof Character].val" type="text" /></span>
							<span><input name="prof" v-model="character[skill as keyof Character].proficiency"  :checked="character[skill as keyof Character].proficiency"
									type="checkbox"
								/>{{  character[skill as keyof Character].proficiency ? '(Proficient)':'' }}</span><br><br>
							</span>
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

			<div v-for="member of members">

				<div class="flex flex-col">
					<div>{{ member.name }}</div>
					<div><button> + </button></div>
				</div>
			</div>
		</div> 
	</div>
	<div v-else class="choose-character">


		<!-- Choose character-->
		<p class="green glow glow-medium">Choose Character</p>
		<div v-if="characters">
			<div class="dropdown-container flex-row">
				<!-- Choose Character -->
				<div class="choose-character-child">
					<span>This will start a campaign session for editing an existing character in the database</span>
					<select v-model="characterName" id="character-select">
						<option value="">Choose Your Character</option>
						<option v-for="char_ of characters" v-bind:value="char_.name">{{ char_.name }}</option>
					</select>
					<button class="choose-character-button" @click="chooseCharacter">Set Session </button>
				</div>
				<!-- OR-->
				<div class="new-character-child glow glow-small the-or">OR</div>
				<!-- Create New Character -->
				<div class="new-character-child">
					<span>this will start a campaign session for a NEW character that will be added to the characters
						database</span>
					<input type="text" id="character-name-input" v-model="newCharacterName" />
					<button class="new-character-button" @click=" newCharacter">Create New One </button>
					<br />
				</div>
			</div>
		</div>
	</div>


</template>

<script lang="ts" setup>
import { onBeforeMount, ref, Ref } from "vue"
import { useData } from "../composition/useData"

import { useLocalStorage } from "../composition/useLocalStorage"

import { Character, session_keys } from "../types/types"
import { useToast } from "vue-toast-notification"
import router from "../router"

/* REFS */
var characters: Ref<Array<Character>> = ref() /* all characters from DB -  ex: [ { "id" : "1234", name: "VEN"}, { "id" : "1234", "name": "Frodo"}, ...] */
var character: Ref<Character> | undefined = ref() /* For Session On Each Page - ex: { "id": "1234", "name": "VEN" ...} */
var characterSessionLocalStorageKey: Ref<string> = ref()

var characterName: Ref<string> = ref("")  /*  Existing Character Selectfield Ref - Ex: "VEN" " */
var newCharacterName = ref("") /*  New Character Input Ref - Ex: "VEN2"  */

/* COMPOSITION  */
const { getAll, updateOne, createOne, deleteOne, getOne, isEmpty } = useData()
const { getStorage, setStorage, retrieveDraftFromLocalStorage, clearStorage} = useLocalStorage()
const $toast = useToast()

/* DICTIONARY <KEYS> for CHARACTER class - for clean template rendering / loops */
const stats = ["intelligence", "strength", "constitution", "wisdom", "dexterity", "charisma"]
const members: any = [{ name: "bubbles", description: "they have an ex who is a lobster", databaseRef: null }, { name: "tibbub", description: "they are stretchy and an ameoba dude", databaseRef: null }, { name: "The Wrestler", description: "They  have a secret identity that only comes forth in battle (soundtrack provided)", databaseRef: null }]

const skills: any = {
	intelligence: ["arcana", "history", "investigation", "nature", "religion"],
	strength: ["athletics"],
	constitution: [],
	wisdom: ["animalhandling", "medicine", "perception", "survival", "insight"],
	dexterity: ["acrobatics", "sleightofhand", "stealth", "stealth"],
	charisma: ["deception", "intimidation", "performance", "persuasion"],
}

/* FUNCTIONS */
const getCharacterData = async () => {
	return await getAll("characters")
}

const saveCharacter = async () => {
	 updateOne("characters", character.value, character.value.name)
}

const newCharacter = async () => {
	if (isEmpty(newCharacterName)) {
		$toast.error("please fill out a character name before hitting subimit")
	} else {
		var char: Character = new Character(newCharacterName.value)
		await createOne("characters", char, "character")
		await setStorage(session_keys.characterName, newCharacterName.value)
		$toast.success(`You created a new character named ${newCharacterName.value}. You have now started a <b>session</b> with this character and can edit attributes`)
		router.push('update')
	}
}

const chooseCharacter = async () => {
	if (isEmpty(characterName)) {
		$toast.error("Please select a character from the dropdown dingus")
	} else {
		setStorage(session_keys.characterName, characterName.value)
		characterSessionLocalStorageKey.value = await getStorage(session_keys.characterName, null)
		if (characterSessionLocalStorageKey.value) {
			var chosen = characters.value[characters.value.findIndex((c: Character) => c.name === characterSessionLocalStorageKey.value)]
			character.value = chosen			
			window.location.reload()
		}
	}
}

const clear = async () => {
	await clearStorage()
	router.push("/")
	window.location.reload()
}

async function init() {
	characters.value = await getCharacterData()
	characterSessionLocalStorageKey.value = await getStorage(session_keys.characterName, null)
	if (characterSessionLocalStorageKey.value) {
		character.value = characters.value[characters.value.findIndex((c: Character) => c.name === characterSessionLocalStorageKey.value)]
	}
}

onBeforeMount(async () => {
	init()
})

</script>

<style scoped>
@import "@/assets/wysiwig.css";
@import "@/assets/tooltip.css";
@import "@/assets/dropdown.css";
/* universal */

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

input {
	color: white;
	border: none;
	background-color: black;
}

/*  */

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

#character-select,
#character-input,
#character-name-input {
	min-width: 300px;
	border-radius: 12px;
	background-color: rgb(52, 118, 54);
	height: 30px;

	margin: 23px auto;
	color: white;
	font-weight: bold;
	font-size: 16px;
	text-align: center;
}

#character-name-input {
	display: block;

}

.the-or {
	min-width: 200px
}

.choose-character-child,
.new-character-button {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.choose-character-button,
.new-character-button {
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

.skill-text {
	
	font-size:11px !important;
	width: 200px !important;
	text-align: left !important;
}
.skills {
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content:flex-start;
	margin: 0;
}

.skills input {
	width: 20px
}

</style>
