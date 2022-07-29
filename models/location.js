const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

const LocationSchema = new Schema({
    name: { type: String },
    type: { type: String },
    dimension: { type: String },
    residents: [{ type: Schema.Types.ObjectId, ref: 'character' }],
    created: { type: Date }
});

LocationSchema.plugin(mongoosePagination);

LocationSchema.statics.findPagination = async function ({ page }) {
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

module.exports = mongoose.model('location', LocationSchema);