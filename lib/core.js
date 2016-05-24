'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _taggedTemplateLiteral2 = require('babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(['', ''], ['', '']);

exports.default = apollo;

var _gql = require('apollo-client/gql');

var _gql2 = _interopRequireDefault(_gql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function apollo(Client) {
  return {
    mutateWith: function mutateWith(options, cb) {
      var mutation = options.mutation;
      var others = (0, _objectWithoutProperties3.default)(options, ['mutation']);


      var taggedMutation = (0, _gql2.default)(_templateObject, mutation);

      Client.mutate((0, _extends3.default)({
        mutation: taggedMutation
      }, others)).then(function (graphQLResult) {
        var errors = graphQLResult.errors;
        var data = graphQLResult.data;

        cb(errors, data);
      }).catch(function (ex) {
        cb(ex);
      });
    }
  };
}