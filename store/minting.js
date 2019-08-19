import BigNumber from "bignumber.js"

export const state = () => ({
  inflation: 0,
  loading: false,
  loaded: false,
  error: null
})

export const getters = {
  inflation: state => {
    return new BigNumber(state.inflation).multipliedBy(100).toFixed(2)
  },
}

export const mutations = {
  setInflation(state, inflation) {
    state.inflation = inflation
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setLoaded(state, loaded) {
    state.loaded = loaded
  },
  setError(state, error) {
    state.error = error
  }
}

export const actions = {
  reconnected({ state, dispatch }) {
    dispatch(`getInflation`)
  },
  async getInflation({ state, commit, rootState }) {
    if (!rootState.connection.connected || state.loaded) return

    commit('setLoading', true)

    try {
      await Promise.all([
        window.node.get
          .inflation()
          .then(inflation => {
            commit("setInflation", inflation.result)
          })
      ])
      commit('setLoaded', true)
    } catch (error) {
      commit('setError', error.message)
    }

    commit('setLoading', false)
  }
}
