export const state = () => ({
  height: 0,
  round: 0,
  step: 0,
  round_state: {},
  proposer_address: ''
})

export const getters = {
  height: state => {
    return state.height
  },
  round: state => {
    return state.round
  },
  step: state => {
    return state.step
  },
  round_state: state => {
    return state.round_state
  },
  proposer_address: state => {
    return state.proposer_address
  },
  votedPower: state => {
    return Math.round(state.step * 25)
  },
}

export const mutations = {
  setHeight(state, height) {
    state.height = height
  },
  setRound(state, round) {
    state.round = round
  },
  setStep(state, step) {
    state.step = step
  },
  setProposerAddress(state, proposer_address) {
    state.proposer_address = proposer_address
  },
  setRoundState(state, round_state) {
    state.round_state = round_state
  }
}

