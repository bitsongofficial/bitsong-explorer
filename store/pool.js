import BigNumber from "bignumber.js"
import config from "@/assets/config"

export const state = () => ({
  pool: {},
  loading: false,
  loaded: false,
  error: null
})

export const getters = {
  not_bonded_tokens: state => {
    return new BigNumber(state.pool.not_bonded_tokens).div(10 ** config.decimals).toFixed(2)
  },
  bonded_tokens: state => {
    return new BigNumber(state.pool.bonded_tokens).div(10 ** config.decimals).toFixed(2)
  },
  total_supply: state => {
    return new BigNumber(state.pool.bonded_tokens).plus(state.pool.not_bonded_tokens).div(10 ** config.decimals)
  }
}

export const mutations = {
  setPool(state, pool) {
    state.pool = pool
  },
  setError(state, error) {
    state.error = error
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setLoaded(state, loaded) {
    state.loaded = loaded
  }
}

export const actions = {
  reconnected({ state, dispatch }) {
    if (state.loading) {
      dispatch(`getPool`)
    }
  },
  async getPool({ state, commit, rootState }) {
    commit(`setLoading`, true)

    if (!rootState.connection.connected) return

    try {
      const pool = await window.node.get.pool()

      commit(`setPool`, pool.result)
      commit(`setError`, null)
      commit(`setLoading`, false)
      commit(`setLoaded`, true)
    } catch (error) {
      console.log(error)

      commit(`setError`, error)
      commit(`setLoading`, false)
      commit(`setLoaded`, false)
    }
  }
}
