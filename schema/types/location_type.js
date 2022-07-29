const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;

//MODELS
const Location = mongoose.model('location');

//TYPES
const CharacterType = require('./character_type');

const LocationType = new GraphQLObjectType({
    name: 'LocationType',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        dimension: { type: GraphQLString },
        residents: {
            type: new GraphQLList(CharacterType),
            resolve(parentValue) {
                return Location.findById(parentValue)
                    .populate('residents')
                    .then(location => {
                        console.log(location)
                        return location.residents
                    });
            }
        },
        created: { type: GraphQLString }
    })
});

module.exports = LocationType;