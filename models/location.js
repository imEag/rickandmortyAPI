const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

const LocationSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String },
    dimension: { type: String },
    residents: [{ type: Schema.Types.ObjectId, ref: 'character' }],
    created: { type: Date }
});

LocationSchema.plugin(mongoosePagination);

mongoose.model('location', LocationSchema);