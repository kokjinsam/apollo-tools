## Apollo Tools

> This package is an Apollo wrapper that makes your life easier.

## configureGraphQLClient

Quick setup for a GraphQL client.

***Usage:***
```
import { configureGraphQLClient } from 'apollo-tools';

const dataIdFromObject = (result) => {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }
};

const Client = configureGraphQLClient({
  urlName: 'graphql',
  auth: false,
  dataIdFromObject,
});
```

## configureGraphQLServer

Quick setup for a GraphQL server.

***Usage:***
```
import { configureGraphQLServer } from 'apollo-tools';
import schema from 'path/to/schema';
import resolvers from 'path/to/resolvers';

configureGraphQLServer({
  schema,
  resolvers,
  port: 4000,
  urlName: 'graphql',
  graphiql: true,
  pretty: true,
  context: {},
});
```

## apollo

Some tools that help you reduce boilerplate.

***Usage:***

**1. Write a mutation on the client**

GraphQL mutation is equivalent to calling Meteor Methods.

***You should not be using this if you're not using Mantra. Use `react-apollo` instead.***

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
