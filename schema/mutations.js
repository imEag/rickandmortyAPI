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
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                dimension: { type: GraphQLString },
                residents: { type: new GraphQLList(GraphQLID) },
                created: { type: GraphQLString }
            },
            resolve(parentValue, { id, name, type, dimension, residents, created }) {
                return (new Location({ id, name, type, dimension, residents, created })).save();
            }
        },
        addEpisode: {
            type: EpisodeType,
            args: {
                name: { type: GraphQLString },
                episode: { type: GraphQLString },
                air_date: { type: GraphQLString },
                characters: { type: new GraphQLList(GraphQLID) },
                created: { type: GraphQLString }
            },
            resolve(parentValue, { id, name, episode, air_date, characters, created }) {
                return (new Episode({ id, name, episode, air_date, characters, created })).save();
            }
        },
        addLocToChar: {
            type: CharacterType,
            args: { location_id: { type: GraphQLID }, character_id: { type: GraphQLID } },
            resolve(parentValue, { location_id, character_id }) {
                return Character.addLocation({ location_id, character_id });
            }
        },
        addOriToChar: {
            type: CharacterType,
            args: { origin_id: { type: GraphQLID }, character_id: { type: GraphQLID } },
            resolve(parentValue, { origin_id, character_id }) {
                return Character.addOrigin({ origin_id, character_id });
            }
        },
        addEpiToChar: {
            type: CharacterType,
            args: { episode_id: { type: new GraphQLList(GraphQLID) }, character_id: { type: GraphQLID } },
            resolve(parentValue, { episode_id, character_id }) {
                return Character.addEpisode({ episode_id, character_id });
            }
        },
        deleteCharacter: {
            type: CharacterType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, { id }) {
                return Character.findByIdAndRemove(id);
            }
        },
        updateCharacter: {
            type: CharacterType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                status: { type: GraphQLString },
                species: { type: GraphQLString },
                type: { type: GraphQLString },
                gender: { type: GraphQLString },
                image: { type: GraphQLString },
                created: { type: GraphQLString }
            },
            resolve(parentValue, { id, name, status, species, type, gender, image, created }) {
                return Character.updateCharacter({ id, name, status, species, type, gender, image, created });
            }
        }
    }
});


module.exports = mutation;
