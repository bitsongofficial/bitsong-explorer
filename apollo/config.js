import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import schema from './fragmentTypes.json'
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
})

export default ({
  req,
  app
}) => {
  return {
    httpEndpoint: "http://localhost:8081/graphql",
    httpLinkOptions: {
      credentials: 'same-origin'
    },
    wsEndpoint: 'ws://localhost:8081/subscriptions',
    tokenName: 'apollo-token',
    cache: new InMemoryCache({
      fragmentMatcher
    }),
  }
}
