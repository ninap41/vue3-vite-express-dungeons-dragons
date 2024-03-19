<template>
  <div v-if="character">
    <div class="flex-row flex-start save-character">
      <button @click="saveCharacter()">Save Character</button>
    </div>
    <br />
    <ul>
      Dev notes
      <li>- Convert Character into store or computed property</li>
      <li>- Click on character to show bonds ideals proficiency, languages</li>

      <li>- Add interactive map</li>
      <li>- Convert toast into comp function</li>
      <li>- clean up horrific css</li>
      <li>- add party member creation and custimization.</li>
      <li>
        - when clicking party member, spells, items, or name, show a conditional
        view in modal
      </li>
    </ul>
    <br /><br />
    <div class="flex-row flex-1 space-even">
      <div>
        Inspiration
        <div class="inspiration-container">
          <img class="pi-spin" src="../assets/img/dnddie.png" width="100px" />
          <input
            class=" inspiration-input"
            type="text"
            v-model="character.inspiration"
          />
        </div>
      </div>
      <div>
        Armor Class (AC):
        <input
          class="ability-saves"
          type="text"
          v-model="character.armorclass"
        />
      </div>
      <div>
        Ability Save (DC):
        <input
          class="ability-saves"
          type="text"
          v-model="character.abilitysaveDC"
        />
      </div>
      <div>
        Proficiency Bonus:<input
          class="ability-saves"
          type="text"
          v-model="character.proficiencybonus"
        />
      </div>
      <div>
        Passive Wisdom:
        <input
          class="ability-saves"
          type="text"
          v-model="character.passivewisdom"
        />
      </div>
      <div>
        Passive Perception:
        <input
          class="ability-saves"
          type="text"
          v-model="character.passiveintelligence"
        />
      </div>
      <div class="stat-block">
        <div class="text-green saving-throws">Saving Throws</div>
        <div class="death-successes">
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
        <div class="death-failures">
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
      <div class="tooltip">
        <!-- <i class="pi pi-money-bill " style="font-size: 2.5rem"></i> -->

        <img src="../assets/img/money.png" width="100px" />

        <div
          class="tooltiptext stat-block flex-row text-green"
          style="flex: 1; margin: 0.5rem; justify-content: space-around"
        >
          <div class="money" style="margin: 0.5rem">
            <ul>
              <li>
                <label for="cp">copper</label
                ><input
                  v-model="character.money.copper"
                  name="cp"
                  style="color: chocolate"
                />
              </li>
              <li>
                <label for="sp">silver</label
                ><input
                  v-model="character.money.silver"
                  style="color: silver"
                  name="sp"
                />
              </li>
              <li>
                <label for="gp">gold</label
                ><input
                  v-model="character.money.gold"
                  style="color: gold"
                  name="gp"
                />
              </li>
              <hr />
              <li>
                <label for="ep">electrum</label
                ><input
                  v-model="character.money.electrum"
                  style="color: green"
                  name="ep"
                />
              </li>

              <li>
                <label for="pp">platinum </label
                ><input
                  style="color: white"
                  :v-model="character.money.platinum"
                  :value="character.money.platinum"
                  name="pp"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="flex-row flex-1 space-even">
      <div v-for="stat of stats">
        <div class="flex-col stat-block stat-block-center stat-title-container">
          <div class="tooltip">
            <div class="stat-title">
              {{
                stat.replace(stat.charAt(0), stat.charAt(0).toLocaleUpperCase())
              }}
            </div>
            <div class="tooltiptext skill-text">
              <span v-for="skill of skills[stat]" class="skills">
                <span class="skill-name">{{
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
                    character[skill as keyof Character].proficiency ? "(P)" : ""
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
      <div
        class="stat-block stat-block-spells flex-col text-green"
        style="flex: 2"
      >
        <p class="stat-block-title glow">
          <i class="pi pi-bolt"></i>&nbsp;Spells
          <i class="pi pi-star"></i>&nbsp;
        </p>
        <div v-for="(spell, index) of character.spells">
          <div class="flex-row">
            <div style="flex: 1; flex-basis: min-content">
              <div style="margin-right: 4px" v-if="index === 0">- Name -</div>

              ({{ index + 1 }}) {{ spell.name || "None" }}
            </div>
            <div style="flex: 1; flex-basis: min-content">
              <div style="flex: 1; flex-basis: min-content" v-if="index === 0">
                - Lvl -
              </div>

              {{ spell.level || "None" }}
            </div>

            <button @click="open('createSpell')" class="add">
              <i class="pi pi-plus"></i>&nbsp;
            </button>
            <button @click="open('createSpell')" class="minus">
              <i class="pi pi-minus"></i> &nbsp;
            </button>
            <button @click="open('editSpell')" class="edit">
              <i class="pi pi-file-edit"></i>&nbsp;
            </button>
          </div>
        </div>
      </div>
      <div
        class="stat-block stat-block-items flex-col text-green"
        style="flex: 1; justify-content: space-around"
      >
        <p class="stat-block-title glow">Items & Equipment</p>
        <br />

        <div v-for="(item, index) of character.items">
          <div class="flex-row">
            <div style="flex: 1; flex-basis: min-content">
              <div v-if="index === 0">-Name-</div>
              {{ item.name || "None" }}
            </div>
            <div style="flex: 1">
              <div
                style="margin-right: 4px; flex: 1; flex-basis: min-content"
                v-if="index === 0"
              >
                -Qty-
              </div>
              {{ item.qty || "None" }}
            </div>
            <div style="flex: 1">
              <div
                style="margin-right: 4px; flex: 1; flex-basis: min-content"
                v-if="index === 0"
              >
                -Value-
              </div>
              {{ item.value || "?" }}
            </div>
            <div style="flex: 1"><Icon icon="mdi-light:binocular-solid" /></div>

            <button @click="open('createItem')" class="add">
              <i class="pi pi-plus"></i>&nbsp;
            </button>
            <button @click="open('deleteItem')" class="minus">
              <i class="pi pi-minus"></i> &nbsp;
            </button>
            <button @click="open('editItem')" class="edit">
              <i class="pi pi-file-edit"></i>&nbsp;
            </button>
          </div>
        </div>
      </div>
      <
    </div>
    <SessionNotes />
    <div
      class="stat-block flex-row text-green"
      style="flex: 1; margin: 0.5rem; justify-content: space-around"
    >
      <div style="flex: 2; margin: 0.5rem">hell</div>
      <div style="flex: 3; margin: 0.5rem">nah</div>
    </div>
  </div>

  <!-- ADD Item-->

  <Modal_
    :isOpen="isOpen('createItem')"
    @modal-close="close('createItem')"
    @submit="submitHandler"
    name="first-modal"
  >
    <template #header><h3>(Add item Modal)</h3></template>
    <template #content>
      <div class="stat-block flex-col text-green" style="flex: 2">
        <p class="stat-block-title">Create New Spell</p>
        <br />
        <div class="flex-row">
          <div>- Name -</div>
          <div>- Qty-</div>
        </div>

        <div class="flex-row">
          <div>
            <input type="text" class="spell-input" v-model="item.name" />
          </div>

          <div>
            <input type="text" class="spell-input" v-model="item.qty" />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="addNewItem()">Add New Item</button></template
    >
  </Modal_>
  <!-- ADD SPELL MODAL-->

  <Modal_
    :isOpen="isOpen('createSpell')"
    @modal-close="close('createSpell')"
    @submit="submitHandler()"
  >
    <template #header><h3>(Add Spell Modal)</h3></template>
    <template #content>
      <div class="stat-block flex-col text-green" style="flex: 2">
        <p class="stat-block-title">Create New Spell</p>
        <br />
        <div class="flex-row">
          <div>- Name -</div>
          <div>- Level / Cantrip-</div>
          <div>- Description -</div>
        </div>

        <div class="flex-row">
          <div>
            <input type="text" class="spell-input" v-model="spell.name" />
          </div>
          <div>
            <input type="text" class="spell-input" v-model="spell.level" />
          </div>
          <div>
            <input
              type="text"
              class="spell-input"
              v-model="spell.description"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="addNewSpell()">Add New Spell</button></template
    >
  </Modal_>
</template>

<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, Ref } from "vue";
import { useData } from "../composition/useData";
import { useModals } from "../composition/useModals";
import Modal_ from "../components/Modal_.vue";
import { useLocalStorage } from "../composition/useLocalStorage";
import { Character, session_keys, skills, stats } from "../types/types";
import { useToast } from "vue-toast-notification";
import router from "../router";
import SessionNotes from "./SessionNotes.vue";

/* REFS */
var characters: Ref<Array<Character>> =
  ref(); /* all characters from DB -  ex: [ { "id" : "1234", name: "VEN"}, { "id" : "1234", "name": "Frodo"}, ...] */
var character: Ref<Character> | undefined =
  ref(); /* For Session On Each Page - ex: { "id": "1234", "name": "VEN" ...} */
var characterSessionLocalStorageKey: Ref<string> = ref();
/* COMPOSITION  */
const spell = ref({
  name: "",
  level: "",
  description: "",
});

const item = ref({
  name: "",
  qty: "",
  description: "",
});
const { isOpen, open, close, submitHandler } = useModals([
  "createSpell",
  "editSpell",
  "viewSpell",
  "deleteSpellConfirmation",
  "createItem",
  "deleteItem",
  "editItem",
  "viewItem",
]);
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

const addNewSpell = async () => {
  character.value.spells.push(spell.value);
  await saveCharacter();
};

const addNewItem = async () => {
  character.value.items.push(spell.value);
  await saveCharacter();
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

.stat-title-container {
  position: relative;
  display: flex;
  flex-flow: column;
  font-size: 18px;
  color: greenyellow;
}

.stat-title {
  position: absolute;
  font-size: 16px;
  left: -10px;
  top: -24px;
  text-align: center;
}
.stat-block-title {
  position: absolute;
  font-size: 24px !important;
  left: 24px;
  top: -24px;
  margin: -81px 0px 0px 0px;
  background-color: rgb(25, 88, 65);
  padding: 0rem 1rem;
  border-radius: 1rem;
}
.stat-block {
  background-color: black;
  padding: 0.5rem;
  margin: 12px;
  border-radius: 12px;
  position: relative;
}

.stat-block-spells {
  padding-top: 25px;
}
.stat-block-center {
  text-align: center;
}

.stat-block-left {
  text-align: left;
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
  width: 70px;
  height: 25px;
  margin-left: 4px;
  padding: 4px;
  font-size: 12px;
  text-align: center;
}

ul {
  margin: 0;
  padding: 0 0.5 0.5 0.5rem;
  list-style: none;
}

.text-green {
  color: greenyellow;
}

.stat-block p {
  margin: 0 auto;
}

.spell-input {
  border: 1px dotted yellowgreen;
}

.add,
.minus,
.edit {
  width: 20px;
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
  border-radius: 50%;
  border: 1px solid yellowgreen;
  color: yellowgreen;
  background-color: none;
  display: flex;
  justify-content: center !important;
  cursor: pointer;
  align-items: center !important;
  align-self: end;
  text-align: center;
}

.money {
  margin: 0;
  padding: 0;
  text-align: left;
}
.money ul > li input {
  font-size: 20px;
}

.skill-name {
  font-size: 18px !important;
}
.inspiration-container {
  position: relative;
}

.inspiration {
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right: 0;
  z-index: 999;

}
.inspiration-input {
  position: absolute;

  font-size: 30px;
  z-index: 1200;
  background-color: none;
  background: none;
  left: 25px;
    right: 0;
    width: 100px;
    height: 100px;
}
.death-successes,
.saving-throws,
.death-failures {
  text-align: center;
}
</style>
../components/Modal_.vue../composition/useModals
