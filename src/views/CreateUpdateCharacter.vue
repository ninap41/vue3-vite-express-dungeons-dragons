<template>
	<h1><button @click="saveCharacter">Save Character</button></h1>
	<h3 v-if="character">
		Current Character: <b class="bright-green">{{ character.name }}</b>
	</h3>
	<div class="flex">
		<div>
			<div v-if="character" class="charsheet">
				<header>
					<section class="charname">
						<label for="charname">Character Name</label><input name="charname" v-model="character.name" />
					</section>
					<section class="misc">
						<ul>
							<li><label for="classlevel">Class & Level</label><input name="classlevel" v-model="character.classlevel" /></li>
							<li><label for="background">Background</label><input name="background" v-model="character.background" /></li>
							<li><label for="playername">Player Name</label><input name="playername" v-model="character.name" /></li>
							<li><label for="race">Race</label><input name="race" v-model="character.race" /></li>
							<li><label for="alignment">Alignment</label><input name="alignment" v-model="character.alignment" /></li>
							<li>
								<label for="experiencepoints">Experience Points</label><input name="experiencepoints" v-model="character.xp" />
							</li>
						</ul>
					</section>
				</header>
				<main>
					<section>
						<section class="attributes">
							<div class="scores">
								<ul>
									<li>
										<div class="score">
											<label for="Strengthscore">Strength</label
											><input name="Strengthscore" v-model="character.strength.score" class="stat" />
										</div>
										<div class="modifier">
											<input name="Strengthmod" v-model="character.strength.modifier" class="statmod" />
										</div>
									</li>
									<li>
										<div class="score">
											<label for="Dexterityscore">Dexterity</label
											><input name="Dexterityscore" v-model="character.dexterity.score" class="stat" />
										</div>
										<div class="modifier">
											<input name="Dexteritymod" v-model="character.dexterity.modifier" class="statmod" />
										</div>
									</li>
									<li>
										<div class="score">
											<label for="Constitutionscore">Constitution</label
											><input name="Constitutionscore" v-model="character.constitution.score" class="stat" />
										</div>
										<div class="modifier">
											<input name="Constitutionmod" v-model="character.constitution.modifier" class="statmod" />
										</div>
									</li>
									<li>
										<div class="score">
											<label for="Wisdomscore">Wisdom</label
											><input name="Wisdomscore" v-model="character.wisdom.score" class="stat" />
										</div>
										<div class="modifier">
											<input name="Wisdommod" v-model="character.wisdom.modifier" />
										</div>
									</li>
									<li>
										<div class="score">
											<label for="Intelligencescore">Intelligence</label
											><input name="Intelligencescore" v-model="character.intelligence.score" class="stat" />
										</div>
										<div class="modifier">
											<input name="Intelligencemod" v-model="character.intelligence.modifier" class="statmod" />
										</div>
									</li>
									<li>
										<div class="score">
											<label for="Charismascore">Charisma</label
											><input name="Charismascore" v-model="character.charisma.score" class="stat" />
										</div>
										<div class="modifier">
											<input name="Charismamod" v-model="character.charisma.modifier" class="statmod" />
										</div>
									</li>
								</ul>
							</div>
							<div class="attr-applications">
								<div class="inspiration box">
									<div class="label-container">
										<label for="inspiration">Inspiration</label>
									</div>
									<input name="inspiration" type="text" v-model="character.inspiration" />
								</div>
								<div class="proficiencybonus box">
									<div class="label-container">
										<label for="proficiencybonus">Proficiency Bonus</label>
									</div>
									<input name="proficiencybonus" v-model="character.proficiencybonus" />
								</div>
								<div class="proficiencybonus box">
									<div class="label-container">
										<label for="proficiencybonus">Ability Sace DC</label>
									</div>
									<input name="proficiencybonus" v-model="character.abilitysaveDC" />
								</div>
								<div class="saves list-section box">
									<ul>
										<li>
											<label for="Strength-save">Strength</label
											><input v-model="character.strength.proficiency" type="text" /><input
												v-model="character.strength.savingthrow"
												name="Strength-save-prof"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Dexterity-save">Dexterity</label
											><input name="Dexterity-save" v-model="character.dexterity.proficiency" type="text" /><input
												v-model="character.dexterity.savingthrow"
												name="Dexterity-save-prof"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Constitution-save">Constitution</label
											><input name="Constitution-save" v-model="character.constitution.proficiency" type="text" /><input
												v-model="character.constitution.savingthrow"
												name="Constitution-save-prof"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Wisdom-save">Wisdom</label
											><input name="Wisdom-save" v-model="character.wisdom.proficiency" type="text" /><input
												v-model="character.wisdom.savingthrow"
												name="Wisdom-save-prof"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Intelligence-save">Intelligence</label
											><input name="Intelligence-save" v-model="character.intelligence.proficiency" type="text" /><input
												v-model="character.intelligence.savingthrow"
												name="Intelligence-save-prof"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Charisma-save">Charisma</label
											><input v-model="character.charisma.proficiency" name="Charisma-save" type="text" /><input
												v-model="character.charisma.savingthrow"
												name="Charisma-save-prof"
												type="checkbox"
											/>
										</li>
									</ul>
									<div class="label">Saving Throws</div>
								</div>
								<div class="skills list-section box">
									<ul>
										<li>
											<label for="Acrobatics">Acrobatics <span class="skill">(Dex)</span></label
											><input name="Acrobatics" v-model="character.acrobatics.val" type="text" /><input
												name="Acrobatics-prof"
												:checked="character.acrobatics.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Animal Handling">Animal Handling <span class="skill">(Wis)</span></label
											><input name="Animal Handling" v-model="character.animalhandling.val" type="text" /><input
												name="Animal Handling-prof"
												:checked="character.animalhandling.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Arcana">Arcana <span class="skill">(Int)</span></label
											><input name="Arcana" v-model="character.arcana.val" type="text" /><input
												:checked="character.arcana.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Athletics">Athletics <span class="skill">(Str)</span></label
											><input name="Athletics" v-model="character.athletics.val" type="text" /><input
												name="Athletics-prof"
												:checked="character.athletics.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Deception">Deception <span class="skill">(Cha)</span></label
											><input name="Deception" v-model="character.deception.val" type="text" /><input
												name="Deception-prof"
												:checked="character.deception.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="History">History <span class="skill">(Int)</span></label
											><input name="History" v-model="character.history.val" type="text" /><input
												name="History-prof"
												:checked="character.history.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Insight">Insight <span class="skill">(Wis)</span></label
											><input name="Insight" v-model="character.insight.val" type="text" /><input
												name="Insight-prof"
												:checked="character.insight.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Intimidation">Intimidation <span class="skill">(Cha)</span></label
											><input name="Intimidation" v-model="character.intimidation.val" type="text" /><input
												name="Intimidation-prof"
												:checked="character.investigation.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Investigation">Investigation <span class="skill">(Int)</span></label
											><input name="Investigation" v-model="character.investigation.val" type="text" /><input
												name="Investigation-prof"
												:checked="character.investigation.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Medicine">Medicine <span class="skill">(Wis)</span></label
											><input name="Medicine" v-model="character.medicine.val" type="text" /><input
												name="Medicine-prof"
												:checked="character.medicine.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Nature">Nature <span class="skill">(Int)</span></label
											><input name="Nature" v-model="character.nature.val" type="text" /><input
												name="Nature-prof"
												:checked="character.nature.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Perception">Perception <span class="skill">(Wis)</span></label
											><input name="Perception" v-model="character.perception.val" type="text" /><input
												name="Perception-prof"
												:checked="character.perception.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Performance">Performance <span class="skill">(Cha)</span></label
											><input name="Performance" v-model="character.performance.val" type="text" /><input
												name="Performance-prof"
												:checked="character.performance.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Persuasion">Persuasion <span class="skill">(Cha)</span></label
											><input name="Persuasion" v-model="character.persuasion.val" type="text" /><input
												name="Persuasion-prof"
												:checked="character.persuasion.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Religion">Religion <span class="skill">(Int)</span></label
											><input name="Religion" v-model="character.religion.val" type="text" /><input
												name="Religion-prof"
												:checked="character.religion.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Sleight of Hand">Sleight of Hand <span class="skill">(Dex)</span></label
											><input name="Sleight of Hand" v-model="character.sleightofhand.val" type="text" /><input
												name="Sleight of Hand-prof"
												:checked="character.sleightofhand.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Stealth">Stealth <span class="skill">(Dex)</span></label
											><input name="Stealth" v-model="character.stealth.val" type="text" /><input
												name="Stealth-prof"
												:checked="character.stealth.proficiency"
												type="checkbox"
											/>
										</li>
										<li>
											<label for="Survival">Survival <span class="skill">(Wis)</span></label
											><input name="Survival" v-model="character.survival.val" type="text" /><input
												name="Survival-prof"
												:checked="character.survival.proficiency"
												type="checkbox"
											/>
										</li>
									</ul>
									<div class="label">Skills</div>
								</div>
							</div>
						</section>
						<div class="passive-perception box">
							<div class="label-container">
								<label for="passiveperception">Passive Wisdom (Perception)</label>
							</div>
							<input name="passiveperception" :placeholder="character.passivewisdom" />
						</div>
						<div class="passive-perception box">
							<div class="label-container">
								<label for="passiveperception">Passive Intelligence</label>
							</div>
							<input name="passiveperception" :placeholder="character.passiveintelligence" />
						</div>
						<div class="otherprofs box textblock">
							<label for="otherprofs">Other Proficiencies and Languages</label
							><textarea
								name="otherprofs"
								:v-model="character.otherprofienienciesandlanguages"
								:value="character.otherprofienienciesandlanguages"
							></textarea>
						</div>
					</section>
					<section>
						<section class="combat">
							<div class="armorclass">
								<div><label for="ac">Armor Class</label><input name="ac" v-model="character.armorclass" type="text" /></div>
							</div>
							<div class="initiative">
								<div>
									<label for="initiative">Initiative</label
									><input name="initiative" v-model="character.initiative" type="text" />
								</div>
							</div>
							<div class="speed">
								<div><label for="speed">Speed</label><input name="speed" v-model="character.speed" type="text" /></div>
							</div>
							<div class="hp">
								<div class="regular">
									<div class="max">
										<label for="maxhp">Hit Point Maximum</label><input name="maxhp" v-model="character.hitpoints" type="text" />
									</div>
									<div class="current">
										<label for="currenthp">Current Hit Points</label
										><input name="currenthp" v-model="character.currenthitpoints" type="text" />
									</div>
								</div>
								<div class="temporary">
									<label for="temphp">Temporary Hit Points</label
									><input name="temphp" v-model="character.temporaryhitpoints" type="text" />
								</div>
							</div>
							<div class="hitdice">
								<div>
									<div class="total">
										<label onclick="totalhd_clicked()" for="totalhd">Total</label
										><input name="totalhd" placeholder="2d10" type="text" />
									</div>
									<div class="remaining"><label for="remaininghd">Hit Dice</label><input name="remaininghd" type="text" /></div>
								</div>
							</div>
							<div class="">
								<div>
									<div class="label">
										<label>Death Saves</label>
									</div>
									<div class="marks">
										<div class="deathsuccesses">
											<label>Successes</label>
											<div class="bubbles">
												<input name="deathsuccess1" v-model="character.successes[0]" type="checkbox" />
												<input name="deathsuccess2" v-model="character.successes[1]" type="checkbox" />
												<input name="deathsuccess3" v-model="character.successes[2]" type="checkbox" />
											</div>
										</div>
										<div class="deathfails">
											<label>Failures</label>
											<div class="bubbles">
												<input name="deathfail1" v-model="character.failures[0]" type="checkbox" />
												<input name="deathfail2" v-model="character.failures[1]" type="checkbox" />
												<input name="deathfail3" v-model="character.failures[2]" type="checkbox" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
						<section class="attacksandspellcasting">
							<div>
								<label>Attacks & Spellcasting</label>
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>Atk Bonus</th>
											<th>Damage/Type</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<input name="atkname1" v-model="character.attacks[0].name" type="text" />
											</td>
											<td>
												<input name="atkbonus1" v-model="character.attacks[0].bonus" type="text" />
											</td>
											<td>
												<input name="atkdamage1" v-model="character.attacks[0].damage" type="text" />
											</td>
										</tr>
										<tr>
											<td>
												<input name="atkname2" v-model="character.attacks[1].name" type="text" />
											</td>
											<td>
												<input name="atkbonus2" v-model="character.attacks[1].bonus" type="text" />
											</td>
											<td>
												<input name="atkdamage2" v-model="character.attacks[1].name" type="text" />
											</td>
										</tr>
										<tr>
											<td>
												<input name="atkname3" v-model="character.attacks[2].name" type="text" />
											</td>
											<td>
												<input name="atkbonus3" v-model="character.attacks[2].bonus" type="text" />
											</td>
											<td>
												<input name="atkdamage3" v-model="character.attacks[2].damage" type="text" />
											</td>
										</tr>
									</tbody>
								</table>
								<textarea name="attacksandspellcasting" v-model="character.attacksandspellingcasting"></textarea>
							</div>
						</section>
						<section class="equipment">
							<div>
								<label>Equipment</label>
								<div class="money">
									<ul>
										<li><label for="cp">cp</label><input v-model="character.money.copper" name="cp" /></li>
										<li><label for="sp">sp</label><input v-model="character.money.silver" name="sp" /></li>
										<li><label for="ep">ep</label><input v-model="character.money.electrum" name="ep" /></li>
										<li><label for="gp">gp</label><input v-model="character.money.gold" name="gp" /></li>
										<li>
											<label for="pp">pp</label
											><input :v-model="character.money.platinum" :value="character.money.platinum" name="pp" />
										</li>
									</ul>
								</div>
								<textarea :v-model="character.equipment" :value="character.equipment"></textarea>
							</div>
						</section>
					</section>
					<section>
						<section class="flavor">
							<div class="personality">
								<label for="personality">Personality</label
								><textarea :value="character.personality" name="personality"></textarea>
							</div>
							<div class="ideals">
								<label for="ideals">Ideals</label><textarea :value="character.ideals" name="ideals"></textarea>
							</div>
							<div class="bonds">
								<label for="bonds">Bonds</label><textarea :value="character.bonds" name="bonds"></textarea>
							</div>
							<div class="flaws">
								<label for="flaws">Flaws</label><textarea :value="character.flaws" name="flaws"></textarea>
							</div>
						</section>
						<section class="features">
							<div>
								<label for="features">Features & Traits</label
								><textarea
									:value="character.featuresandtraits"
									:v-model="character.featuresandtraits"
									name="features"
								></textarea>
							</div>
						</section>
					</section>
				</main>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from "vue"
import axios, { AxiosResponse } from "axios"

var character = ref()

//@ts-ignore
const getCharacterData = async () => {
	await axios.get("http://localhost:3000/api/characters/readAll").then((res: AxiosResponse) => {
		if (res) {
			character.value = res.data[0]
		}
	})
}
//@ts-ignore
const saveCharacter = async () => {
	try {
		await axios.post(`http://localhost:3000/api/characters/updateOne`, character.value).then((data) => console.log(data))
	} catch (err) {
		alert(JSON.stringify(err))
	}
}

//@ts-ignore
onMounted(async () => {
	await getCharacterData()
})
</script>

<style scoped>
@import "@/assets/dnd.css";
@import "@/assets/wysiwig.css";
.flex {
	padding: 1rem;
	display: flex;
	flex-direction: row;
}

.sessionnotes {
	height: 1000px;
	max-height: 100%;
}
.flex > * {
	padding: 1rem;
}
@media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
}
</style>
