'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _apolloClient = require('apollo-client');

var _apolloClient2 = _interopRequireDefault(_apolloClient);

var _queryTransform = require('apollo-client/queries/queryTransform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureGraphQLClient(options) {
  var Meteor = Package['meteor'].Meteor;
  var Accounts = Package['accounts-base'].Accounts;

  if (!Meteor) {
    var error = 'Meteor package is missing';
    throw new Error(error);
  }

  if (!Accounts) {
    var _error = 'accounts-base package is missing';
    throw new Error(_error);
  }

  var _options$urlName = options.urlName;
  var urlName = _options$urlName === undefined ? 'graphql' : _options$urlName;
  var _options$auth = options.auth;
  var auth = _options$auth === undefined ? false : _options$auth;
  var others = (0, _objectWithoutProperties3.default)(options, ['urlName', 'auth']);

  /* eslint-disable no-underscore-dangle */
  // this is important for SSR;

  var fullUrl = Meteor.absoluteUrl(urlName);
  var _networkInterface = (0, _apolloClient.createNetworkInterface)(fullUrl);

  // this part is from meteor-integration
  if (auth) {
    _networkInterface.use([{
      applyMiddleware: function applyMiddleware(request, next) {
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

  var Client = new _apolloClient2.default((0, _extends3.default)({
    networkInterface: _networkInterface,
    queryTransformer: _queryTransform.addTypenameToSelectionSet,
    dataIdFromObject: function dataIdFromObject(result) {
      if (result.id && result.__typename) {
        return result.__typename + result.id;
      }

      return null;
    }
  }, others));

  return Client;
}

exports.default = configureGraphQLClient;