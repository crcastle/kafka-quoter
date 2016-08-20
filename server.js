'use strict';

const Hapi = require('hapi');
const Accept = require('accept');
const fs = require('fs');
const quotes = fs.readFileSync('kafka-quotes.txt').toString().split("\n")
const randomQuote = () => quotes[Math.floor(Math.random()*quotes.length)];

/*
 * Create server
 *
 */
const server = new Hapi.Server();
server.connection({
  port: process.env.PORT || 8000
});


/*
 * Add the routes and route handlers
 *
 */
const textHandler = (request, reply) => {
  return reply(randomQuote())
          .type('text/plain');
};

const htmlHandler = (request, reply) => {
  return reply.view('index', { quote: randomQuote() });
}

server.route({
  method: 'GET',
  path: '/{quote}.txt',
  handler: textHandler
});

server.route({
  method: 'GET',
  path: '/{quote}.html',
  handler: htmlHandler
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    const mediaTypes = Accept.parseAll(request.headers).mediaTypes;
    for (var i in mediaTypes) {
      if (mediaTypes[i] == 'text/html') {
        return htmlHandler(request, reply);
      } else if (mediaTypes[i] == 'text/plain') {
        return textHandler(request, reply);
      }
    }
    return textHandler(request, reply);
  }
});

server.register(require('vision'), (err) => {
  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views'
  });
});

// Start the server
server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
