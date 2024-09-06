export interface AddressBalances {
  address: string
  balance: number
  rune: {
    id: string
    name: string
    spaced_name: string
  }
}

export function addressBalancesToClient(data: any) {
  return {
    address: data.address,
    balance: +data.balance,
    rune: {
      id: data.rune.id,
      name: data.rune.name,
      spaced_name: data.rune.spaced_name
    }
  }
}

export interface AddressActivityForRune {
  rune_id: string
  address: string
  amount: number
  operation: string
  block_height: number
  tx_id: string
  timestamp: number
}

export function addressActivityForRuneToClient(data: any, id: string) {
  return {
    rune_id: id,
    address: data.address,
    amount: +data.amount,
    operation: data.operation,
    block_height: data.location.block_height,
    tx_id: data.location.tx_id,
    timestamp: data.location.timestamp
  }
}

export interface BlockActivity {
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

export interface ApiStatus {
  server_version: string
  status: string
  block_height: number
}
