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

//info type FOR PAGINATION
const InfoType = new GraphQLObjectType({
    name: 'InfoType',
    fields: () => ({
        next: { type: GraphQLInt },
        pages: { type: GraphQLInt },
        count: { type: GraphQLInt },
        prev: { type: GraphQLInt }
    })
});

//TYPES FOR PAGINATION
const CharactersPageType = new GraphQLObjectType({
    name: 'CharactersPage',
    fields: () => ({
        info: { type: InfoType },
        results: { type: new GraphQLList(CharacterType) }
    })
})

const LocationsPageType = new GraphQLObjectType({
    name: 'LocationsPage',
    fields: () => ({
        info: { type: InfoType },
        results: { type: new GraphQLList(LocationType) }
    })
})

const EpisodesPageType = new GraphQLObjectType({
    name: 'EpisodesPage',
    fields: () => ({
        info: { type: InfoType },
        results: { type: new GraphQLList(EpisodeType) }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        characters: {
            type: CharactersPageType,
            args: { page: { type: GraphQLInt } },
            resolve(parentValue, { page }) {
                return Character.findPagination({ page });
            }
        },
        character: {
            type: CharacterType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Character.findById(id);
            }
        },
        locations: {
            type: LocationsPageType,
            args: { page: { type: GraphQLInt } },
            resolve(parentValue, { page }) {
                return Location.findPagination({ page });
            }
        },
        location: {
            type: LocationType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Location.findById(id);
            }
        },
        episodes: {
            type: EpisodesPageType,
            args: { page: { type: GraphQLInt } },
            resolve(parentValue, { page }) {
                return Episode.findPagination({ page });
            }
        },
        episode: {
            type: EpisodeType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, { id }) {
                return Episode.findById(id);
            }
        }
    })
});


module.exports = RootQuery;
