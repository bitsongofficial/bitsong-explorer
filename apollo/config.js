import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import config from '@/assets/config'
import schema from './fragmentTypes.json'
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
})

export default ({
  req,
  app
}) => {
  return {
    httpEndpoint: `${config.gql}/graphql`,
    httpLinkOptions: {
      credentials: 'same-origin'
    },
    wsEndpoint: `${config.gql_ws}/subscriptions`,
    tokenName: 'apollo-token',
    cache: new InMemoryCache({
      fragmentMatcher
    }),
  }
}
