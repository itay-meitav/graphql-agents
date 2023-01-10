const { GraphQLObjectType } = require("graphql");
const { resolveDelete, resolveInsert, resolveUpdate } = require("./resolvers");
const { ResultType } = require("./types");

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Mutation root",
  fields: () => ({
    updateAgent: {
      type: ResultType,
      resolve: (agent, { values, where }) =>
        resolveUpdate("agents", values, where),
    },
    deleteAgent: {
      type: ResultType,
      resolve: (agent, { where }) => resolveDelete("agents", where),
    },
    insertAgent: {
      type: ResultType,
      resolve: (agent, { values }) => resolveInsert("agents", values),
    },
    updateCity: {
      type: ResultType,
      resolve: (city, { values, where }) =>
        resolveUpdate("cities", values, where),
    },
    deleteCity: {
      type: ResultType,
      resolve: (city, { where }) => resolveDelete("cities", where),
    },
    insertCity: {
      type: ResultType,
      resolve: (city, { values }) => resolveInsert("cities", values),
    },
    updateLicense: {
      type: ResultType,
      resolve: (license, { values, where }) =>
        resolveUpdate("licenses", values, where),
    },
    deleteLicense: {
      type: ResultType,
      resolve: (license, { where }) => resolveDelete("licenses", where),
    },
    insertLicense: {
      type: ResultType,
      resolve: (license, { values }) => resolveInsert("licenses", values),
    },
    updateCar: {
      type: ResultType,
      resolve: (car, { values, where }) => resolveUpdate("cars", values, where),
    },
    deleteCar: {
      type: ResultType,
      resolve: (car, { where }) => resolveDelete("cars", where),
    },
    insertCar: {
      type: ResultType,
      resolve: (car, { values }) => resolveInsert("cars", values),
    },
  }),
});

module.exports = { MutationType };
