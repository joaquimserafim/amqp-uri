'use strict';

var util  = require('util');
var error = require('ferror')('amqp-uri');

function isJsObject(arg) {
  return typeof arg === 'object' && arg !== null && !Array.isArray(arg);
}

module.exports = amqpUri;
//
// amqp_URI = "amqp://" amqp_authority [ "/" vhost ] [ "?" query ]
//
function amqpUri(conf) {
  if (!isJsObject(conf)) {
    throw error('Only accepts a JS object!');
  }

  var auth = '';
  var query = '';

  if (conf.user && conf.password) {
    auth = util.format('%s:%s@', conf.user, conf.password);
  }

  return util.format('%s://%s%s:%d%s%s',
    conf.ssl ? 'amqps' : 'amqp',
    auth,
    conf.host || 'localhost',
    conf.port || (conf.ssl ? 5671 : 5672),
    conf.vhost ? '/' + conf.vhost : '',
    query
  );
}
