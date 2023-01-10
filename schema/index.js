const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./query");
const { MutationType } = require("./mutation");

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType,
});

module.exports = { schema };
