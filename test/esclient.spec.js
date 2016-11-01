'use strict';

const _ = require('lodash');
const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const expect = chai.expect;
chai.use(require('sinon-chai'));

describe('ESClient', () => {

  let EnriseClient;
  let ElasticsearchClient;
  let logger;
  let logVerbose;
  let agentkeepalive;

  beforeEach(() => {
    ElasticsearchClient = sinon.stub().returns({
      foo: 'bar'
    });
    logVerbose = sinon.stub();
    logger = sinon.stub().returns({
      debug: 'DEBUG',
      error: 'ERROR',
      warn: 'WARN',
      verbose: logVerbose
    });
    agentkeepalive = sinon.stub();

    EnriseClient = proxyquire('../index.js', {
      elasticsearch: {
        Client: ElasticsearchClient
      },
      agentkeepalive: agentkeepalive,
      'enrise-logger': {
        get: logger
      }
    });
  });

  it('correctly initializes the logger', () => {
    new EnriseClient(); // eslint-disable-line no-new
    expect(logger).to.have.been.calledOnce;
    expect(logger).to.have.been.calledWith('Elasticsearch');
  });

  it('instantiates the elasticsearch client with default AgentKeepAlive and logger', () => {
    const ESClient = new EnriseClient({
      my: 'settings'
    });
    expect(ESClient).to.deep.equal({
      foo: 'bar'
    });
    const settings = ElasticsearchClient.args[0][0];

    // Test the createNodeAgent and logger in a separate test
    expect(_.omit(settings, 'createNodeAgent', 'log')).to.deep.equal({
      my: 'settings'
    });
  });

  it('overwrites default configuration', () => {
    const config = {
      createNodeAgent: () => {},
      log: () => {},
      other: 'custom settings'
    };
    new EnriseClient(config); // eslint-disable-line no-new
    expect(ElasticsearchClient).to.have.been.calledWith({
      createNodeAgent: config.createNodeAgent,
      log: config.log,
      other: 'custom settings'
    });
  });

  it('correctly calls the AgentKeepAlive', () => {
    new EnriseClient(); // eslint-disable-line no-new
    const connection = {
      makeAgentConfig: sinon.stub().returns('call agentkeepalive')
    };
    const config = {
      foo: 'bar'
    };
    // Call the createNodeAgent on the settings object passed to ElasticsearchClient
    ElasticsearchClient.args[0][0].createNodeAgent(connection, config);
    expect(connection.makeAgentConfig).to.have.been.calledWith({
      foo: 'bar'
    });
    expect(agentkeepalive).to.have.been.calledWith('call agentkeepalive');
  });

  it('correctly creates the LogConstructor and formats trace information', () => {
    new EnriseClient(); // eslint-disable-line no-new

    // Retrieve the LogConstructor the settings object passed to ElasticsearchClient
    const LogConstructor = ElasticsearchClient.args[0][0].log;
    chai.assert.isFunction(LogConstructor);

    const log = new LogConstructor(); // eslint-disable-line no-new
    log.trace('POST', {url: 'local:9200', agent: 'elasticsearch'}, {request: 'body'}, {response: 'body'}, 200);

    expect(logVerbose).to.have.been.calledWith({
      httpMethod: 'POST',
      requestUrl: {
        url: 'local:9200'
      },
      requestBody: {
        request: 'body'
      },
      responseBody: {
        response: 'body'
      },
      statusCode: 200
    });
  });
});
