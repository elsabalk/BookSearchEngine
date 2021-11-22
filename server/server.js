const express = require('express');
const path = require('path');

//import apollo server
const { ApolloServer } = require('apollo-server-express');
// import typeDefs and resolvers
const { typeDefs, resolvers} = require('../schemas');
const {authMiddleware} = require('./utils/auth');


//db connection
const db = require('./config/connection');


//express server
const app = express();
const PORT = process.env.PORT || 3001;;

// Setup Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Apply the middleware of app coming from express
server.applyMiddleware({ app });


// Form handling POST as Json
app.use(urlencoded({ extended: false }));
app.use(json());


app.listen(PORT, () => {
  console.log(`API server running port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost: ${PORT}`);
});


// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }


//get all
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});