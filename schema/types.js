const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const GraphQLDate = require("graphql-date");

const personType = new GraphQLObjectType({
  name: "Person",
  description: "person",
  fields: () => ({
    id: {
      type: GraphQLNonNull(GraphQLInt),
      description: "a person's id",
    },
    firstName: {
      type: GraphQLString,
      description: "a person's first name",
    },
    lastName: {
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
    licenseNumber: {
      type: GraphQLInt,
      description: "a person's  license number",
    },
    licenseDate: {
      type: GraphQLDate,
      description: "a person's license date",
    },
  }),
});

module.exports = { personType };
