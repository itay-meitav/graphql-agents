const { GraphQLObjectType, GraphQLList } = require("graphql");
const { resolveAll } = require("./resolvers");
const { agentType, cityType, licenseType, carType } = require("./types");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    agents: {
      type: new GraphQLList(agentType),
      description: "list of all agents",
      resolve: () => resolveAll("agents"),
    },
    cities: {
      type: new GraphQLList(cityType),
      description: "list of all cities",
      resolve: () => resolveAll("cities"),
    },
    licenses: {
      type: new GraphQLList(licenseType),
      description: "list of all licenses",
      resolve: () => resolveAll("licenses"),
    },
    cars: {
      type: new GraphQLList(carType),
      description: "list of all cars",
      resolve: () => resolveAll("cars"),
    },
  }),
});

module.exports = { RootQueryType };
