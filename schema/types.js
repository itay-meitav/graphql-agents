const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const GraphQLDate = require("graphql-date");
const { resolveWhere } = require("./resolvers");

const agentType = new GraphQLObjectType({
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
      type: cityType,
      description: "an agent's city",
      resolve: (agent) => resolveWhere("cities", "city", agent.city),
    },
    status: {
      type: GraphQLString,
      description: "an agent's status",
    },
    license_number: {
      type: licenseType,
      description: "an agent's license number",
      resolve: (agent) =>
        resolveWhere("licenses", "license_number", agent.license_number),
    },
    car_number: {
      type: carType,
      description: "an agent's car number",
      resolve: (agent) => resolveWhere("cars", "car_number", agent.car_number),
    },
  }),
});

const cityType = new GraphQLObjectType({
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

const licenseType = new GraphQLObjectType({
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
  }),
});

const carType = new GraphQLObjectType({
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
  }),
});

module.exports = { agentType, cityType, licenseType, carType };
