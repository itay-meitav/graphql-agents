const { GraphQLObjectType, GraphQLList } = require("graphql");
const {
  resolveAgents,
  resolveCities,
  resolveLicenses,
} = require("./resolvers");
const { agentType, cityType, licenseType } = require("./types");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    persons: {
      type: new GraphQLList(agentType),
      description: "list of all agents",
      resolve: resolveAgents,
    },
    cities: {
      type: new GraphQLList(cityType),
      description: "list of all cities",
      resolve: resolveCities,
    },
    licenses: {
      type: new GraphQLList(licenseType),
      description: "list of all licenses",
      resolve: resolveLicenses,
    },
  }),
});

module.exports = { RootQueryType };
