import { getValidators } from "~/api";

export const state = () => ({
  validators: [],
  loading: false,
  loaded: false,
  error: null
});

export const getters = {
  validators: state => {
    return state.validators;
  },
  loading: state => {
    return state.loading;
  },
  totalPower: state => {
    return state.bonded.reduce((acc, val) => {
      return acc + val.delegator_shares;
    });
  }
};

export const mutations = {
  setValidators(state, validators) {
    state.validators = validators;
  },
  setLoading(state, loading) {
    state.loading = loading;
  },
  setLoaded(state, loaded) {
    state.loaded = loaded;
  },
  setError(state, error) {
    state.error = error;
  }
};

export const actions = {
  reconnected({ state, dispatch }) {
    dispatch(`getValidators`);
  },
  async getValidators({ state, commit, rootState }) {
    //if (!rootState.connection.connected || state.loaded) return;

    commit("setLoading", true);

    try {
      const validators = await getValidators();
      commit("setValidators", validators.docs);
      commit("setLoaded", true);
    } catch (error) {
      commit("setError", error.message);
    }

    commit("setLoading", false);
  }
};
