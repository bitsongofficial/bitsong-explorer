import config from "@/assets/config";

export const state = () => ({
  stakeDenom: config.stakeDenom
});

export const getters = {
  stakeDenom: state => {
    return state.stakeDenom.replace("u", "").toUpperCase();
  }
};
