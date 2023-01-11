const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { loadSchemaSync } = require("@graphql-tools/load");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { resolversMap } = require("./resolversMap");
// const { schema } = require("./schema/index");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
  express.json(),
  express.urlencoded({ extended: true })
);

const server = new ApolloServer({
  typeDefs: loadSchemaSync(__dirname + "/**/*.graphql", {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers: resolversMap,
});

(async () => {
  try {
    await server.start();
    app.use("/graphql", expressMiddleware(server));
  } catch (error) {
    console.log(error);
  }
})();

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`app on http://localhost:${PORT}`);
});
