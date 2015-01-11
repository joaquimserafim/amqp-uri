'use strict';

var format  = require('util').format;
var error   = require('ferror')('amqp-uri');

//
// amqp_URI = "amqp://" amqp_authority [ "/" vhost ] [ "?" query ]
//
// cacertfile certfile keyfile 
// verify fail_if_no_peer_cert
// mechanism
// heartbeat - OK
// connection_timeout - OK
// channel_max - OK
// frame_max - OK

module.exports = amqpUri();

function amqpUri() {
  var defaults = [
    'heartbeat',
    'connection_timeout',
    'channel_max',
    'frame_max'
  ];

  function isJsObject(arg) {
    return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
  }

  function params(conf) {
    return defaults.map(function(def) {
      if (conf[def]) {
        return format('%s=%s', def, conf[def]);
      }
    })
    .filter(function(param) { return param; })
    .join('&');
  }

  function create(conf) {
    if (!isJsObject(conf)) {
      throw error('Only accepts a JS object!');
    }

    var auth = '';
    var query = params(conf);

    if (conf.user && conf.password) {
      auth = format('%s:%s@', conf.user, conf.password);
    }

    return format('%s://%s%s:%d%s%s',
      conf.ssl ? 'amqps' : 'amqp',
      auth,
      conf.host || 'localhost',
      conf.port || (conf.ssl ? 5671 : 5672),
      conf.vhost ? '/' + conf.vhost : '',
      query && '?' + query
    );
  }

  return create;
}
