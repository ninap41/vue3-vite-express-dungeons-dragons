<template>
  <div v-if="character" class="stat-block stat-block-items flex-col text-green">
    <p class="stat-block-title glow">Items & Equipment</p>
    <button @click="open('createItem')" class="stat-block-create glow">
       +
    </button>
    <br />

    <!-- @vue-ignore -->
    <div v-for="(item, index) of character.items">
      <div class="flex-row">
        <div style="flex: 2; flex-basis: min-content">
          <div v-if="index === 0">-Name-</div>
          {{ item.name || "None" }}
        </div>
        <div style="flex: 1">
          <div v-if="index === 0">-Qty-</div>
          {{ item.qty || "None" }}
        </div>

        <div style="flex: 1"><Icon icon="mdi-light:binocular-solid" /></div>

        <button @click="deleteItem(index)" class="minus">
          <i class="pi pi-minus"></i> &nbsp;
        </button>
        <button @click="(itemView = item), open('viewItem')" class="edit">
          VIEW
        </button>
      </div>
    </div>
  </div>
  <!-- VIEW ITEM-->
  <!-- @vue-ignore -->
  <Modal_ :isOpen="isOpen('viewItem')" @modal-close="close('viewItem')">
    <template #header><h3>Item</h3></template>
    <template #content>
      <div class="stat-block flex-col text-green" style="flex: 2">
        <div class="flex-col">
          <div>
            <div>- Name -</div>
            {{ itemView.name }}
          </div>
          <br />
          <div>
            <div>- Qty-</div>
            {{ itemView.qty }}
          </div>
          <br />
          <div>
            <div>- Description -</div>
            {{ itemView.description }}
          </div>
          <br />
        </div>
      </div>
    </template>
  </Modal_>
  <!-- ADD ITEM-->

  <!-- @vue-ignore -->
  <Modal_ :isOpen="isOpen('createItem')" @modal-close="close('createItem')">
    <template #header><h3>Add Item</h3></template>
    <template #content>
      <div class="stat-block flex-col text-green" style="flex: 2">
        <br />
        <div class="flex-col">
          <div>
            <div>- Name -</div>
            <input type="text" class="stat-block-input" v-model="item_.name" />
          </div>

          <div>
            <div>- Qty-</div>
            <input type="text" class="stat-block-input" v-model="item_.qty" />
          </div>
          <div>
            <div>- Description-</div>
            <textarea
              type="text"
              class="stat-block-input"
              v-model="item_.description"
            />
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="addNewItem()">Add New Item</button></template
    >
  </Modal_>
  <!-- EDIT ITEM-->
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

import { useData } from "../composition/useData";
import { useModals } from "../composition/useModals";
import { Character } from "@/types/types";
import Modal_ from "@/components/Modal_.vue";

const props = defineProps({
  //@ts-ignore
  character: Character,
});

const { saveCharacter } = useData();
const { isOpen, close, open } = useModals([]);

const itemView = ref();

const item_ = ref({
  name: "",
  qty: "",
  description: "",
});

const deleteItem = async (idx: any) => {
  if (props.character) {
    /* @ts-ignore */
    props.character.items.splice(idx, 1); /* @ts-ignore */
    await saveCharacter(props.character);
  }
};

const addNewItem = async () => {
  /* @ts-ignore */
  props.character.items.push(item_); /* @ts-ignore */
  await saveCharacter(props.character);
  close("createItem");
};
</script>
