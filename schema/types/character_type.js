const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//MODELS
const Character = mongoose.model('character');

//TYPES
const LocationType = require('./location_type');
const EpisodeType = require('./episode_type');

const CharacterType = new GraphQLObjectType({
    name: 'CharacterType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        status: { type: GraphQLString },
        species: { type: GraphQLString },
        type: { type: GraphQLString },
        gender: { type: GraphQLString },
        origin: {
            type: LocationType,
            resolve(parentValue) {
                return Character.findOrigin(parentValue.id);
            }
        },
        location: {
            type: LocationType,
            resolve(parentValue) {
                return Character.findLocation(parentValue.id);
            }
        },
        image: { type: GraphQLString },
        episode: {
            type: new GraphQLList(EpisodeType),
            resolve(parentValue) {
                return Character.findEpisode(parentValue.id);
            }
        },
        created: { type: GraphQLString }
    })
});

module.exports = CharacterType;