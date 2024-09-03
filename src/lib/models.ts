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
