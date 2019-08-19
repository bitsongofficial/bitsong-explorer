export const state = () => ({
  unbonding: [],
  bonded: [],
  unbonded: [],
  loading: false,
  loaded: false,
  error: null
})

export const getters = {
  bonded: state => {
    return state.bonded
  },
  unbonded: state => {
    return state.unbonded
  },
  loading: state => {
    return state.loading
  },
  totalPower: state => {
    return state.bonded.reduce((acc, val) => {
      return acc + val.delegator_shares
    })
  }
}

export const mutations = {
  setBonded(state, validators) {
    state.bonded = validators
  },
  setUnbonding(state, validators) {
    state.unbonding = validators
  },
  setUnbonded(state, validators) {
    state.unbonded = validators
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
    dispatch(`getValidators`)
  },
  async getValidators({ state, commit, rootState }) {
    if (!rootState.connection.connected || state.loaded) return

    commit('setLoading', true)

    try {
      await Promise.all([
        node.get
          .validators()
          .then(validators => {
            console.log('yes', validators)
            commit("setUnbonding", validators[0].result)
            commit("setBonded", validators[1].result)
            commit("setUnbonded", validators[2].result)
          })
      ])
      commit('setLoaded', true)
    } catch (error) {
      commit('setError', error.message)
    }

    commit('setLoading', false)
  }
}
