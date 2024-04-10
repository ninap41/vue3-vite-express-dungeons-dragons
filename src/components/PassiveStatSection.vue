<template>
 
    <div  v-if="character" class="flex-row flex-1 space-even">
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
  var toggleMoney = ref(false)


  </script>
  