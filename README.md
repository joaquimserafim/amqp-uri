# amqp-uri

**creates an AMQP URI from a JS object**

<a href="https://nodei.co/npm/amqp-uri/"><img src="https://nodei.co/npm/amqp-uri.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/amqp-uri.png?branch=master)](https://travis-ci.org/joaquimserafim/amqp-uri)


info about AMQP URI Specification in [here](http://www.rabbitmq.com/uri-spec.html) & for URI query parameters in [here](http://www.rabbitmq.com/uri-query-parameters.html)

####Example

    var amqpUri = require('amqp-uri');

    var conf = {
        ssl: false,
        host: 'localhost',
        port: 5566,
        vhost: 'some_vhost'
    };

    var uri = amqpUri(conf); // amqp://localhost:5566/some_vhost