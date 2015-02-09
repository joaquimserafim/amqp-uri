# amqp-uri

creates an AMQP URI from a JS object

<a href="https://nodei.co/npm/amqp-uri/"><img src="https://nodei.co/npm/amqp-uri.png?downloads=true"></a>


[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=flat-square)](https://travis-ci.org/joaquimserafim/amqp-uri)![Code Coverage 100%](https://img.shields.io/badge/code%20coverage-100%25-green.svg?style=flat-square)[![ISC License](https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square)](https://github.com/joaquimserafim/amqp-uri/blob/master/LICENSE)


info about AMQP URI Specification in [here](http://www.rabbitmq.com/uri-spec.html) & for URI query parameters in [here](http://www.rabbitmq.com/uri-query-parameters.html) 

PS: because of some Node.js modules changed the name of the query params ([amqp.node](http://www.squaremobius.net/amqp.node/doc/channel_api.html) for example) instead of `channel_max` is `channelMax`.

## Example

    var amqpUri = require('amqp-uri');

    var conf = {
        ssl: false,
        host: 'localhost',
        port: 5566,
        vhost: 'some_vhost',
        frameMax: 8192
    };

    var uri = amqpUri(conf); // amqp://localhost:5566/some_vhost?frameMax=8192
