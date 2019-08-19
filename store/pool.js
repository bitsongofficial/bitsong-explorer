import BigNumber from "bignumber.js"
import config from "@/assets/config"

export const state = () => ({
  pool: {},
  total_supply: 0,
  community_pool: 0,
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
    return new BigNumber(state.total_supply).div(10 ** config.decimals)
  },
  community_pool: state => {
    return new BigNumber(state.community_pool).div(10 ** config.decimals)
  }
}

export const mutations = {
  setPool(state, pool) {
    state.pool = pool
  },
  setTotalSupply(state, total_supply) {
    state.total_supply = total_supply
  },
  setCommunityPool(state, community_pool) {
    state.community_pool = community_pool
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
      const dataTotalSupply = await fetch(`${config.stargate}/supply/total`).then(res => res.json())
      const dataCommunityPool = await fetch(`${config.stargate}/distribution/community_pool`).then(res => res.json())

      commit(`setPool`, pool.result)
      commit(`setTotalSupply`, dataTotalSupply.result[0].amount)
      commit(`setCommunityPool`, dataCommunityPool.result[0].amount)
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
