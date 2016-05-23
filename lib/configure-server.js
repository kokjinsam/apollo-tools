import { apolloServer } from 'apollo-server';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';

export default function ({
  schema,
  resolvers,
  port = 4000,
  url = '/graphql',
  graphiql = true,
  pretty = true,
}) {
  if (schema === 'undefined' || schema === 'null') {
    const error = 'Schema is missing';
    throw new Error(error);
  }

  if (resolvers === 'undefined' || resolvers === 'null') {
    const error = 'Resolvers are missing';
    throw new Error(error);
  }

  if (!Package['webapp']) {
    const error =
      'WebApp is required to configure a Meteor GraphQL server.';
    throw new Error(error);
  }

  const graphQLServer = express();
  const GRAPHQL_PORT = port;

  graphQLServer.use(url, apolloServer({
    graphiql,
    pretty,
    schema,
    resolvers,
  }));

  graphQLServer.listen(GRAPHQL_PORT, () => console.log(`
    GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}
    Checkout http://localhost:${GRAPHQL_PORT}${url} to access GraphiQL
  `));

  const WebApp = Package['webapp'].WebApp;
  WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
}
