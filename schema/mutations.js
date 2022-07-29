const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLString } = graphql;

//MODELS
const Character = mongoose.model('character');
const Location = mongoose.model('location');
const Episode = mongoose.model('episode');

//TYPES
const CharacterType = require('./types/character_type');
const LocationType = require('./types/location_type');
const EpisodeType = require('./types/episode_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addCharacter: {
            type: CharacterType,
            args: {
                name: { type: GraphQLString },
                status: { type: GraphQLString },
                species: { type: GraphQLString },
                type: { type: GraphQLString },
                gender: { type: GraphQLString },
                image: { type: GraphQLString },
                created: { type: GraphQLString },
                origin: { type: GraphQLID },
                location: { type: GraphQLID },
                episode: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parentValue, { id, name, status, species, type, gender, image, created, origin, location, episode }) {
                return (new Character({ id, name, status, species, type, gender, image, created, origin, location, episode })).save();
            }
        }
    }
});


module.exports = mutation;
