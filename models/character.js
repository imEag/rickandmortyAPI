const { stripIgnoredCharacters } = require('graphql');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

//ATTR SCHEMA
const CharacterSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String },
    species: { type: String },
    type: { type: String },
    gender: { type: String },
    origin: { type: Schema.Type.ObjectId, ref: 'location' },
    location: { type: Schema.Type.ObjectId, ref: 'location' },
    image: { type: String },
    episode: [{ type: Schema.Type.ObjectId, ref: 'episode' }],
    created: { type: Date }
});

//ORIGIN RELATED FUNTIONS
CharacterSchema.statics.addOrigin = function (id, name) {
    const Origin = mongoose.model('location');

    return this.findById(id)
        .then(character => {
            //create new location
            const origin = new Origin({ name });
            //add that location to character's attr
            character.origin = origin;
            //save to mongodb
            return Promise.all([origin.save(), character.save()])
                .then(([origin, character]) => character)
                .catch(err => handleError(err));
        })
}

CharacterSchema.statics.findOrigin = function (id) {
    return this.findbyId(id)
        .populate('origin')
        .then(character => character.origin)
        .catch(err => handleError(err));
}

//LOCATION RELATED FUNTIONS
CharacterSchema.statics.addLocation = function (id, name) {
    const Location = mongoose.model('location');

    return this.findById(id)
        .then(character => {
            //create new location
            const location = new Location({ name });
            //add that location to character's attr
            character.location = location;
            //save to mongodb
            return Promise.all([location.save(), character.save()])
                .then(([location, character]) => character)
                .catch(err => handleError(err));
        })
}

CharacterSchema.statics.findLocation = function (id) {
    return this.findbyId(id)
        .populate('location')
        .then(character => character.location)
        .catch(err => handleError(err));
}

//EPISODE RELATED FUNTIONS
SongSchema.statics.addEpisode = function (id, name) {
    const Episode = mongoose.model('episode');

    return this.findById(id)
        .then(character => {
            //create new episode
            const episode = new Episode({ name });
            //add that episode to character's attr
            song.episodes.push(episode);
            //save to mongodb
            return Promise.all([episode.save(), song.save()])
                .then(([episode, character]) => character)
                .catch(err => handleError(err));
        });
}

CharacterSchema.statics.findEpisode = function (id) {
    return this.findbyId(id)
        .populate('episode')
        .then(character => character.episode)
        .catch(err => handleError(err));
}


//add plugin to paginate
CharacterSchema.plugin(mongoosePagination);

//export model
mongoose.model('character', CharacterSchema);