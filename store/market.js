import BigNumber from "bignumber.js";
import config from "@/assets/config";

export const state = () => ({
  price: 0,
  market_cap: 0
});

export const getters = {
  price: state => {
    return new BigNumber(state.price).toFixed(4);
  },
  market_cap: state => {
    return state.market_cap;
  }
};

export const actions = {
  async updatePrice({ commit }) {
    if (config.coingecko_id) {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${config.coingecko_id}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
      )
        .then(res => res.json())
        .then(data => data[Object.keys(data)[0]])
        .catch(err => console.error(err));

      commit("setPrice", data.usd);
      commit("setMarketCap", data.usd_market_cap);
    }
  }
};

export const mutations = {
  setPrice(state, price) {
    state.price = price;
  },
  setMarketCap(state, market_cap) {
    state.market_cap = market_cap;
  }
};
