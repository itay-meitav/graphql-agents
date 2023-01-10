const { GraphQLObjectType } = require("graphql");
const { ActionType, ResultType } = require("./types");
const {
  CarInputType,
  AgentInputType,
  LicenseInputType,
  CityInputType,
} = require("./inputs");
const { matchResolver } = require("../graphql/resolversMap");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation root",
  fields: () => ({
    agent: {
      type: ResultType,
      args: {
        action: { type: ActionType },
        values: { type: AgentInputType },
        where: { type: AgentInputType },
      },
      resolve: (agent, { action, values, where }) =>
        matchResolver(action, "agents", values, where),
    },
    city: {
      type: ResultType,
      args: {
        action: { type: ActionType },
        values: { type: CityInputType },
        where: { type: CityInputType },
      },
      resolve: (city, { action, values, where }) =>
        matchResolver(action, "cities", values, where),
    },
    license: {
      type: ResultType,
      args: {
        action: { type: ActionType },
        values: { type: LicenseInputType },
        where: { type: LicenseInputType },
      },
      resolve: (license, { action, values, where }) =>
        matchResolver(action, "licenses", values, where),
    },
    car: {
      type: ResultType,
      args: {
        action: { type: ActionType },
        values: { type: CarInputType },
        where: { type: CarInputType },
      },
      resolve: (car, { action, values, where }) =>
        matchResolver(action, "cars", values, where),
    },
  }),
});

module.exports = { MutationType };
