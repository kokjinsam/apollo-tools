'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureGraphQLServer = exports.configureGraphQLClient = exports.apollo = undefined;

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _configureClient = require('./configure-client');

var _configureClient2 = _interopRequireDefault(_configureClient);

var _configureServer = require('./configure-server');

var _configureServer2 = _interopRequireDefault(_configureServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.apollo = _core2.default;
exports.configureGraphQLClient = _configureClient2.default;
exports.configureGraphQLServer = _configureServer2.default;