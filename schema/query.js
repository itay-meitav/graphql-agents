const { GraphQLObjectType, GraphQLList } = require("graphql");
const { resolvePersons } = require("./resolvers");
const { personType } = require("./types");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    persons: {
      type: new GraphQLList(personType),
      description: "list of all persons",
      resolve: resolvePersons,
    },
  }),
});

module.exports = { RootQueryType };
