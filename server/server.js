const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');

// Apollo Server, type def & resolvers imports
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers} = require('../schemas');

const PORT = process.env.PORT || 3001;
const app = express();

// Setup Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

// Apply the middleware of app coming from express
server.applyMiddleware({ app });


// Form handling POST as Json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.listen(PORT, () => {
  console.log(`API server running port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost: ${PORT}`);
});



// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
