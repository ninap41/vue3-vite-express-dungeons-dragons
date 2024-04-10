<template>
	<div v-if="character">
		<div class="flex-row flex-start save-character-button">
			<button @click="saveCharacter(character)">Save Character</button>
		</div>

		<div class="flex-row flex-1 space-even">
			<div>
				inspiration
				<div class="inspiration-stat-container">
					<img class="pi-spin" src="../assets/img/dnddie.png" width="100px" />
					<input class="inspiration-stat-container-input" type="text" v-model="character.inspiration" />
				</div>
			</div>
			<div class="passive-skills">
				Armor <br />Class (AC)
				<input class="ability-saves" type="text" v-model="character.armorclass" />
			</div>
			<div class="passive-skills">
				Ability <br />Save (DC)
				<input class="ability-saves" type="text" v-model="character.abilitysaveDC" />
			</div>
			<div class="passive-skills">
				Proficiency <br />Bonus<input class="ability-saves" type="text" v-model="character.proficiencybonus" />
			</div>
			<div class="passive-skills">
				Passive<br />
				Wisdom
				<input class="ability-saves" type="text" v-model="character.passivewisdom" />
			</div>
			<div class="passive-skills">
				Passive <br />Perception
				<input class="ability-saves" type="text" v-model="character.passiveintelligence" />
			</div>
			<div class="stat-block">
				<div class="text-green saving-throws">Saving Throws</div>
				<div class="death-successes">
					<label>Successes</label>
					<div class="bubbles">
						<input name="deathsuccess1" v-model="character.successes[0]" type="checkbox" />
						<input name="deathsuccess2" v-model="character.successes[1]" type="checkbox" />
						<input name="deathsuccess3" v-model="character.successes[2]" type="checkbox" />
					</div>
				</div>
				<div class="death-failures">
					<label>Failures</label>
					<div class="bubbles">
						<input name="deathfail1" v-model="character.failures[0]" type="checkbox" />
						<input name="deathfail2" v-model="character.failures[1]" type="checkbox" />
						<input name="deathfail3" v-model="character.failures[2]" type="checkbox" />
					</div>
				</div>
			</div>
			<div>
				<!-- <i class="pi pi-money-bill " style="font-size: 2.5rem"></i> -->

				<img src="../assets/img/money.png" width="100px" @click="toggleMoney = !toggleMoney" />

				<div
					v-if="toggleMoney"
					class="tooltiptext stat-block flex-row text-green"
					style="flex: 1; margin: 0.5rem; justify-content: space-around"
				>
					<div class="money" style="margin: 0.5rem">
						<ul>
							<li>
								<label for="cp">copper</label><input v-model="character.money.copper" name="cp" style="color: chocolate" />
							</li>
							<li><label for="sp">silver</label><input v-model="character.money.silver" style="color: silver" name="sp" /></li>
							<li><label for="gp">gold</label><input v-model="character.money.gold" style="color: gold" name="gp" /></li>
							<hr />
							<li>
								<label for="ep">electrum</label><input v-model="character.money.electrum" style="color: green" name="ep" />
							</li>

							<li>
								<label for="pp">platinum </label
								><input style="color: white" :v-model="character.money.platinum" :value="character.money.platinum" name="pp" />
							</li>
						</ul>
					</div>
				</div>

				<div>
					Hit Dice: {{ character.hitdice }}<br />
					Total Hit Dice: {{ character.totalhitdice }}
				</div>
			</div>
		</div>
		<hr />
		<div class="flex-row flex-1 space-even">
	<StatSection :character="character"></StatSection>

			<div>
				<div class="stat-block stat-block-left">
					<div>Name: <input v-model="character.name" /></div>
					<div>Class & Lvl:<input v-model="character.classlevel" /></div>
					<div>Race: <input v-model="character.race" /></div>
					<div>Background:<input v-model="character.background" /></div>
					<button class="tooltip">
						<i class="pi pi-question"></i> Party Members <i class="pi pi-question"></i>
						<div class="tooltiptext">
							<div v-for="(member, index) of character.partyMembers">
								{{ member.name }}{{ index !== character.partyMembers.length - 1 ? "," : "" }}
							</div>
						</div>
					</button>
				</div>
			</div>
		</div>

		<div class="flex flex-row">
			<SpellSection :character="character"></SpellSection>
			<ItemSection :character ="character"></ItemSection>
		</div>
		<SessionNotes />
		<br>
		<WeaponSection :character="character"></WeaponSection>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, ref} from "vue"
import ItemSection  from "@/components/ItemSection.vue"
import SpellSection from "@/components/SpellSection.vue" // @ts-ignore
import WeaponSection from "@/components/WeaponSection.vue"  // @ts-ignore
import StatSection from "@/components/StatSection.vue"
import { useData } from "@/composition/useData"
import { useModals } from "@/composition/useModals"
import Modal_ from "@/components/Modal_.vue"
import { useLocalStorage } from "@/composition/useLocalStorage"
import { Character, session_keys, skills, stats } from "@/types/types"
import { useToast } from "vue-toast-notification"
import router from "@/router"
import SessionNotes from "@/views/SessionNotes.vue"

