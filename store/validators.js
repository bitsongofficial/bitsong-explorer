import gql from "graphql-tag";

export const state = () => ({
  validators: []
});

export const getters = {
  validators: state => {
    return state.validators;
  },
  totalPower: state => {
    return state.validators.reduce((acc, val) => {
      return acc + val.voting_power;
    }, 0);
  }
};

export const mutations = {
  setValidators(state, validators) {
    state.validators = validators;
  }
};

export const actions = {
  getValidators({ state, commit, rootState }) {
    let client = this.app.apolloProvider.defaultClient;

    const validators = {
      query: gql`
        query validators {
          validators {
            address
            voting_power
            details {
              status
              operator_address
              delegator_address
              description {
                moniker
              }
            }
          }
        }
      `
    };

    client.query(validators).then(res => {
      commit("setValidators", res.data.validators);
    });
  }
};
