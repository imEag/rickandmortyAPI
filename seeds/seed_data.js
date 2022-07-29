const dotenv = require('dotenv');
const fs = require('fs');
const db = require('../config/db');

//IMPORTING MODELS
const Character = require('../models/character');
const Location = require('../models/location');
const Episode = require('../models/episode');
const { model } = require('mongoose');

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
    await charactersData.map((char) => {
        const new_char = new Character({
            name: char.name,
            status: char.status,
            species: char.species,
            type: char.type,
            gender: char.gender,
            origin: char.origin,
            location: char.location,
            image: char.image,
            episode: char.episode,
            created: char.created
        });

        new_char.save()
            .then(res => console.log('succefully stored. ' + res))
            .catch(err => console.error(err));

    });
}

const import_locations = async () => {
    await locationsData.map((loc) => {
        const new_loc = new Location({
            name: loc.name,
            type: loc.type,
            dimension: loc.dimension,
            residents: loc.residents,
            created: loc.created
        });

        new_loc.save()
            .then(res => console.log('succefully stored. ' + res))
            .catch(err => console.error(err));

    });
}

const import_episodes = async () => {
    await episodesData.map((epi) => {
        const new_epi = new Episode({
            name: epi.name,
            air_date: epi.air_date,
            episode: epi.episode,
            characters: epi.characters,
            created: epi.created
        });

        new_epi.save()
            .then(res => console.log('succefully stored. ' + res))
            .catch(err => console.error(err));

    });
}

// DELETE FROM DB
const delete_characters = async () => {
    try {
        await Character.deleteMany({});
        console.log('Characters data deleted');
    } catch (err) {
        console.log(err);
    }
}

const delete_locations = async () => {
    try {
        await Location.deleteMany({});
        console.log('Locations data deleted');
    } catch (err) {
        console.log(err);
    }
}

const delete_episodes = async () => {
    try {
        await Episode.deleteMany({});
        console.log('Episodes data deleted');
    } catch (err) {
        console.log(err);
    }
}

// RUN "node seeds/seed_data.js -i" to import all data
// RUN "node seeds/seed_data.js -d" to delete all data

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
} else if (process.argv[2] === '-i') {
    try {
        import_characters().then();
        import_locations().then();
        import_episodes().then();
    } catch(err) {
        console.error(err);
    }
} else if (process.argv[2] === '-dcharacters') {
    delete_characters().then();
} else if (process.argv[2] === '-dlocations') {
    delete_locations().then();
} else if (process.argv[2] === '-depisodes') {
    delete_episodes().then();
} else if (process.argv[2] === '-d') {
    (async () => {
        await delete_locations().then();
        await delete_characters().then();
        await delete_episodes().then();
        await process.exit();
    })()
} 