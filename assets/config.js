const dev = process.env.NODE_ENV === `development`
const stargate =
  process.env.STARGATE ||
  (dev ? `http://localhost:1317` : `https://lcd.commercio-testnet2000.bas.network`)

const rpc =
  process.env.RPC || (dev ? `http://localhost:26657` : `https://rpc.commercio-testnet2000.bas.network`)

export default {
  development: dev,
  network: process.env.NETWORK || `commercio-testnet2000`,
  stargate,
  rpc,
  node_halted_timeout: 120000,
  block_timeout: 10000,
  default_gas_price: dev ? 1e-9 : 2.5e-8, // recommended from Cosmos Docs
  version: process.env.RELEASE,
  decimals: 6,
  consensusInterval: 1000
}
