import BigNumber from 'bignumber.js'
import config from "@/assets/config"

export const formatBech32 = (address, longForm = false, length = 4) => {
  if (!address) {
    return `Address Not Found`
  } else if (address.indexOf(`1`) === -1) {
    return `Not A Valid Bech32 Address`
  } else if (longForm) {
    return address
  } else {
    return address.split(`1`)[0] + `…` + address.slice(-1 * length)
  }
}

export const toBtsg = (amount) => {
  return new BigNumber(amount).div(10 ** config.decimals).toFixed(2)
}

export const toMacroDenom = (denom) => {
  return denom.replace('u', '')
}
