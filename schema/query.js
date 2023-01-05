const { GraphQLObjectType, GraphQLList } = require("graphql");
const { resolveAgents } = require("./resolvers");
const { agentType } = require("./types");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    persons: {
      type: new GraphQLList(agentType),
      description: "list of all agents",
      resolve: resolveAgents,
    },
  }),
});

module.exports = { RootQueryType };
