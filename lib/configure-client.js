import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { checkIfMeteorIsPresent } from './_utils';

export default function ({
  url = '/graphql',
}) {
  checkIfMeteorIsPresent();

  // this is important for SSR;
  // const url = Meteor.absoluteUrl('graphql');
  const networkInterface = createNetworkInterface(url);
  const Client = new ApolloClient({
    networkInterface,
  });

  return Client;
}
