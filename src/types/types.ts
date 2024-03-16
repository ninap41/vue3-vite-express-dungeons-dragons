export class AbilityScore {
	score: string = ""
	modifier: string = ""
	proficiency: string = ""
	savingthrow: boolean = false
	constructor() {}
}

export class Skill {
	val: string = ""
	proficiency: boolean = false
	constructor() {}
}

export class Character {
	id: any = Math.floor(Math.random() * 9999999)
	avatar: string = ""
	name: string = ""
	classlevel: string = ""
	background: string = ""
	race: string = ""
	alignment: string = ""
	inspiration: string = ""
	playername: string = ""
	xp: string = ""
	armorclass: string = ""
	initiative: string = ""
	speed: string = ""
	hitpoints: string = ""
	currenthitpoints: string = ""
	proficiencybonus: string = ""
	abilitysaveDC: string = ""
	temporaryhitpoints: string = ""
	totalhitdice: string = ""
	hitdice: string = ""
	successes: { [key: number]: boolean } = { 0: false, 1: false, 2: false }
	attacks: any = [
		{
			name: "",
			bonus: "",
			damage: "",
		}
	]
	spells: any = [
		{
			name: "",
			description: "",
			level: "",
		}
	]
	failures: { [key: number]: boolean } = { 0: false, 1: false, 2: false }
	personality: string = ""
	ideals: string = ""
	flaws: string = ""
	bonds: string = ""
	featuresandtraits: string = ""
	equipment: string = ""
	attacksandspellingcasting: string = ""
	otherprofienienciesandlanguages: string = ""
	money = {
		copper: "0",
		silver: "0",
		electrum: "0",
		gold: "0",
		platinum: "0",
	}
	intelligence: AbilityScore = new AbilityScore()
	strength: AbilityScore = new AbilityScore()
	constitution: AbilityScore = new AbilityScore()
	wisdom: AbilityScore = new AbilityScore()
	dexterity: AbilityScore = new AbilityScore()
	charisma: AbilityScore = new AbilityScore()
	passivewisdom: string = ""
	passiveintelligence: string = ""
	acrobatics: Skill = new Skill()
	animalhandling: Skill = new Skill()
	arcana: Skill = new Skill()
	athletics: Skill = new Skill()
	deception: Skill = new Skill()
	history: Skill = new Skill()
	insight: Skill = new Skill()
	intimidation: Skill = new Skill()
	investigation: Skill = new Skill()
	medicine: Skill = new Skill()
	nature: Skill = new Skill()
	perception: Skill = new Skill()
	performance: Skill = new Skill()
	persuasion: Skill = new Skill()
	religion: Skill = new Skill()
	sleightofhand: Skill = new Skill()
	stealth: Skill = new Skill()
	survival: Skill = new Skill()
	constructor(name: string) {
		this.name = name
	}
}

export enum CRUD {
	"readAll",
	"createTable",
	"updateOne",
	"createOne",
	"deleteOne",
	"filereader",
}
export enum session_keys {
	"characterName", // single character
	"draft", //draft
}
