const { GraphQLObjectType, GraphQLList } = require("graphql");
const { resolveSelect } = require("./resolvers");
const { AgentType, CityType, LicenseType, CarType } = require("./types");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    agent: {
      type: new GraphQLList(AgentType),
      description: "list of agents",
      resolve: (obj, args) => resolveSelect("agents", args),
    },
    city: {
      type: new GraphQLList(CityType),
      description: "list of cities",
      resolve: (obj, args) => resolveSelect("cities", args),
    },
    license: {
      type: new GraphQLList(LicenseType),
      description: "list of licenses",
      resolve: (obj, args) => resolveSelect("licenses", args),
    },
    car: {
      type: new GraphQLList(CarType),
      description: "list of cars",
      resolve: (obj, args) => resolveSelect("cars", args),
    },
  }),
});

module.exports = { RootQueryType };
