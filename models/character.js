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

CharacterSchema.statics.updateCharacter = function ({ id, name, status, species, type, gender, image, created }) {
    return this.findByIdAndUpdate({ _id: id }, { _id: id, name, status, species, type, gender, image, created }, { new: true })
        .then()
        .catch(err => console.error(err));
}

//ORIGIN AND LOCATION RELATED FUNTIONS
CharacterSchema.statics.addOrigin = function ({ origin_id, character_id }) {
    return this.findByIdAndUpdate({ _id: character_id }, { origin: origin_id }, { new: true })
        .then()
        .catch(err => console.error(err));
}

CharacterSchema.statics.findOrigin = function (id) {
    return this.findById(id)
        .populate('origin')
        .then(character => character.origin)
        .catch(err => handleError(err));
}

CharacterSchema.statics.addLocation = function ({ location_id, character_id }) {
    return this.findByIdAndUpdate({ _id: character_id }, { location: location_id }, { new: true })
        .then()
        .catch(err => console.error(err));
}

CharacterSchema.statics.findLocation = function (id) {
    return this.findById(id)
        .populate('location')
        .then(character => character.location)
        .catch(err => handleError(err));
}

//EPISODE RELATED FUNTIONS

CharacterSchema.statics.findEpisode = function (id) {
    return this.findById(id)
        .populate('episode')
        .then(character => character.episode)
        .catch(err => handleError(err));
}

CharacterSchema.statics.findPagination = async function ({ page }) {
    const response = await this.paginate({}, { page, limit: 20 });
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