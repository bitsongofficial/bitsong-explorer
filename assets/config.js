const dev = process.env.NODE_ENV === `development`;
const stargate =
  process.env.STARGATE ||
  (dev
    ? `https://lcd.testnet-2.bitsong.network`
    : `https://lcd.testnet-2.bitsong.network`);

const rpc =
  process.env.RPC ||
  (dev
    ? `https://rpc.testnet-2.bitsong.network`
    : `https://rpc.testnet-2.bitsong.network`);

const gql =
  process.env.GQL ||
  (dev
    ? `http://localhost:8081/graphql`
    : `https://testnet.explorebitsong.com/gql/graphql`);
const gql_ws =
  process.env.GQL_WS ||
  (dev
    ? `ws://localhost:8081/subscriptions`
    : `wss://testnet.explorebitsong.com/gql/subscriptions`);

const stakeDenom = process.env.STAKE_DENOM ? process.env.STAKE_DENOM : "ubtsg";

export default {
  development: dev,
  network: process.env.NETWORK || `bitsong-testnet-2`,
  stargate,
  rpc,
  gql,
  gql_ws,
  stakeDenom,
  node_halted_timeout: 120000,
  block_timeout: 10000,
  default_gas_price: dev ? 1e-9 : 2.5e-8, // recommended from Cosmos Docs
  version: process.env.RELEASE,
  decimals: 6,
  consensusInterval: 1000
};
