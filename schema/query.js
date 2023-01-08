const { GraphQLObjectType, GraphQLList } = require("graphql");
const { resolveAll, resolveWhere } = require("./resolvers");
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
    agent: {
      type: agentType,
      description: "A single agent",
    },
    cities: {
      type: new GraphQLList(cityType),
      description: "list of all cities",
      resolve: () => resolveAll("cities"),
    },
    city: {
      type: cityType,
      description: "A single city",
    },
    licenses: {
      type: new GraphQLList(licenseType),
      description: "list of all licenses",
      resolve: () => resolveAll("licenses"),
    },
    license: {
      type: licenseType,
      description: "A single license",
    },
    cars: {
      type: new GraphQLList(carType),
      description: "list of all cars",
      resolve: () => resolveAll("cars"),
    },
    car: {
      type: carType,
      description: "A single car",
    },
  }),
});

module.exports = { RootQueryType };
