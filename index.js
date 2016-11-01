'use strict';

const _ = require('lodash');
const elasticsearch = require('elasticsearch');
const AgentKeepAlive = require('agentkeepalive');

module.exports = function ESClient(config) {

  // Require logger inside constructor. This way enrise-esclient can be included before logger initialization.
  const log = require('enrise-logger').get('Elasticsearch');

  function LogConstructor() {
    // info tends to log 'Request complete' messages which we usually don't care about
    this.info = log.debug;
    this.debug = log.debug;
    this.error = log.error;
    this.warning = log.warn;

    // this can not be an arrow function because we require access the arguments.
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
    log: LogConstructor
  }, config || {});

  return new elasticsearch.Client(config);
};
