<template>
  <div v-if="character" v-for="stat of stats">
    <div
      class="flex-col stat-block-main stat-block-center stat-title-container"
    >
      <div class="tooltip">
        <div class="stat-title">
          {{ stat.replace(stat.charAt(0), stat.charAt(0).toLocaleUpperCase()) }}
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
                v-model="character![skill as keyof Character].val"
                type="text"
            /></span>
            <span
              ><input
                name="prof"
                v-model="character![skill as keyof Character].proficiency"
                :checked="character![skill as keyof Character].proficiency"
                type="checkbox"
              />{{
                character![skill as keyof Character].proficiency ? "(P)" : ""
              }}</span
            ><br /><br />
          </span>
        </div>
      </div>
      <div>
        <span
          ><input
            class="score"
            v-model="character![stat as keyof Character].score"
        /></span>

        <span>
          <input
            class="modifier"
            v-model="character![stat as keyof Character].modifier"
        /></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, type Ref } from "vue";
import { Character, session_keys, skills, stats } from "../types/types";

import { useData } from "../composition/useData";
import { useModals } from "../composition/useModals";
import Modal_ from "../components/Modal_.vue";

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
