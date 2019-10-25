import config from "@/assets/config";

export const state = () => ({
  stakeDenom: config.stakeDenom,
  network: config.network
});

export const getters = {
  stakeDenom: state => {
    return state.stakeDenom.replace("u", "").toUpperCase();
  },
  network: state => {
    return state.network;
  }
};