/* REFS */
var toggleMoney = ref(false)
/* all characters from DB -  ex: [ { "id" : "1234", name: "VEN"}, { "id" : "1234", "name": "Frodo"}, ...] */
var characters = ref() 
var character = ref() /* For Session On Each Page - ex: { "id": "1234", "name": "VEN" ...} */
var characterSessionLocalStorageKey = ref()
/* COMPOSITION  */



const { isOpen, open, close } = useModals([])
const { getAll, updateOne, createOne, deleteOne, getOne, isEmpty, saveCharacter, getCharacterData } = useData()
const { getStorage, clearStorage, clear, setStorage } = useLocalStorage()
const $toast = useToast()



async function init(): Promise<void> {
	characters.value = await getCharacterData()
	characterSessionLocalStorageKey.value = await getStorage(session_keys.characterName)
	if (characterSessionLocalStorageKey.value) {
		const charIndex = characters.value.findIndex((c: Character) => c.name === characterSessionLocalStorageKey.value)
		if (charIndex === -1) router.push("/")
		else character.value = characters.value[charIndex]
	}
}

onMounted(async () => {
	init()
})
</script>

<style lang="scss">
@import "@/assets/wysiwig.css";
@import "@/assets/tooltip.css";
@import "@/assets/dropdown.css";

/* universal */

.flex {
	display: flex;

	&-row {
		flex-direction: row;
	}
	&-col {
		flex-direction: column;
	}
}

.flex-row {
	display: flex;
	flex-direction: row;
}

.space-even {
	justify-content: space-evenly;
}


input {
	color: white;
	border: none;
	background-color: black;
}

.stat-block-input {
	color: black;
	border-radius: 4px;
	width: 100%;
	background-color: greenyellow;
}

textarea {
	min-height: 400px;
}
/*  */

.passive-skills {
	color: greenyellow;
	text-align: center;
}

.stat-title {
	color: greenyellow;
	left: -10px;
	top: -24px;
	text-align: center;
	&-container {
		position: relative;
		display: flex;
	}
}

.stat-block-main {
	text-align: center;
}

.stat-block {
	background-color: black;
	padding: 0.5rem;
	margin: 12px;
	border-radius: 12px;
	position: relative;
	text-align: left;

	&-spells, &-items, &-weapons {
		padding-top: 25px;
		margin-top:25px;
		width: 100%;
	}

	& p {
		margin: 0 auto;
	}
	&-title {
		position: absolute;
		font-size: 24px !important;
		left: 24px;
		top: -24px;
		margin: -81px 0px 0px 0px;
		background-color: rgb(25, 88, 65);
		padding: 0rem 1rem;
		border-radius: 1rem;
	}
	&-create {
		position: absolute;
		font-size: 20px !important;
		right: 0px;
		top: 0px;
		background-color: rgb(25, 88, 65);
		padding: 0rem 1rem;
		border-radius: 1rem;
	}
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

.the-or {
	min-width: 200px;
}

.choose-character-child,
.new-character-button,
.choose-character-button {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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

.skills {
	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: flex-start;
	margin: 0;
	width: 100%;

	& input {
		width: 20px;
	}
	&-text {
		font-size: 11px !important;
		width: 200px !important;
		text-align: left !important;
	}
}

.skill-name,
.stat-title {
	font-size: 18px !important;
}

ul {
	margin: 0;
	padding: 0 0.5 0.5 0.5rem;
	list-style: none;
}

.add,
.minus {
	width: 20px;
	height: 20px;
	font-size: 10px;
}

.edit {
	width: 40px;
	height: 20px;
	font-size: 10px;
}

.ability-saves {
	width: 60px;
	height: 60px;
	text-decoration: dotted;
	font-size: 24px;
}
.ability-saves,
.add,
.minus,
.edit {
	border: 1px solid yellowgreen;
	color: yellowgreen;
	background-color: none;
	display: flex;
	justify-content: center !important;
	cursor: pointer;
	align-items: center !important;
	align-self: end;
}

.money {
	margin: 0;
	padding: 0;
	text-align: left;
	& ul > li input {
		border: 1px solid black;
		border-radius: 10px;
		width: 70px;
		height: 25px;
		margin-left: 4px;
		padding: 4px;
		font-size: 12px;
		text-align: center;
		font-size: 20px;
	}
}

.inspiration-stat {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 999;
	&-container {
		position: relative;
		&-input {
			position: absolute;
			font-size: 30px;
			z-index: 1200;
			background: none;
			left: 25px;
			right: 0;
			width: 100px;
			height: 100px;
		}
	}
}

.death-successes,
.saving-throws,
.death-failures,
.ability-saves {
	text-align: center;
}

input {
	color: white;
	border: none;
	background-color: black;
}

.choose-character {
	max-width: 80%;
	margin: 0 auto;
}
</style>
