'use strict'

/*
 * Extracted from https://github.com/nomic-io/js-tendermint
 * TODO missing tests
 */

const EventEmitter = require('events')
const axios = require('axios')
const url = require('url')
const old = require('old')
const camel = require('camelcase')
const websocket = require('websocket-stream')
const ndjson = require('ndjson')
const pumpify = require('pumpify').obj

function convertHttpArgs (args) {
  args = args || {}
  for (let k in args) {
    let v = args[k]
    if (typeof v === 'number') {
      args[k] = `"${v}"`
    }
  }
  return args
}

function convertWsArgs (args) {
  args = args || {}
  for (let k in args) {
    let v = args[k]
    if (typeof v === 'number') {
      args[k] = String(v)
    } else if (Buffer.isBuffer(v)) {
      args[k] = '0x' + v.toString('hex')
    } else if (v instanceof Uint8Array) {
      args[k] = '0x' + Buffer.from(v).toString('hex')
    }
  }
  return args
}

const wsProtocols = [ 'ws:', 'wss:' ]
const httpProtocols = [ 'http:', 'https:' ]
const allProtocols = wsProtocols.concat(httpProtocols)

class Client extends EventEmitter {
  constructor (uriString = 'localhost:26657') {
    super()

    // parse full-node URI
    let { protocol, hostname, port } = url.parse(uriString)

    // default to http
    if (!allProtocols.includes(protocol)) {
      let uri = url.parse(`http://${uriString}`)
      protocol = uri.protocol
      hostname = uri.hostname
      port = uri.port
    }

    // default port
    if (!port) {
      port = 443
    }

    if (wsProtocols.includes(protocol)) {
      this.websocket = true
      this.uri = `${protocol}//${hostname}:${port}/websocket`
      this.call = this.callWs
      this.connectWs()
    } else if (httpProtocols.includes(protocol)) {
      this.uri = `${protocol}//${hostname}:${port}/`
      this.call = this.callHttp
    }
  }

  connectWs () {
    this.ws = pumpify(
      ndjson.stringify(),
      websocket(this.uri)
    )
    this.ws.on('error', (err) => this.emit('error', err))
    this.ws.on('close', () => {
      if (this.closed) return
      this.emit('error', Error('websocket disconnected'))
    })
    this.ws.on('data', (data) => {
      data = JSON.parse(data)
      if (!data.id) return
      this.emit(data.id, data.error, data.result)
    })
  }

  callHttp (method, args) {
    return axios({
      url: this.uri + method,
      params: convertHttpArgs(args)
    }).then(function ({ data }) {
      if (data.error) {
        let err = Error(data.error.message)
        Object.assign(err, data.error)
        throw err
      }
      return data.result
    }, function (err) {
      throw Error(err)
    })
  }

  callWs (method, args, listener) {
    let self = this
    return new Promise((resolve, reject) => {
      let id = Math.random().toString(36)
      let params = convertWsArgs(args)

      if (method === 'subscribe') {
        if (typeof listener !== 'function') {
          throw Error('Must provide listener function')
        }

        // events get passed to listener
        this.on(id + '#event', (err, res) => {
          if (err) return self.emit('error', err)
          listener(res.data.value)
        })

        // promise resolves on successful subscription or error
        this.on(id, (err) => {
          if (err) return reject(err)
          resolve()
        })
      } else {
        // response goes to promise
        this.once(id, (err, res) => {
          if (err) return reject(err)
          resolve(res)
        })
      }

      this.ws.write({ jsonrpc: '2.0', id, method, params })
    })
  }

  close () {
    this.closed = true
    if (!this.ws) return
    this.ws.destroy()
  }
}

const tendermintMethods = [
  `subscribe`,
  `unsubscribe`,
  `unsubscribe_all`,

  `status`,
  `net_info`,
  `dial_peers`,
  `dial_seeds`,
  `blockchain`,
  `genesis`,
  `health`,
  `block`,
  `block_results`,
  `blockchain`,
  `validators`,
  `consensus_state`,
  `dump_consensus_state`,
  `broadcast_tx_commit`,
  `broadcast_tx_sync`,
  `broadcast_tx_async`,
  `unconfirmed_txs`,
  `num_unconfirmed_txs`,
  `commit`,
  `tx`,
  `tx_search`,

  `abci_query`,
  `abci_info`,

  `unsafe_flush_mempool`,
  `unsafe_start_cpu_profiler`,
  `unsafe_stop_cpu_profiler`,
  `unsafe_write_heap_profile`
]

// add methods to Client class based on methods defined in './methods.js'
for (const name of tendermintMethods) {
  Client.prototype[camel(name)] = function(args, listener) {
    return this.call(name, args, listener)
  }
}

export default old(Client)
