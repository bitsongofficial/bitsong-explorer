import gql from "graphql-tag";

export const state = () => ({
  validators: [],
});

export const getters = {
  validators: state => {
    return state.validators;
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
  }
};

export const actions = {
  getValidators({
    state,
    commit,
    rootState
  }) {

    let client = this.app.apolloProvider.defaultClient

    const validators = {
      query: gql `
        query validators {
          validators {
            address
            details {
              operator_address
              delegator_address
              description {
                moniker
              }
            }
          }
        }
      `
    }

    client.query(validators).then(res => {
      commit("setValidators", res.data.validators);
    })



    // //if (!rootState.connection.connected || state.loaded) return;

    // commit("setLoading", true);

    // try {
    //   const validators = await getValidators();
    //   commit("setValidators", validators.docs);
    //   commit("setLoaded", true);
    // } catch (error) {
    //   commit("setError", error.message);
    // }

    // commit("setLoading", false);
  }
};
