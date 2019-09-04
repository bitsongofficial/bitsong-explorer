import config from '@/assets/config'
import Node from "@/connectors/node"

const NODE_HALTED_TIMEOUT = config.node_halted_timeout
const MAX_CONNECTION_ATTEMPTS = 5

export const state = () => ({
  stopConnecting: false,
  connected: false,
  lastHeader: {
    height: 0,
    chain_id: ``
  },
  connectionAttempts: 0,
  nodeUrl: config.stargate,
  rpcUrl: config.rpc
})

export const getters = {
  lastHeader: state => {
    return state.lastHeader
  },
}

export const mutations = {
  stopConnecting(state, stop = true) {
    state.stopConnecting = stop
  },
  setConnected(state, connected) {
    if (connected) {
      state.connectionAttempts = 0
    }
    state.connected = connected
  },
  increaseConnectionAttempts(state) {
    state.connectionAttempts = state.connectionAttempts + 1
  },
  resetConnectionAttempts(state) {
    state.connectionAttempts = 0
  },
  setRpcUrl(state, rpcUrl) {
    state.rpcUrl = rpcUrl
  },
  async setLastHeader(state, header) {
    state.lastHeader = header
  }
}

export const actions = {
  async setLastHeader({
    state
  }, header) {
    state.lastHeader = header
  },
  async connect({
    state,
    commit,
    dispatch
  }) {
    const {
      nodeUrl,
      rpcUrl,
      connectionAttempts,
      stopConnecting
    } = state

    window.node = Node(nodeUrl)

    if (connectionAttempts >= MAX_CONNECTION_ATTEMPTS) {
      commit("stopConnecting")
      return
    }
    if (stopConnecting) return

    commit(`setConnected`, false)
    try {
      await window.node.rpcConnect(rpcUrl)
      commit(`setConnected`, true)
      //dispatch(`reconnected`)
      //dispatch('transactions/reconnected', null, {root:true})
      //dispatch('blocks/reconnected', null, {root:true})

      dispatch('validators/getValidators', null, {
        root: true
      })

      dispatch('pool/reconnected', null, {
        root: true
      })
      dispatch('minting/reconnected', null, {
        root: true
      })
      dispatch(`rpcSubscribe`, window.node)
      dispatch(`blocks/subscribeToBlocks`, null, {
        root: true
      })
    } catch (err) {
      throw err
      console.log(`Failed reconnect attempt`)
      commit("increaseConnectionAttempts")
      setTimeout(() => {
        dispatch(`connect`)
      }, 1000)
    }
  },
  reconnect({
    commit,
    dispatch
  }) {
    commit("resetConnectionAttempts")
    commit("stopConnecting", false)
    dispatch("connect")
  },
  async rpcSubscribe({
    commit,
    dispatch,
    rootState
  }) {
    if (state.stopConnecting) return

    // the rpc socket can be closed before we can even attach a listener
    // so we remember if the connection is open
    // we handle the reconnection here so we can attach all these listeners on reconnect
    if (!window.node.rpcInfo.connected) {
      await sleep(500)
      dispatch(`connect`)
      return
    }

    commit(`setConnected`, true)

    // TODO: get event from light-client websocket instead of RPC connection (once that exists)
    window.node.rpc.on(`error`, error => {
      if (
        error instanceof Event || // this is always a disconnect, strange that it is 2 different types
        error.message.indexOf(`disconnected`) !== -1
      ) {
        commit(`setConnected`, false)
        dispatch(`connect`)
      }
    })
    window.node.rpc.status().then(status => {
      commit(`setLastHeader`, {
        height: status.sync_info.latest_block_height,
        chain_id: status.node_info.network
      })
    })

    window.node.rpc.subscribe({
        query: `tm.event = 'NewBlockHeader'`
      },
      ({
        header
      }) => {
        commit(`setLastHeader`, header)
      }
    )

    window.node.rpc.subscribe({
      query: `tm.event = 'NewRound'`
    }, event => {
      commit(`consensus/setHeight`, event.height, {
        root: true
      })
      commit(`consensus/setProposerAddress`, event.proposer.address, {
        root: true
      })
      commit(`consensus/setRound`, event.round, {
        root: true
      })
    })

    window.node.rpc.subscribe({
      query: `tm.event = 'NewRoundStep'`
    }, event => {
      switch (event.step) {
        case 'RoundStepPropose':
          commit(`consensus/setStep`, 1, {
            root: true
          })
          break;
        case 'RoundStepPrevote':
          commit(`consensus/setStep`, 2, {
            root: true
          })
          break;
        case 'RoundStepPrecommit':
          commit(`consensus/setStep`, 3, {
            root: true
          })
          break;
        case 'RoundStepCommit':
          commit(`consensus/setStep`, 4, {
            root: true
          })
          break;
        case 'RoundStepNewHeight':
          commit(`consensus/setStep`, 5, {
            root: true
          })
          break;
      }
    })
    /*if (rootState.session.signedIn) {
      dispatch(`walletSubscribe`)
    }*/
    //dispatch(`checkNodeHalted`)
    dispatch(`pollRPCConnection`)
  },
  checkNodeHalted({
      state,
      dispatch
    },
    nodeHaltedTimeout = NODE_HALTED_TIMEOUT
  ) {
    state.nodeHaltedTimeout = setTimeout(() => {
      if (!state.lastHeader.height) {
        dispatch(`nodeHasHalted`)
      }
    }, nodeHaltedTimeout) // default 30s
  },
  async pollRPCConnection({
      state,
      dispatch,
      commit
    },
    timeout = config.block_timeout
  ) {
    if (state.stopConnecting) return

    try {
      // TODO: replace with ping when we implement ws connection ourselves
      await window.node.rpc.health()
    } catch (err) {
      console.log(err)
      console.error(`Error pinging websocket. Assuming connection dropped.`)
      commit(`setConnected`, false)
      dispatch(`connect`)
      return
    }

    setTimeout(() => {
      dispatch(`pollRPCConnection`)
    }, timeout)
  }
}
