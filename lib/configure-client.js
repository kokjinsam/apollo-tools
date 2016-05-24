'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureGraphQLClient(_ref) {
  var _ref$url = _ref.url;
  var url = _ref$url === undefined ? 'graphql' : _ref$url;
  var _ref$auth = _ref.auth;
  var auth = _ref$auth === undefined ? false : _ref$auth;

  if (!Package['meteor']) {
    var error = 'Meteor package is missing';
    throw new Error(error);
  }

  if (!Package['accounts-base']) {
    var _error = 'accounts-base package is missing';
    throw new Error(_error);
  }

  var Meteor = Package['meteor'].Meteor;
  // this is important for SSR;
  var fullUrl = Meteor.absoluteUrl(url);
  var networkInterface = (0, _apolloClient.createNetworkInterface)(fullUrl);

  var Accounts = Package['accounts-base'].Accounts;

  if (auth) {
    networkInterface.use([{
      applyMiddleware: function applyMiddleware(request, next) {
        /* eslint-disable no-underscore-dangle */
        var currentUserToken = Accounts._storedLoginToken();

        if (!currentUserToken) {
          next();
          return;
        }

        if (!request.options.headers) {
          /* eslint-disable no-param-reassign */
          request.options.headers = new Headers();
        }

        request.options.headers.MeteorLoginToken = currentUserToken;

        next();
      }
    }]);
  }

  var Client = new _apolloClient2.default({
    networkInterface: networkInterface
  });

  return Client;
}

exports.default = configureGraphQLClient;