const dotenv = require('dotenv');
const fs = require('fs');
const db = require('../config/db');

//IMPORTING MODELS
const Character = require('../models/character');
const Location = require('../models/location');
const Episode = require('../models/episode');

//CONNECT TO DB
db()
    .then(res => {
        console.log('connected to DB');
    })
    .catch(err => console.error(err));

//READ JSON FILES
const charactersData = JSON.parse(fs.readFileSync(`${__dirname}/characters.json`, 'utf-8'));
const locationsData = JSON.parse(fs.readFileSync(`${__dirname}/locations.json`, 'utf-8'));
const episodesData = JSON.parse(fs.readFileSync(`${__dirname}/episodes.json`, 'utf-8'));

// IMPORT INTO DB
const import_characters = async () => {
    try {
        await Character.create(charactersData);
        console.log(` characters data imported`);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const import_locations = async () => {
    try {
        await Location.create(locationsData);
        console.log(` locations data imported`);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const import_episodes = async () => {
    try {
        await Episode.create(episodesData);
        console.log(`episodes data imported`);
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// DELETE FROM DB
const delete_characters = async () => {
    try {
        await Character.deleteMany();
        console.log('Characters data deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const delete_locations = async () => {
    try {
        await Location.deleteMany();
        console.log('Locations data deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

const delete_episodes = async () => {
    try {
        await Episode.deleteMany();
        console.log('Episodes data deleted');
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

// RUN "node seeds/seed_data.js -icharacters" to import characters data
// RUN "node seeds/seed_data.js -dcharacters" to delete characters data

// RUN "node seeds/seed_data.js -ilocations" to import locations data
// RUN "node seeds/seed_data.js -dlocations" to delete locations data

// RUN "node seeds/seed_data.js -iepisodes" to import episodes data
// RUN "node seeds/seed_data.js -depisodes" to delete episodes data

if (process.argv[2] === '-icharacters') {
    import_characters().then();
} else if (process.argv[2] === '-ilocations') {
    import_locations().then();
} else if (process.argv[2] === '-iepisodes') {
    import_episodes().then();
} else if (process.argv[2] === '-dcharacters') {
    delete_characters().then();
} else if (process.argv[2] === '-dlocations') {
    delete_locations().then();
} else if (process.argv[2] === '-depisodes') {
    delete_episodes().then();
}