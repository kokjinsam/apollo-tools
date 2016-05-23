import { apolloServer } from 'apollo-server';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';

export default function ({
  schema,
  resolvers,
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
  const GRAPHQL_PORT = 4000;

  graphQLServer.use('/graphql', apolloServer({
    graphiql: true,
    pretty: true,
    schema,
    resolvers,
  }));

  graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
  ));

  const WebApp = Package['webapp'].WebApp;
  WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
}
