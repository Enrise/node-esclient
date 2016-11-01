# Node.js esclient module

[![build:?](https://img.shields.io/travis/Enrise/node-esclient.svg?style=flat-square)](https://travis-ci.org/Enrise/node-esclient)
[![Coverage Status](https://img.shields.io/coveralls/Enrise/node-esclient/master.svg?style=flat-square)](https://coveralls.io/github/Enrise/node-esclient?branch=master)
[![dependencies:?](https://img.shields.io/david/Enrise/node-esclient.svg?style=flat-square)](https://david-dm.org/Enrise/node-esclient)
[![devDependencies:?](https://img.shields.io/david/dev/Enrise/node-esclient.svg?style=flat-square)](https://david-dm.org/Enrise/node-esclient)

> A simple wrapper around the [elasticsearch](https://github.com/elastic/elasticsearch-js) client with integrated [enrise-logger](https://github.com/Enrise/node-logger).

### Installation
NPM: `npm install enrise-esclient enrise-logger --save`  
Yarn: `yarn add enrise-esclient enrise-logger`

### Initialization and usage
Initialize the [logger](https://github.com/Enrise/node-logger) before instantiating the elasticsearch client:  
`require('enrise-logger');`

Require and instantiate the client, where config is an optional object passed to [elasticsearch](https://www.npmjs.com/package/elasticsearch):  
`const ESClient = new require('enrise-esclient')([config: Object]);`

This instantiates an elasticsearch client with a KeepAlive agent and logging enabled.

### Configuration
The only default configuration options this module sets is the [`createNodeAgent`](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-create-node-agent) and [`log`](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-log) option. For further instructions on configuring the client see the official [elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html).