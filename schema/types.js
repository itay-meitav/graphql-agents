const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const GraphQLDate = require("graphql-date");

const agentType = new GraphQLObjectType({
  name: "Agent",
  description: "An agent",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "a person's id",
    },
    first_name: {
      type: GraphQLString,
      description: "a person's first name",
    },
    last_name: {
      type: GraphQLString,
      description: "a person's last name",
    },
    city: {
      type: GraphQLString,
      description: "a person's city",
    },
    status: {
      type: GraphQLString,
      description: "a person's status",
    },
    license_number: {
      type: GraphQLInt,
      description: "a person's  license number",
    },
    license_date: {
      type: GraphQLDate,
      description: "a person's license date",
    },
  }),
});

module.exports = { agentType };
