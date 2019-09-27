const dev = process.env.NODE_ENV === `development`;
const stargate =
  process.env.STARGATE ||
  (dev
    ? `https://lcd.tichex-devnet-1.bas.network`
    : `https://lcd.tichex-devnet-1.bas.network`);

const rpc =
  process.env.RPC ||
  (dev
    ? `https://rpc.tichex-devnet-1.bas.network`
    : `https://rpc.tichex-devnet-1.bas.network`);

const gql =
  process.env.GQL ||
  (dev
    ? `https://tichex-devnet-1.bas.network/gql/graphql`
    : `https://tichex-devnet-1.bas.network/gql/graphql`);
const gql_ws =
  process.env.GQL_WS ||
  (dev
    ? `wss://tichex-devnet-1.bas.network/gql/subscriptions`
    : `wss://tichex-devnet-1.bas.network/gql/subscriptions`);

const stakeDenom = process.env.STAKE_DENOM ? process.env.STAKE_DENOM : "utcx";

export default {
  development: dev,
  network: process.env.NETWORK || `tichex-devnet-1`,
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
