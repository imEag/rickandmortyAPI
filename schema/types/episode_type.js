const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//MODELS
const Episode = mongoose.model('episode');

//TYPES
const CharacterType = require('./character_type');

const EpisodeType = new GraphQLObjectType({
    name: 'EpisodeType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        air_date: { type: GraphQLString },
        episode: { type: GraphQLString },
        characters: {
            type: new GraphQLList(require('./character_type')),
            resolve(parentValue) {
                return Episode.findById(parentValue)
                    .populate('characters')
                    .then(episode => {
                        return episode.characters
                    });
            }
        },
        created: { type: GraphQLString }
    })
});

module.exports = EpisodeType;