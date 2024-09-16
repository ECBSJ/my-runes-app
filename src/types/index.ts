export type AddressBalances = {
  address: string
  balance: number
  id: string
  name: string
  spaced_name: string
  symbol: string
}

export function addressBalancesToClient(data: any) {
  return {
    address: data.address,
    balance: +data.balance,
    id: data.rune.id,
    name: data.rune.name,
    spaced_name: data.rune.spaced_name,
    symbol: data.symbol
  }
}

export type AddressActivityForRune = {
  rune_id: string
  address: string
  amount: number
  operation: string
  block_height: number
  tx_id: string
  timestamp: number
  symbol: string
  name: string
  spaced_name: string
}

export function addressActivityForRuneToClient(data: any, id: string, symbol: string, name: string, spaced_name: string) {
  return {
    rune_id: id,
    address: data.address,
    amount: +data.amount,
    operation: data.operation,
    block_height: data.location.block_height,
    tx_id: data.location.tx_id,
    timestamp: data.location.timestamp,
    symbol: symbol,
    name: name,
    spaced_name: spaced_name
  }
}

export type BlockActivity = {
  id: string
  name: string
  spaced_name: string
  operation: string
  block_height: number
  tx_id: string
  timestamp: number
  amount: number
}

export function blockActivityToClient(data: any) {
  return {
    id: data.rune.id,
    name: data.rune.name,
    spaced_name: data.rune.spaced_name,
    operation: data.operation,
    block_height: data.location.block_height,
    tx_id: data.location.tx_id,
    timestamp: data.location.timestamp,
    amount: data.amount
  }
}

export type ApiStatus = {
  server_version: string
  status: string
  block_height: number
}

export type Etching = {
  id: string
  name: string
  spaced_name: string
  number: number
  divisibility: number
  symbol: string
  turbo: boolean
  mint_terms: {
    amount: string
    cap: string
    height_start: number
    height_end: number
    offset_start: number
    offset_end: number
  }
  supply: {
    current: string
    minted: string
    total_mints: string
    mint_percentage: string
    mintable: boolean
    burned: string
    total_burns: string
    premine: string
  }
  location: {
    block_hash: string
    block_height: number
    tx_id: string
    tx_index: number
    vout: number
    output: string
    timestamp: number
  }
}
