import BigNumber from "bignumber.js"

export const state = () => ({
  price: 0.1200
})

export const getters = {
  price: state => {
    return new BigNumber(state.price).toFixed(4)
  }
}
