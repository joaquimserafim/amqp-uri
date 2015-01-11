'use strict';

var test = require('tape');
var amqpUri = require('./');

test('passing a string instead of a JS object', function(assert) {
  var output = /Only accepts a JS object!/;
  assert.throws(function() {
    amqpUri('hello world!!!!');
  }, output);
  assert.end();
});

test('passing a valid JS object', function(assert) {
  var obj = {
    ssl: false,
    host: 'localhost',
    port: 5566,
    vhost: 'some_vhost'
  };

  var uri = amqpUri(obj);
  assert.equal('amqp://localhost:5566/some_vhost', uri, uri);
  assert.end();
});

test('now with authentication', function(assert) {
  var obj = {
    user: 'test',
    password: 'pwd'
  };

  var uri = amqpUri(obj);
  assert.equal('amqp://test:pwd@localhost:5672', uri, uri);
  assert.end();
});

test('now with SSL', function(assert) {
  var obj = {
    ssl: true
  };

  var uri = amqpUri(obj);
  assert.equal('amqps://localhost:5671', uri, uri);
  assert.end();
});

test('now with query parameters', function(assert) {
  var obj = {
    heartbeat: 10
  };

  var uri = amqpUri(obj);
  assert.equal('amqp://localhost:5672?heartbeat=10', uri, uri);
  assert.end();
});
