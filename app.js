const express = require("express");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server");
const { expressMiddleware } = require("@apollo/server/express4");

const routes = require("./src/routes/index.route");

async function init() {
  const books = [
    {
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      title: "City of Glass",
      author: "Paul Auster",
    },
  ];

  const typeDefs = gql`
    type Book {
      title: String
      author: String
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

  const app = express();

  app.use(cors({ origin: "*" }));
  app.use(express.json());

  app.use("/", routes.todoRoute);

  await server.listen(8000, () => {
    console.log(`GraphQL Server listening at port 8000`);
  });

  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({
      status: 200,
      message: "Default route!",
      data: [],
    });
  });

  app.listen(8001, (err) => {
    if (err) return `Server not running due to ${err.message}`;
    console.log(`App Server listening at port 8001`);
  });
}

init();

// module.exports = app;
