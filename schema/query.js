const { GraphQLObjectType, GraphQLList } = require("graphql");
const { resolveSelect } = require("./resolvers");
const { AgentType, CityType, LicenseType, CarType } = require("./types");
const {
  CarInputType,
  AgentInputType,
  LicenseInputType,
  CityInputType,
} = require("./inputs");

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    agent: {
      type: new GraphQLList(AgentType),
      description: "select agent's details",
      args: {
        args: { type: AgentInputType },
      },
      resolve: (agent, { args }) => resolveSelect("agents", args),
    },
    city: {
      type: new GraphQLList(CityType),
      description: "select city's details",
      args: {
        args: { type: CityInputType },
      },
      resolve: (city, { args }) => resolveSelect("cities", args),
    },
    license: {
      type: new GraphQLList(LicenseType),
      description: "select license's details",
      args: {
        args: { type: LicenseInputType },
      },
      resolve: (license, { args }) => resolveSelect("licenses", args),
    },
    car: {
      type: new GraphQLList(CarType),
      description: "select car's details",
      args: {
        args: { type: CarInputType },
      },
      resolve: (car, { args }) => resolveSelect("cars", args),
    },
  }),
});

module.exports = { RootQueryType };
