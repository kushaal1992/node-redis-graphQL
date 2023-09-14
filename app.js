const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const { expressMiddleware } = require("@apollo/server/express4");

// Route Declarations
const routes = require("./src/routes/index.route");

// Variable Declarations
const app = express();

async function init() {
  const books = [
    {
      title: "The Awakening",
      author: "Kate Chopin",
      sales: "1 M",
    },
    {
      title: "City of Glass",
      author: "Paul Auster",
      sales: "5 M",
    },
  ];

  const typeDefs = gql`
    type Book {
      title: String
      author: String
      sales: String
    }

    type Query {
      books: [Book]
    }
  `;

  const resolvers = {
    Query: {
      books: () => books,
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });

  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.use("/", routes.todoRoute);

  await server.start();
  server.applyMiddleware({ app });

  //   app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({
      status: 200,
      message: "Default route!",
      data: [],
    });
  });
}

init();
app.listen(8001, (err) => {
  if (err) return `Server not running due to ${err.message}`;
  console.log(`App Server listening at port 8001`);
});

// module.exports = app;
