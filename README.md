# Node.js esclient module

[![build:?](https://img.shields.io/travis/Enrise/node-esclient.svg?style=flat-square)](https://travis-ci.org/Enrise/node-esclient)
[![Coverage Status](https://img.shields.io/coveralls/Enrise/node-esclient/master.svg?style=flat-square)](https://coveralls.io/github/Enrise/node-esclient?branch=master)
[![dependencies:?](https://img.shields.io/david/Enrise/node-esclient.svg?style=flat-square)](https://david-dm.org/Enrise/node-esclient)
[![devDependencies:?](https://img.shields.io/david/dev/Enrise/node-esclient.svg?style=flat-square)](https://david-dm.org/Enrise/node-esclient)

> A simple wrapper around the [elasticsearch](https://github.com/elastic/elasticsearch-js) client, optionally with [enrise-logger](https://github.com/Enrise/node-logger) integration.

## Deprecated

This repository is deprecated and will be archived.

### Installation
NPM: `npm install enrise-esclient --save`  
Yarn: `yarn add enrise-esclient`

### Initialization and usage
Require and instantiate the client, where config is an optional object passed to [elasticsearch](https://www.npmjs.com/package/elasticsearch):  
`const ESClient = new require('enrise-esclient')([config: Object]);`

This instantiates an elasticsearch client with a KeepAlive agent.

### Configuration
The only default configuration option this module sets is the [`createNodeAgent`](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html#config-create-node-agent) to connect with a KeepAlive agent. Also it has extra logging abstractions (below). For further instructions on configuring the client see the official [elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html).

#### `[log]`
This module optionally supports passing an [enrise-logger](https://github.com/Enrise/node-logger) instance to the client. To use this, initialize the logger beforehand, and then pass an instance to the esclient upon instantiation:  
```javascript
const enriseClient = require('enrise-client');

// Initialize enrise logger
const logger = require('enrise-logger')();

// Instantiate elasticsearch client with an enrise-logger
const client = new enriseClient({
  log: logger.get('Elasticsearch')
});
```
