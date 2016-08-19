'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const quotes = fs.readFileSync('kafka-quotes.txt').toString().split("\n");

const randomQuote = () => quotes[Math.floor(Math.random()*quotes.length)];

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 8000
});

// Add the route
server.route({
  method: 'GET',
  path:'/quote.txt',
  handler: function (request, reply) {

    return reply(randomQuote())
            .type('text/plain');
  }
});

// Start the server
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
