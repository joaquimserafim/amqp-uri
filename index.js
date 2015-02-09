'use strict';

var util        = require('util');
var isJsObject  = require('is-js-object');
var isEmpty     = require('is-js-obj-empty');

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
module.exports.AMQPURIError = AMQPURIError;

function amqpUri() {
  var defaults = [
    'heartbeat',
    'connectionTimeout',
    'channelMax',
    'frameMax'
  ];

  function params(conf) {
    return defaults.map(function(def) {
      if (conf[def]) {
        return util.format('%s=%s', def, conf[def]);
      }
    })
    .filter(function(param) { return param; })
    .join('&');
  }

  function create(conf) {
    if (!isJsObject(conf) || isEmpty(conf)) {
      throw new AMQPURIError('Only accepts a JS object!');
    }

    var auth = '';
    var query = params(conf);

    if (conf.user && conf.password) {
      auth = util.format('%s:%s@', conf.user, conf.password);
    }

    return util.format('%s://%s%s:%d%s%s',
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

function AMQPURIError(error) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = error;
}
util.inherits(AMQPURIError, Error);
