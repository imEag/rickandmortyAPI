const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;

//MODELS
const Character = mongoose.model('character');
const Location = mongoose.model('location');
const Episode = mongoose.model('episode');

//TYPES
const CharacterType = require('./types/character_type');
const LocationType = require('./types/location_type');
const EpisodeType = require('./types/episode_type');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        characters: {
            type: new GraphQLList(CharacterType),
            resolve() {
                return Character.find({});
            }
        }
    })
});


module.exports = RootQuery;
