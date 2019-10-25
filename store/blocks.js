export const cache = (list, element, maxSize = 15) => {
  if (list.length >= maxSize) list.splice(-1, 1);
  list.unshift(element);
  return list;
};

export const state = () => ({
  blockMetaInfo: { block_id: {} },
  blockHeight: null, // we remember the height so we can requery the block, if querying failed
  blockMetas: {},
  peers: [],
  blocks: [],
  // one block, specified by height
  block: {
    block: {},
    block_meta: {},
    transactions: []
  },
  subscription: false,
  syncing: true,
  loading: false,
  loaded: false,
  error: null
});

export const getters = {
  blockList: state => {
    return state.blocks;
  }
};

export const mutations = {
  setBlockHeight(state, height) {
    state.blockHeight = height;
  },
  setSyncing(state, syncing) {
    state.syncing = syncing;
  },
  setBlockMetas(state, blockMetas) {
    state.blockMetas = blockMetas;
  },
  setPeers(state, peers) {
    state.peers = peers;
  },
  setBlocks(state, blocks) {
    state.blocks = blocks;
  },
  setBlock(state, block) {
    state.block = block;
  },
  /*setBlockTransactions({ rootState }, block) {
    rootState.
  },*/
  addBlock(state, block) {
    let cachedBlock = cache(state.blocks, block);
    state.blocks = cachedBlock;
  },
  setSubscription(state, subscription) {
    state.subscription = subscription;
  },
  setBlocksLoading(state, loading) {
    state.loading = loading;
  },
  setBlocksLoaded(state, loaded) {
    state.loaded = loaded;
  },
  setBlockError(state, error) {
    state.error = error;
  }
};

export const actions = {
  reconnected({ commit, dispatch }) {
    //on a reconnect we assume, that the rpc connector changed, so we can safely resubscribe to blocks
    commit(`setSubscription`, false);
    dispatch(`subscribeToBlocks`);
  },
  async getBlockTxs({ state, commit }, height) {
    try {
      commit(`setBlocksLoaded`, false);
      commit(`setBlocksLoading`, true);
      let txs = await node.get.txsByHeight(height);
      const time = state.blockMetas[height].header.time;
      txs = txs.map(tx =>
        Object.assign({}, tx, {
          height,
          time
        })
      );
      //commit(`setBlockTransactions`, txs)
      commit(`setBlocksLoaded`, true);
    } catch (error) {
      commit(`setBlockError`, error);
    }
    commit(`setBlocksLoading`, false);
  },
  async queryBlockInfo({ state, commit }, height) {
    try {
      let blockMetaInfo = state.blockMetas[height];
      if (blockMetaInfo) {
        return blockMetaInfo;
      }
      commit(`setBlocksLoaded`, false);
      commit(`setBlocksLoading`, true);
      const block = await window.node.get.block(height);

      blockMetaInfo = block.block_meta;
      commit(`setBlocksLoading`, false);

      commit(`setBlockMetas`, {
        ...state.blockMetas,
        [height]: blockMetaInfo
      });
      commit(`setBlock`, block);
      commit(`setBlocksLoaded`, true);
      return blockMetaInfo;
    } catch (error) {
      commit(`setBlocksLoading`, false);
      commit(`setBlockError`, error);
      return null;
    }
  },
  async subscribeToBlocks({ state, commit, dispatch }) {
    // ensure we never subscribe twice
    if (state.subscription) return false;
    if (!window.node.rpc) return false;
    if (state.subscribedRPC === window.node.rpc) return false;

    const status = await window.node.rpc.status();
    commit(`setBlockHeight`, status.sync_info.latest_block_height);
    if (status.sync_info.catching_up) {
      // still syncing, let's try subscribing again in 30 seconds
      commit(`setSyncing`, true);
      commit(`setSubscription`, false);
      setTimeout(() => dispatch(`subscribeToBlocks`), 30e3);
      return false;
    }

    commit(`setSyncing`, false);
    // New RPC endpoint in sync, reset UI block list
    commit(`setBlocks`, []);

    // only subscribe if the node is not catching up anymore
    window.node.rpc.subscribe({ query: `tm.event = 'NewBlock'` }, event => {
      if (state.subscription === false) commit(`setSubscription`, true);
      commit(`addBlock`, event.block);
      event.block &&
        event.block.header &&
        commit(`setBlockHeight`, event.block.header.height);
      dispatch(`market/updatePrice`, null, {
        root: true
      });
    });

    return true;
  },
  async getPeers({ state, commit }) {
    if (!(state.connected && window.node.rpc)) return [];

    const {
      result: { peers }
    } = await window.node.rpc.net_info();
    commit(`setPeers`, peers);
    return peers;
  }
};
