const { GraphQLJSON, GraphQLDate } = require("graphql-scalars");
const {
  resolveSelect,
  resolveDelete,
  resolveInsert,
  resolveUpdate,
} = require("./schema/resolvers");

const resolversMap = {
  Query: {
    agent: (obj, { args }) => resolveSelect("agents", args),
    city: (obj, { args }) => resolveSelect("cities", args),
    license: (obj, { args }) => resolveSelect("licenses", args),
    car: (obj, { args }) => resolveSelect("cars", args),
  },
  Agent: {
    city: (agent) => resolveSelect("cities", { city_name: agent.city }, true),
    license_number: (agent) =>
      resolveSelect("licenses", { license_number: agent.license_number }, true),
    car_number: (agent) =>
      resolveSelect("cars", { car_number: agent.car_number }, true),
  },
  License: {
    license_owner: (license) =>
      resolveSelect("agents", { license_number: license.license_number }, true),
  },
  Car: {
    car_owner: (car) =>
      resolveSelect("agents", { car_number: car.car_number }, true),
  },
  Mutation: {
    agent: (agent, { action, values, where }) =>
      matchResolver(action, "agents", values, where),
    city: (city, { action, values, where }) =>
      matchResolver(action, "cities", values, where),
    license: (license, { action, values, where }) =>
      matchResolver(action, "licenses", values, where),
    car: (car, { action, values, where }) =>
      matchResolver(action, "cars", values, where),
  },
  Json: GraphQLJSON,
  Date: GraphQLDate,
};

function matchResolver(action, table, values, where) {
  switch (action) {
    case "INSERT":
      return resolveInsert(table, values);
    case "UPDATE":
      return resolveUpdate(table, values, where);
    case "DELETE":
      return resolveDelete(table, where);
    default:
      throw new Error("Invalid Action");
  }
}

module.exports = { resolversMap, matchResolver };
