const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const { GraphQLDate } = require("graphql-scalars");

const AgentInputType = new GraphQLInputObjectType({
  name: "AgentInput",
  fields: {
    id: { type: GraphQLNonNull(GraphQLInt) },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    city: { type: GraphQLString },
    status: { type: GraphQLString },
    license_number: { type: GraphQLInt },
    car_number: { type: GraphQLInt },
  },
});

const CityInputType = new GraphQLInputObjectType({
  name: "CityInput",
  fields: {
    city_name: { type: GraphQLNonNull(GraphQLString) },
    city_code: { type: GraphQLInt },
    sieve: { type: GraphQLString },
    residents: { type: GraphQLInt },
    english_name: { type: GraphQLString },
  },
});

const LicenseInputType = new GraphQLInputObjectType({
  name: "LicenseInput",
  fields: {
    license_number: { type: GraphQLNonNull(GraphQLInt) },
    license_date: { type: GraphQLDate },
    rank: { type: GraphQLString },
    license_owner: { type: GraphQLInt },
  },
});

const CarInputType = new GraphQLInputObjectType({
  name: "CarInput",
  fields: {
    car_number: { type: GraphQLNonNull(GraphQLInt) },
    production_year: { type: GraphQLInt },
    manufacturer: { type: GraphQLString },
    manufacturing_country: { type: GraphQLString },
    fuel_type: { type: GraphQLString },
    rank: { type: GraphQLString },
    car_owner: { type: GraphQLInt },
  },
});

module.exports = {
  AgentInputType,
  LicenseInputType,
  CarInputType,
  CityInputType,
};
