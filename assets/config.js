const dev = process.env.NODE_ENV === `development`
const stargate =
  process.env.STARGATE ||
  (dev ? `https://lcd.commercio-testnet2000.bas.network` : `https://lcd.commercio-testnet2000.bas.network`)

const rpc =
  process.env.RPC || (dev ? `https://rpc.commercio-testnet2000.bas.network` : `https://rpc.commercio-testnet2000.bas.network`)

const gql = process.env.GQL || (dev ? `https://commercio-testnet2000.bas.network/gql` : `https://commercio-testnet2000.bas.network/gql`)
const gql_ws = process.env.GQL_WS || (dev ? `wss://commercio-testnet2000.bas.network/gql` : `wss://commercio-testnet2000.bas.network/gql`)

export default {
  development: dev,
  network: process.env.NETWORK || `commercio-testnet2000`,
  stargate,
  rpc,
  gql,
  gql_ws,
  node_halted_timeout: 120000,
  block_timeout: 10000,
  default_gas_price: dev ? 1e-9 : 2.5e-8, // recommended from Cosmos Docs
  version: process.env.RELEASE,
  decimals: 6,
  consensusInterval: 1000
}
