const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

const EpisodeSchema = new Schema({
    name: { type: String, required: true },
    air_date: { type: String },
    episode: { type: String },
    characters: [{ type: Schema.Type.ObjectId, ref: 'character' }],
    created: { type: Date }
});

EpisodeSchema.plugin(mongoosePagination);

mongoose.model('episode', EpisodeSchema);