import BigNumber from "bignumber.js"

export const state = () => ({
  price: 1.0000
})

export const getters = {
  price: state => {
    return new BigNumber(state.price).toFixed(4)
  }
}
