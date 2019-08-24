import explorer from "~/api/explorer";

/**
 * @param {string} hash
 * @return {Promise<Transaction>}
 */
export function getTransaction(hash) {
  return explorer.get("txs/" + hash).then(res => res.data);
}

export const getValidators = () => {
  return explorer.get(`/validators`).then(res => res.data);
};
