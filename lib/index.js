'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureGraphQLServer = exports.configureGraphQLClient = exports.apollo = undefined;

var _apollo = require('./apollo');

var _apollo2 = _interopRequireDefault(_apollo);

var _configureClient = require('./configure-client');

var _configureClient2 = _interopRequireDefault(_configureClient);

var _configureServer = require('./configure-server');

var _configureServer2 = _interopRequireDefault(_configureServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.apollo = _apollo2.default;
exports.configureGraphQLClient = _configureClient2.default;
exports.configureGraphQLServer = _configureServer2.default;