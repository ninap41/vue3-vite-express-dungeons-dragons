<template>
  <div
    v-if="character"
    class="stat-block stat-block-spells flex-col text-green"
  >
    <p class="stat-block-title glow">
      <i class="pi pi-bolt"></i>&nbsp;Spells <i class="pi pi-star"></i>&nbsp;
    </p>
    <button @click="open('createSpell')" class="stat-block-create glow">
      +

    </button>
    <div v-for="(spell, index) of character.spells">
      <div class="flex-row">
        <div style="flex: 1; flex-basis: min-content">
          <div v-if="index === 0" class="stat-block-subtitle">
            - Name -<br />
          </div>
          {{ spell.level }}

          <span class="stat-block-cell"> ({{ index + 1 }}) {{ spell.name || "None" }}</span>
        </div>
        <div style="flex: 1; flex-basis: min-content">
          <div v-if="index === 0" class="stat-block-subtitle">
            - Lvl -<br />
          </div>
          <span class="stat-block-cell">{{ spell.level || "None" }}</span>
        </div>

        <button @click="deleteSpell(index)" class="minus">
          <i class="pi pi-minus"></i> &nbsp;
        </button>
        <button @click="(spellView = spell), open('viewSpell')" class="edit">
          VIEW
        </button>
      </div>
    </div>
  </div>
  <!-- @vue-ignore -->
  <Modal_ :isOpen="isOpen('createSpell')" @modal-close="close('createSpell')">
    <template #header> <h3>Create New Spell</h3></template>
    <template #content>
      <div class="stat-block flex-col text-green">
        <div class="flex-col">
          <div class="stat-block-subtitle">- Name -</div>
          <input type="text" class="stat-block-input" v-model="spell_.name" />
          <div class="stat-block-subtitle">- Level / Cantrip -</div>
          <input type="text" class="stat-block-input" v-model="spell_.level" />
          <div class="stat-block-subtitle">
            <div class="stat-block-subtitle">- Description -</div>
            <textarea
              type="text"
              class="stat-block-input"
              v-model="spell_.description"
            ></textarea>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="addNewSpell()">Add New Spell</button></template
    >
  </Modal_>
  <!-- @vue-ignore -->

  <!-- @vue-ignore -->
  <Modal_ :isOpen="isOpen('viewSpell')" @modal-close="close('viewSpell')">
    <template #header>
      <div class="spell-name glow">
        {{ spellView.name }}
      </div>
      <div class="spell-level">
        Level &nbsp;<span class="spell-level-value">{{
          spellView.level !== String(0) ? spellView.level : "(Cantrip)"
        }}</span>
      </div>
    </template>
    <template #content>
      <div class="stat-block flex-col text-green" style="flex: 2">
        <div class="flex-col">
          <br />
          <div>
            <div class="stat-block stat-block-subtitle">- Description -</div>
            {{ spellView.description }}
            Casting Time: 1 action, Range: 60 feet, Target: A creature that you
            can see within range, Components: V S, Duration: Instantaneous,
          </div>
          <br />
        </div>
      </div>
    </template>
  </Modal_>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, type Ref, computed, onMounted } from "vue";

import { useData } from "../composition/useData";
import { useModals } from "../composition/useModals";
import { Character } from "@/types/types";
import Modal_ from "@/components/Modal_.vue";

const props = defineProps({
  /* @ts-ignore */ character: Character,
});

const { saveCharacter } = useData();
const { isOpen, close, open } = useModals([]);

const spellView = ref();
const spellLevels = () => {
  if(props.character  ) { //@ts-ignore
    // let spells = props.character.value.spells
    // let min = Math.min(...spells.map((spell: any) => spell.lvl))
    // console.log(spells)
    // console.log([spells)
    let max;
  }

}

onMounted(() => {
  spellLevels()

})

const spell_ = ref({
  name: "",
  level: "",
  description: "",
});
const deleteSpell = async (idx: any) => {
  if (props.character) {
    // @ts-ignore
    props.character.spells.splice(idx, 1); /* @ts-ignore */
    await saveCharacter(props.character);
    close("createSpell");
  }
};
const addNewSpell = async () => {
  if (props.character) {
    // @ts-ignore
    props.character.spells.push(spell_.value); /* @ts-ignore */
    await saveCharacter(props.character);
    close("newSpell")
  }
};
</script>

<style lang="scss">
.spell-level {
  position: relative;
  font-size: 0.75rem;
  display: flex;
  float: right;
  z-index: 30;
}
.spell-level-value {
  color: gold;
}

.spell-name {
  position: relative;
  font-size: 2rem;
  color: rgb(209, 233, 173);
  display: flex;
  float: left;
  z-index: 30;
}
.stat-block-cell {
  font-size: 10px;
}
</style>
