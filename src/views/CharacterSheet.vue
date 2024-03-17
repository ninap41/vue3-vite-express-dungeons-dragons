<template>
  <div v-if="character" class="charsheet">
    <div class="flex-row flex-start">
      <button @click="saveCharacter()">Save Character</button>
    </div>
    <br />
    <div class="flex-row flex-1 space-even">
      <div v-for="stat of stats">
        <div class="flex-col stat-block stat-block-center stat-title">
          <div class="tooltip">
            {{
              stat.replace(stat.charAt(0), stat.charAt(0).toLocaleUpperCase())
            }}
            <div class="tooltiptext skill-text">
              <span v-for="skill of skills[stat]" class="skills">
                <span>{{
                  skill.replace(
                    skill.charAt(0),
                    skill.charAt(0).toLocaleUpperCase()
                  )
                }}</span>
                <span
                  ><input
                    name="val"
                    v-model="character[skill as keyof Character].val"
                    type="text"
                /></span>
                <span
                  ><input
                    name="prof"
                    v-model="character[skill as keyof Character].proficiency"
                    :checked="character[skill as keyof Character].proficiency"
                    type="checkbox"
                  />{{
                    character[skill as keyof Character].proficiency
                      ? "(Proficient)"
                      : ""
                  }}</span
                ><br /><br />
              </span>
            </div>
          </div>
          <div>
            <span
              ><input
                class="score"
                v-model="character[stat as keyof Character].score"
            /></span>

            <span>
              <input
                class="modifier"
                v-model="character[stat as keyof Character].modifier"
            /></span>
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

    <div class="flex flex-row space-even">
      <div class="stat-block flex-row" style="flex: 2">
        <p>Spells</p>
      </div>
      <div class="stat-block flex-row" style="flex: 2">
        <p>Items</p>
      </div>
      <div class="stat-block flex-row" style="flex: 1">
        <p>Money</p>
        <div class="money">
          <ul>
            <li>
              <label for="cp">cp</label
              ><input v-model="character.money.copper" name="cp" />
            </li>
            <li>
              <label for="sp">sp</label
              ><input v-model="character.money.silver" name="sp" />
            </li>
            <li>
              <label for="ep">ep</label
              ><input v-model="character.money.electrum" name="ep" />
            </li>
            <li>
              <label for="gp">gp</label
              ><input v-model="character.money.gold" name="gp" />
            </li>
            <li>
              <label for="pp">pp</label
              ><input
                :v-model="character.money.platinum"
                :value="character.money.platinum"
                name="pp"
              />
            </li>
          </ul>
        </div>
      </div>
      <div class="stat-block">
        <div class="deathsuccesses">
          <label>Successes</label>
          <div class="bubbles">
            <input
              name="deathsuccess1"
              v-model="character.successes[0]"
              type="checkbox"
            />
            <input
              name="deathsuccess2"
              v-model="character.successes[1]"
              type="checkbox"
            />
            <input
              name="deathsuccess3"
              v-model="character.successes[2]"
              type="checkbox"
            />
          </div>
        </div>
        <div class="deathfails">
          <label>Failures</label>
          <div class="bubbles">
            <input
              name="deathfail1"
              v-model="character.failures[0]"
              type="checkbox"
            />
            <input
              name="deathfail2"
              v-model="character.failures[1]"
              type="checkbox"
            />
            <input
              name="deathfail3"
              v-model="character.failures[2]"
              type="checkbox"
            />
          </div>
        </div>
      </div>

      <!-- <div v-for="member of members">
				<div class="flex flex-col">
					<div>{{ member.name }}</div>
					<div><button> + </button></div>
				</div>
			</div> -->
    </div>
  </div>
  <div v-else class="choose-character">
    Character not loaded... Er. Contact Me
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, Ref } from "vue";
import { useData } from "../composition/useData";

import { useLocalStorage } from "../composition/useLocalStorage";

import {
  Character,
  session_keys,
  members,
  skills,
  stats,
} from "../types/types";
import { useToast } from "vue-toast-notification";
import router from "../router";

/* REFS */
var characters: Ref<Array<Character>> =
  ref(); /* all characters from DB -  ex: [ { "id" : "1234", name: "VEN"}, { "id" : "1234", "name": "Frodo"}, ...] */
var character: Ref<Character> | undefined =
  ref(); /* For Session On Each Page - ex: { "id": "1234", "name": "VEN" ...} */
var characterSessionLocalStorageKey: Ref<string> = ref();

/* COMPOSITION  */
const { getAll, updateOne, createOne, deleteOne, getOne, isEmpty } = useData();
const { getStorage, clearStorage, clear, setStorage } = useLocalStorage();
const $toast = useToast();

/* DICTIONARY <KEYS> for CHARACTER class - for clean template rendering / loops */

/* FUNCTIONS */
const getCharacterData = async (): Promise<Array<Character>> => {
  return await getAll("characters");
};

const saveCharacter = async (): Promise<void> => {
  updateOne("characters", character.value, character.value.name);
  setStorage(session_keys.characterName, character.value.name);
};

async function init(): Promise<void> {
  characters.value = await getCharacterData();
  characterSessionLocalStorageKey.value = await getStorage(
    session_keys.characterName,
    null
  );
  if (characterSessionLocalStorageKey.value) {
    const charIndex = characters.value.findIndex(
      (c: Character) => c.name === characterSessionLocalStorageKey.value
    );
    if (charIndex === -1) router.push("/");
    else character.value = characters.value[charIndex];
  }
}

onMounted(async () => {
  init();
});
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

.flex-start {
  justify-content: start;
}
.flex-start button {
  margin: 0 12px;
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
  min-width: 200px;
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
  flex-direction: row;
}

.skill-text {
  font-size: 11px !important;
  width: 200px !important;
  text-align: left !important;
}
.skills {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0;
}

.skills input {
  width: 20px;
}

.money ul > li input {
  border: 1px solid black;
  border-radius: 10px;
  width: 25px;
  height: 25px;

  padding: 4px;
  font-size: 12px;
  text-align: center;
}
</style>