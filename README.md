## Apollo Tools

> This package is an Apollo wrapper that makes your life easier.

## configureGraphQLClient

Quick setup for a GraphQL client.

***Usage:***
```
import { configureGraphQLClient } from 'apollo-tools';

const Client = configureGraphQLClient({
  url: 'graphql',   //--- default: 'graphql', http://localhost:3000/graphql
  auth: false,      //--- default: false, to use Meteor Accounts System
});
```

## configureGraphQLServer

Unfortunately, this has some bugs that I'm still searching for solution. For the time being, your can copy and the following code in your server folder. This code is copied from ApolloStack docs.

```
import { WebApp } from 'meteor/webapp';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { apolloServer } from 'apollo-server';
import express from 'express';
import proxyMiddleware from 'http-proxy-middleware';

export default function ({ schema, resolvers }) {
  const graphQLServer = express();
  const GRAPHQL_PORT = 4000;

  graphQLServer.use('/graphql', apolloServer(async (req) => {

    const token = req.headers.authorization;
    check(token, String);
    const hashedToken = Accounts._hashLoginToken(token);

    // Get the user from the database
    const user = await Meteor.users.findOne({
      'services.resume.loginTokens.hashedToken': hashedToken,
    });

    return {
      graphiql: true,
      pretty: true,
      schema,
      resolvers,
      context: {
        user,
      },
    };
  }));

  graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}`
  ));

  WebApp.rawConnectHandlers.use(proxyMiddleware(`http://localhost:${GRAPHQL_PORT}/graphql`));
}

// server/main.js
import allSchemas from '/path/to/all-schemas';
import allResolvers from '/path/to/all-resolvers';

configureGraphQLServer({
  schema: allSchemas,
  resolvers: allResolvers,
});
```

## apollo

Some tools that help you reduce boilerplate.

***Usage:***

**1. Write a mutation on the client**

GraphQL mutation is equivalent to calling Meteor Methods.

***You should not be using this if you're not using Mantra. Use `react-apollo` instead.*

```
import Client from '/path/to/client';
import { apollo } from 'apollo-tools';

addTodo({ title, content }) {

  // write your mutation
  const options = {
    mutation: `
      mutation addTodo($title: String!, $content: String!) {
        addTodo(title: $title, content: $content)
      }
    `,
    variables: {
      title,
      content,
    },
  };

  // pass in Apollo Client that above
  apollo(Client).mutateWith(options, (err, res) => {
    // do whatever you want with the err and res

  });
},
```
