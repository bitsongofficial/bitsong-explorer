import explorer from '~/api/explorer'

/**
 * @param {string} hash
 * @return {Promise<Transaction>}
 */
export function getTransaction(hash) {
  console.log(hash)
  return explorer.get('txs/' + hash).then(res => res.data);
}
