const { GraphQLSchema } = require("graphql");
const { RootQueryType } = require("./query");

const schema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = { schema };
