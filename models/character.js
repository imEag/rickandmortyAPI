const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

//ATTR SCHEMA
const CharacterSchema = new Schema({
    name: { type: String },
    status: { type: String },
    species: { type: String },
    type: { type: String },
    gender: { type: String },
    origin: { type: Schema.Types.ObjectId, ref: 'location' },
    location: { type: Schema.Types.ObjectId, ref: 'location' },
    image: { type: String },
    episode: [{ type: Schema.Types.ObjectId, ref: 'episode' }],
    created: { type: String }
});

//add plugin to paginate
CharacterSchema.plugin(mongoosePagination);


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
    return this.findById(id)
        .populate('location')
        .then(character => character.location)
        .catch(err => handleError(err));
}

//EPISODE RELATED FUNTIONS
CharacterSchema.statics.addEpisode = function (id, name) {
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
    return this.findById(id)
        .populate('episode')
        .then(character => character.episode)
        .catch(err => handleError(err));
}

CharacterSchema.statics.findPagination = async function ({ page }) {
    const response = await this.paginate({}, { page, limit: 20 });
    console.log(response)
    const result = {
        info: {
            next: response.nextPage,
            pages: response.totalPages,
            count: response.totalDocs,
            prev: response.prevPage
        },
        results: response.docs
    }
    return result;
}



//export model
module.exports = mongoose.model('character', CharacterSchema);