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
          <div v-if="index === 0">- Name -</div>

          ({{ index + 1 }}) {{ spell.name || "None" }}
        </div>
        <div style="flex: 1; flex-basis: min-content">
          <div v-if="index === 0">- Lvl -</div>
          {{ spell.level || "None" }}
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
      <div class="stat-block flex-col text-green" style="flex: 2">
        <div class="flex-col">
          <div>
            <div>- Name -</div>
            <input type="text" class="spell-input" v-model="spell_.name" />
          </div>
          <div>
            <div>- Level / Cantrip-</div>
            <input type="text" class="spell-input" v-model="spell_.level" />
          </div>
          <div>
            <div>- Description -</div>
            <textarea
              type="text"
              class="spell-input"
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
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, type Ref } from "vue";

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
  }
};
</script>
