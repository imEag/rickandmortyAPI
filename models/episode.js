const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePagination = require('mongoose-paginate-v2');

const EpisodeSchema = new Schema({
    name: { type: String },
    air_date: { type: String },
    episode: { type: String },
    characters: [{ type: Schema.Types.ObjectId, ref: 'character' }],
    created: { type: String }
});

EpisodeSchema.plugin(mongoosePagination);

EpisodeSchema.statics.findPagination = async function ({ page }) {
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

module.exports = mongoose.model('episode', EpisodeSchema);