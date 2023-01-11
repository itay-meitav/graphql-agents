const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLEnumType,
} = require("graphql");
const { GraphQLDate, GraphQLJSON } = require("graphql-scalars");
const { resolveSelect } = require("./resolvers");

const AgentType = new GraphQLObjectType({
  name: "Agent",
  description: "An agent",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "an agent's id",
    },
    first_name: {
      type: GraphQLString,
      description: "an agent's first name",
    },
    last_name: {
      type: GraphQLString,
      description: "an agent's last name",
    },
    city: {
      type: CityType,
      description: "an agent's city",
      resolve: (agent) =>
        resolveSelect("cities", { city_name: agent.city }, true),
    },
    status: {
      type: GraphQLString,
      description: "an agent's status",
    },
    license_number: {
      type: LicenseType,
      description: "an agent's license number",
      resolve: (agent) =>
        resolveSelect(
          "licenses",
          { license_number: agent.license_number },
          true
        ),
    },
    car_number: {
      type: CarType,
      description: "an agent's car number",
      resolve: (agent) =>
        resolveSelect("cars", { car_number: agent.car_number }, true),
    },
  }),
});

const CityType = new GraphQLObjectType({
  name: "City",
  description: "A city",
  fields: () => ({
    city_name: {
      type: GraphQLNonNull(GraphQLString),
      description: "a city's name",
    },
    city_code: {
      type: GraphQLInt,
      description: "a city's code",
    },
    sieve: {
      type: GraphQLString,
      description: "a city's sieve",
    },
    residents: {
      type: GraphQLInt,
      description: "a city's residents number",
    },
    english_name: {
      type: GraphQLString,
      description: "a city's name in english",
    },
  }),
});

const LicenseType = new GraphQLObjectType({
  name: "License",
  description: "A license",
  fields: () => ({
    license_number: {
      type: GraphQLNonNull(GraphQLInt),
      description: "a license's id",
    },
    license_date: {
      type: GraphQLDate,
      description: "a license's date",
    },
    rank: {
      type: GraphQLString,
      description: "a license's rank",
    },
    license_owner: {
      type: AgentType,
      description: "a license's owner",
      resolve: (license) =>
        resolveSelect(
          "agents",
          { license_number: license.license_number },
          true
        ),
    },
  }),
});

const CarType = new GraphQLObjectType({
  name: "Car",
  description: "A car",
  fields: () => ({
    car_number: {
      type: GraphQLNonNull(GraphQLInt),
      description: "a car's number",
    },
    production_year: {
      type: GraphQLInt,
      description: "a car's production year",
    },
    manufacturer: {
      type: GraphQLString,
      description: "a car's manufacturer",
    },
    manufacturing_country: {
      type: GraphQLString,
      description: "a car's manufacturing country",
    },
    fuel_type: {
      type: GraphQLString,
      description: "a car's fuel type",
    },
    rank: {
      type: GraphQLString,
      description: "a car's license rank",
    },
    car_owner: {
      type: AgentType,
      description: "a car's owner",
      resolve: (car) =>
        resolveSelect("agents", { car_number: car.car_number }, true),
    },
  }),
});

const ResultType = new GraphQLObjectType({
  name: "Result",
  description: "a result of mutating attempt",
  fields: () => ({
    success: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
    data: {
      type: GraphQLJSON,
    },
  }),
});

const ActionType = new GraphQLEnumType({
  name: "Action",
  description: "an action to be made in db",
  values: {
    INSERT: { value: "INSERT", description: "insert a new record" },
    UPDATE: { value: "UPDATE", description: "update an existing record" },
    DELETE: { value: "DELETE", description: "delete an existing record" },
  },
});

module.exports = {
  AgentType,
  CityType,
  LicenseType,
  CarType,
  ResultType,
  ActionType,
};
