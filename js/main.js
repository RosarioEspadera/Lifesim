"use strict";

let characters = [];

class Person {
    constructor({
        name,
        surname,
        age = 0,
        gender = genderRandomizer(),
        nationality = countryRandomizer(),
        money = 0,
        location
    } = {}) {

        this.gender = gender;
        this.nationality = nationality;
        this.language = languageQuery(nationality);
        this.name = name || nameRandomizer(this.language, this.gender);
        this.surname = surname || surnameRandomizer(this.language);
        this.age = age;
        this.location = location || birthplaceQuery(this.nationality);
        this.birthplace = this.location;

        this.money = {
            expenses: 0,
            income: 0,
            total: money
        };

        this.driverLicense = this.age >= 18;

        // Initialize complex attributes
        this.stats = initStats();
        this.inventory = initInventory();
        this.relationships = initRelationships();
        this.skills = initSkills();
        this.freetime = initFreetime();
        this.socialMedia = initSocials();
        this.actions = initActions();

        this.job = { label: "Unemployed", salary: 0 };
        this.cv = [];
        this.career = {};
        this.currentCareer = { studying: false };

        this.alive = true;
        this.characterIndex = characters.length;

        this.criminalRecord = {
            yearsInPrison: 0,
            murderAttempts: 0,
            murder: 0,
            prisonEscapes: 0
        };

        this.prison = {
            yearsLeft: 0,
            sentenceTime: 0,
            jailed: false
        };
    }

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
}

/* ----------------- Factories ----------------- */

function initStats() {
    return {
        health: randomStat(70, 30),
        happiness: randomStat(0, 100),
        smartness: randomStat(0, 100),
        fitness: randomStat(0, 35),
        appearance: randomStat(0, 100)
    };
}

function initInventory() {
    return { weapons: [], instruments: [], electronics: [], houses: [], cars: [] };
}

function initRelationships() {
    return { parents: [], siblings: [], partner: [], friends: [], offspring: [] };
}

function initSkills() {
    const template = { level: 0, xp: 0, xpNeeded: 50 };
    return {
        programming: { ...template },
        handiness: { ...template },
        writing: { ...template },
        art: { ...template },
        music: { ...template }
    };
}

function initFreetime() {
    return { isReading: false, isTakingMusicLessons: false, isAttendingParties: false, goesToGym: false };
}

function initSocials() {
    return {
        youtube: { created: false, created_at: null, username: null, videos: [], subscribers: 0 },
        instagram: { created: false, created_at: null, username: null, posts: [], followers: 0 }
    };
}

function initActions() {
    return {
        programming: 0,
        writing: 0,
        workHarder: 0,
        music: 0,
        meanActions: 0,
        friendlyActions: 0,
        romanticActions: 0,
        askPromotion: 0
    };
}

/* ----------------- Family Creation ----------------- */

const createFamily = (player) => {
    const parentsAge = () => Math.max(18 + player.age, Math.floor(Math.random() * 40) + player.age);

    const dad = new Person({ surname: player.surname, age: parentsAge(), gender: "male", nationality: player.nationality });
    const mom = new Person({ surname: surnameRandomizer(player.language), age: dad.age - Math.floor(Math.random() * 5), gender: "female", nationality: player.nationality });

    dad.stats.relationWithPlayer = rand100();
    mom.stats.relationWithPlayer = rand100();

    dad.relationships.partner.push(mom);
    mom.relationships.partner.push(dad);

    player.relationships.parents.push(dad, mom);

    characters.push(dad, mom);

    // Generate siblings
    const siblingsAmount = Math.floor(Math.random() * 3);
    for (let i = 0; i < siblingsAmount; i++) {
        const sibling = new Person({ surname: player.surname, age: randInt(1, 17), nationality: player.nationality });
        sibling.stats.relationWithPlayer = rand100();
        characters.push(sibling);
        player.relationships.siblings.push(sibling);
    }
};

const rand100 = () => Math.floor(Math.random() * 100);
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/* ----------------- Character Creation ----------------- */

const randomCharacter = () => {
    player = new Person();
    characters.push(player);
    createFamily(player);
    interfaceLoading();
    assignNPCEducation(characters);
};

const customCharacter = () => {
    const name = capitalize(document.getElementById('name').value.trim() || undefined);
    const surname = capitalize(document.getElementById('surname').value.trim() || undefined);
    const age = parseInt(document.getElementById('age').value) || 0;
    const gender = document.getElementById('gender').value || undefined;
    const nationality = document.getElementById('nationality').value || undefined;
    const money = parseInt(document.getElementById('money').value) || 0;

    player = new Person({ name, surname, age, gender, nationality, money });
    characters.push(player);
    createFamily(player);
    interfaceLoading();
    assignNPCEducation(characters);
};
