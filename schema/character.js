const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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