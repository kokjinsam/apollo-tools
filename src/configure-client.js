import ApolloClient, { createNetworkInterface } from 'apollo-client';

function configureGraphQLClient({
  url = 'graphql',
  auth = false,
}) {
  if (!Package['meteor']) {
    const error = 'Meteor package is missing';
    throw new Error(error);
  }

  if (!Package['accounts-base']) {
    const error = 'accounts-base package is missing';
    throw new Error(error);
  }

  const Meteor = Package['meteor'].Meteor;
  // this is important for SSR;
  const fullUrl = Meteor.absoluteUrl(url);
  const networkInterface = createNetworkInterface(fullUrl);

  const Accounts = Package['accounts-base'].Accounts;

  if (auth) {
    networkInterface.use([{
      applyMiddleware(request, next) {
        /* eslint-disable no-underscore-dangle */
        const currentUserToken = Accounts._storedLoginToken();

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
      },
    }]);
  }

  const Client = new ApolloClient({
    networkInterface,
  });

  return Client;
}

export default configureGraphQLClient;
