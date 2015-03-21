'use strict'

var format      = require('util').format
var isJsObject  = require('is-js-object')
var isEmpty     = require('is-js-obj-empty')

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

module.exports = AMQPUri

function AMQPUri(conf) {
  var defaults = [
    'heartbeat',
    'connectionTimeout',
    'channelMax',
    'frameMax'
  ]

  function params(conf) {
    var rParams = []
    defaults.forEach(function(def) {
      if (conf[def]) {
        rParams.push(format('%s=%s', def, conf[def]))
      }
    })

    return rParams.join('&')
  }

  function create(conf) {
    if (!isJsObject(conf) || isEmpty(conf)) {
      throw new TypeError('Only accepts a JS object!')
    }

    var auth  = ''
    var query = params(conf)

    if (conf.user && conf.password) {
      auth = format('%s:%s@', conf.user, conf.password)
    }

    return format('%s://%s%s:%d%s%s',
      conf.ssl ? 'amqps' : 'amqp',
      auth,
      conf.host || 'localhost',
      conf.port || (conf.ssl ? 5671 : 5672),
      conf.vhost ? '/' + conf.vhost : '',
      query && '?' + query
    )
  }

  return create(conf)
}
