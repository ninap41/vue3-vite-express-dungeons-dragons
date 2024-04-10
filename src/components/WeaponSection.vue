<template>
  <div
    v-if="character"
    class="stat-block  stat-block-weapons flex-row text-green"
    style="margin: 0.5rem; justify-content: space-around"
  >
    <div style="flex: 1; margin: 1rem">
      <p class="stat-block-title glow">Attacks & Weapons</p>
      <button @click="open('createWeapon')" class="stat-block-create glow">
        +</button
      ><!-- @vue-ignore -->
      <div v-for="(attack, index) of character.attacks">
        <div class="flex-row">
          <div style="flex: 1">
            <div v-if="index === 0">-Name-</div>
            {{ attack.name || "None" }}
          </div>
          <div style="flex: 1">
            <div v-if="index === 0">-Bonus-</div>
            {{ attack.bonus || "None" }}
          </div>
          <div style="flex: 1; flex-basis: min-content">
            <div v-if="index === 0">-Damage-</div>
            {{ attack.damage || "None" }}
          </div>

          <button @click="deleteWeapon(index)" class="minus">
            <i class="pi pi-minus"></i> &nbsp;
          </button>
          <button
            @click="(weaponView = attack), open('viewWeapon');"
            class="edit"
          >
            VIEW
          </button>
        </div>
      </div>
    </div>
  </div>

  <Modal_ :isOpen="isOpen('createWeapon')" @modal-close="close('createWeapon')">
    <template #header><h3>Create Attack/Weapon</h3></template>
    <template #content>
      <div class="stat-block flex-col text-green" style="flex: 2">
        <div class="flex-col">
          <div class="flex-col">
            <div>
              <div>- Name -</div>
              <input type="text" class="stat-block-input" v-model="weapon_.name" />
            </div>
            <div>
              <div>- Bonus-</div>
              <input type="text" class="stat-block-input" v-model="weapon_.bonus" />
            </div>
            <div>
              <div>- Damage -</div>
              <input type="text" class="stat-block-input" v-model="weapon_.damage" />
            </div>
            <div>
              <div>- Description -</div>
              <textarea
                type="text"
                class="stat-block-input"
                v-model="weapon_.description"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="addNewWeapon()">
        Add New Attack Or Weapon
      </button></template
    >
  </Modal_>
  <!-- VIEW MODALs-->
  <Modal_ :isOpen="isOpen('viewWeapon')" @modal-close="close('viewWeapon')">
    <template #header><h3>Create Attack/Weapon</h3></template>
    <template #content>
      <div class="stat-block flex-col text-green" style="flex: 2">
        <div class="flex-col">
          <div>
            <div>- Name -</div>
            {{ weaponView.name }}
          </div>
          <br />
          <div>
            <div>- Bonus-</div>
            {{ weaponView.bonus }}
          </div>

          <br />
          <div>
            <div>- Damage-</div>
            {{ weaponView.damage }}
          </div>
          <br />

          <div>
            <div>- Description -</div>
            {{ weaponView.description }}
          </div>
          <br />
        </div>
      </div>
    </template>
  </Modal_>

  <!-- @vue-ignore -->
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, type Ref } from "vue";
import { useData } from "../composition/useData";
import { useModals } from "../composition/useModals";
import { Character } from "@/types/types";
import Modal_ from "@/components/Modal_.vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const props = defineProps({
  /* @ts-ignore */ character: Character,
});

const { saveCharacter } = useData();
const { isOpen, close, open } = useModals([]);

const weaponView = ref();
const weapon_ = ref({
  name: "",
  bonus: "",
  damage: "",
  description: "",
});
const addNewWeapon = async () => {
  /* @ts-ignore */
  character?.attacks.push(weapon_.value); /* @ts-ignore */
  await saveCharacter();
  close("createWeapon");
};

const deleteWeapon = async (idx: any) => {
  /* @ts-ignore */
  character?.attacks.splice(idx, 1); /* @ts-ignore */
  await saveCharacter(character);
};
</script>
