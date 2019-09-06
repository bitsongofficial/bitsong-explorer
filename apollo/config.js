import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import schema from "./fragmentTypes.json";
const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema
});

import config from "@/assets/config";

export default ({ req, app }) => {
  return {
    httpEndpoint: config.gql,
    httpLinkOptions: {
      credentials: "same-origin"
    },
    wsEndpoint: config.gql_ws,
    tokenName: "apollo-token",
    cache: new InMemoryCache({
      fragmentMatcher
    })
  };
};
