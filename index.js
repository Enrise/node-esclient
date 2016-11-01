'use strict';

const _ = require('lodash');
const elasticsearch = require('elasticsearch');
const AgentKeepAlive = require('agentkeepalive');

module.exports = function ESClient(config) {

  const log = config && config.log;

  function LogConstructor() {
    // info tends to log 'Request complete' messages which we usually don't care about
    this.info = log.debug;
    this.debug = log.debug;
    this.error = log.error;
    this.warning = log.warn;

    // this can not be an arrow function because we require access to the arguments.
    this.trace = function () {
      const data = _.zipObject(['httpMethod', 'requestUrl', 'requestBody', 'responseBody', 'statusCode'], arguments);
      data.requestUrl = _.omit(data.requestUrl, 'agent');
      log.verbose(data);
    };
    this.close = () => {};
  }

  config = _.merge({
    createNodeAgent: function (connection, conf) {
      return new AgentKeepAlive(connection.makeAgentConfig(conf));
    },
    log: log && LogConstructor
  }, config || {});

  return new elasticsearch.Client(config);
};
