const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
// const { schema } = require("./schema/index");
const { schema } = require("./graphql/schema");
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
  schema: schema,
  graphiql: true,
});

(async () => {
  try {
    await server.start();
    app.use("/graphql", expressMiddleware(server));
  } catch (error) {
    console.log(error);
  }
})();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app on http://localhost:${PORT}`);
});
