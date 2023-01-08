const express = require("express");
const { graphqlHTTP } = require("express-graphql");
// const { schema } = require("./schema/index");
const { schema } = require("./graphql/schema");

const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    pretty: true,
    graphiql: true,
  })
);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`app on http://localhost:${PORT}`);
});
