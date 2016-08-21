## Get a random quote from your buddy [Franz](https://en.wikipedia.org/wiki/Franz_Kafka)

`curl http://kafkafra.nz`

#### or even better (if you're on OS X, nay macOS)

`curl http://kafkafra.nz | say`

#### or even better if you use [Apache Kafka on Heroku](https://www.heroku.com/kafka) and run the `heroku kafka:wait` command a lot

`heroku kafka:wait; say $(curl http://kafkafra.nz)`

![Franz Kafka](https://upload.wikimedia.org/wikipedia/commons/4/4c/Kafka1906_cropped.jpg)

### Notes
- text/plain or text/html content type will be returned.
- Content type returned is dependent on URL path suffix or Accept HTTP header.
- If path suffix and header conflict, path suffix wins.
- The default is text/plain. i.e. if path suffix is neither .txt nor .html *and* Accept header is neither text/plain nor text/html, text/plain is returned.
