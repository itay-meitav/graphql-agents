const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { buildSchema, printSchema } = require("graphql");
const { resolversMap } = require("./resolversMap");

const typeDef = loadSchemaSync(__dirname + "/**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

// const schema = buildSchema(typeDef);
// console.log(printSchema(schema));

const schema = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: resolversMap,
});

module.exports = { schema };
