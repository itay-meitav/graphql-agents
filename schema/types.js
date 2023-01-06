const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const GraphQLDate = require("graphql-date");
const { resolveCitiesName } = require("./resolvers");

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
      resolve: (agent) => resolveCitiesName(agent.city),
    },
    status: {
      type: GraphQLString,
      description: "an agent's status",
    },
    license_number: {
      type: GraphQLInt,
      description: "an agent's license number",
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
    office: {
      type: GraphQLString,
      description: "a city's office location",
    },
    has_council: {
      type: GraphQLString,
      description: "a city's council status",
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
      description: "an agent's license date",
    },
  }),
});

module.exports = { agentType, cityType, licenseType };
