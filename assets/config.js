const dev = process.env.NODE_ENV === `development`
const stargate =
  process.env.STARGATE ||
  (dev ? `http://lcd.testnet-2.bitsong.network` : `http://lcd.testnet-2.bitsong.network`)

const rpc =
  process.env.RPC || (dev ? `http://rpc.testnet-2.bitsong.network` : `http://rpc.testnet-2.bitsong.network`)

export default {
  development: dev,
  network: process.env.NETWORK || `bitsong-testnet-2`,
  stargate,
  rpc,
  node_halted_timeout: 120000,
  block_timeout: 10000,
  default_gas_price: dev ? 1e-9 : 2.5e-8, // recommended from Cosmos Docs
  version: process.env.RELEASE,
  decimals: 6,
  consensusInterval: 1000
}
