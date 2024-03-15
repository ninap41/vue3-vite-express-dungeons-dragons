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
						<!-- <div class="tooltiptext">
							<div v-for="skill of skills[stat]"class="skills">
								<div :for="character[ skill as keyof Character ]">{{skill}}<br /></div>
								<input :name="skill.val" v-model="stat" type="text" /><input
									name="prof"
									:checked="skill.proficiency"
									type="checkbox"
								/>{{ character[ skill as keyof Character ].proficiency ? "Proficient" : "Not Proficient" }}
							</div>
						</div> -->
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
					<div><button > + </button></div>
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
				<span>this will start a campaign session for a NEW character that will be added to the characters database</span>
				<input type="text" id="character-name-input" v-model="newCharacterName" />
				<button class="new-character-button" @click="newCharacter">Create New One </button>
				<br />
			</div>
		</div>
	</div>
</div>


</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, computed, ref, Ref } from "vue"
import { useFileStorage } from "../composition/useFileStorage"
import { Character, session_keys } from "../types/types"
import { useToast } from "vue-toast-notification"
import router from "../router"

/* REFS */
var characters: Ref<Array<Character>> = ref() /* all characters from DB -  ex: [ { "id" : "1234", name: "VEN"}, { "id" : "1234", "name": "Frodo"}, ...] */
var character: Ref<Character> | undefined = ref() /* For Session On Each Page - ex: { "id": "1234", "name": "VEN" ...} */
var characterSessionLocalStorageKey: Ref<string>= ref()

var characterName: Ref<string> = ref("")  /*  Existing Character Selectfield Ref - Ex: "VEN" " */
var newCharacterName = ref("") /*  New Character Input Ref - Ex: "VEN2"  */

/* COMPOSITION  */
const { getAll, updateOne, getSessionCharacterToLocalStorage, setSessionCharacterToLocalStorage, createNewCharacter, scaffoldTables } =
	useFileStorage()
	const $toast = useToast()


/* DICTIONARY <KEYS> for CHARACTER class - for clean template rendering / loops */
const stats = ["intelligence", "strength", "constitution", "wisdom", "dexterity", "charisma"]
const members: any = [{name: "bubbles", description: "they have an ex who is a lobster", databaseRef: null}, {name: "tibbub", description: "they are stretchy and an ameoba dude", databaseRef: null},   {name: "The Wrestler", description: "They  have a secret identity that only comes forth in battle (soundtrack provided)", databaseRef: null}]

const skills: any = {
	intelligence: ["Arcana", "History", "Investigation", "Nature", "Religion"],
	strength: ["Athletics"],
	constitution: [],
	wisdom: ["Animal Handling", "Medicine", "Perception", "Survival", "Insight"],
	dexterity: ["Acrobatics", "Sleight Of Hand", "Stealth", "Stealth"],
	charisma: ["Deception", "Intimidation", "Performance", "Persuasion"],
}

/* FUNCTIONS */
const getCharacterData = async () => {
	return await getAll("characters")
}

const clear = () => {
	window.localStorage.clear()
	router.push("/")
	window.location.reload()
}

const saveCharacter = async () => {
	await updateOne("characters", character.value)
}


const newCharacter = () => {
	if (!newCharacterName.value || newCharacterName.value === "") {
		$toast.error("please fill out a character name before hitting subimit")
	} else {
		createNewCharacter(newCharacterName.value)
		setSessionCharacterToLocalStorage(session_keys.character, newCharacterName.value)
		$toast.open(`You created a new character named ${newCharacterName.value}. You have now started a <b>session</b> with this character and can edit attributes`)
		router.push("update")
	}
}

const chooseCharacter = async () => {
	if (characterName.value === "" || characterName.value === "--SELECT--") {
		$toast.error("Please select a character from the dropdown dingus")
	} else {
		setSessionCharacterToLocalStorage(session_keys.character, characterName.value)
		characterSessionLocalStorageKey.value = await getSessionCharacterToLocalStorage(session_keys.character, null)
		if (characterSessionLocalStorageKey.value) {
			console.log(characters)
			character.value =
				characters.value[characters.value.findIndex((c: Character) => c.name === characterSessionLocalStorageKey.value)]
			window.location.reload()
		}
	}
}

async function init () {
	characters.value = await getCharacterData()
	characterSessionLocalStorageKey.value = await getSessionCharacterToLocalStorage(session_keys.character, null)
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
#character-input ,#character-name-input {
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
#character-name-input{
	display: block;
	
}
.the-or {
	min-width:200px
}

.choose-character-child, .new-character-button  {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

.choose-character-button, .new-character-button {
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
