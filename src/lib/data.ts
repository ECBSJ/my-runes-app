import {
  type AddressBalances,
  addressBalancesToClient,
  type AddressActivityForRune,
  addressActivityForRuneToClient,
  type BlockActivity,
  blockActivityToClient,
  type ApiStatus,
  type Etching
} from "@/types"
import { mostFrequent } from "./helpers"

// Get address' Runes balances /runes/v1/addresses/{address}/balances
// https://docs.hiro.so/bitcoin/runes/api/balances/address
export async function getAddressBalances(address: string) {
  const response = await fetch(
    `https://api.hiro.so/runes/v1/addresses/${address}/balances?offset=0&limit=60`,
    {
      method: "GET",
      cache: "no-store"
    }
  )

  let data = await response.json()

  if (data.results.length === 0) {
    return []
  }

  let addressBalances: AddressBalances[] = data.results.map(async (o: any) => {
    let { symbol } = await getRunesEtchingInfo(o.rune.id)
    o.symbol = symbol
    let finalObject = addressBalancesToClient(o)
    return finalObject
  })

  let completedArrayOfObjects = await Promise.all(addressBalances)

  completedArrayOfObjects.sort(
    (a: AddressBalances, b: AddressBalances) => b.balance - a.balance
  )

  return completedArrayOfObjects
}

// Get Runes activity for an address /runes/v1/etchings/{etching}/activity/{address}
// https://docs.hiro.so/bitcoin/runes/api/activities/for-address
export async function getYourRunesActivity(data: AddressBalances[]) {
  if (data.length === 0) {
    return []
  }

  let responses = data.map(async eachRune => {
    let id = eachRune.id
    let address = eachRune.address
    let symbol = eachRune.symbol
    let name = eachRune.name
    let spaced_name = eachRune.spaced_name

    const response = await fetch(
      `https://api.hiro.so/runes/v1/etchings/${id}/activity/${address}?offset=0&limit=60`,
      {
        method: "GET",
        cache: "no-store"
      }
    )

    let data = await response.json()

    let results: AddressActivityForRune[] = data.results.map((data: any) => {
      let result = addressActivityForRuneToClient(data, id, symbol, name, spaced_name)
      return result
    })

    return results
  })

  let arrayOfArrays = await Promise.all(responses)
  let flattenedArray = arrayOfArrays.flat(1)
  flattenedArray.sort(
    (a: AddressActivityForRune, b: AddressActivityForRune) => b.timestamp - a.timestamp
  )

  return flattenedArray
}

// Get activity for a block /runes/v1/blocks/{block}/activity
// https://docs.hiro.so/bitcoin/runes/api/activities/for-block
export async function getBlockActivity(block_height: string) {
  let response = await fetch(
    `https://api.hiro.so/runes/v1/blocks/${block_height}/activity?offset=0&limit=60`,
    {
      method: "GET",
      cache: "no-store"
    }
  )

  let data = await response.json()

  let totalRunesActivity: number = data.total

  let results: BlockActivity[] = data.results.map(blockActivityToClient)

  let mostFrequentRunes = mostFrequent(results, p => p.id)

  return { results, totalRunesActivity, mostFrequentRunes }
}

// Get API Status /runes/v1
// https://docs.hiro.so/bitcoin/runes/api/info/status
export async function getApiStatus() {
  let response = await fetch("https://api.hiro.so/runes/v1/", {
    method: "GET",
    cache: "no-store"
  })
  let data = await response.json()

  let api_status: ApiStatus = data

  return api_status
}

// Get etching /runes/v1/etchings/{etching}
// https://docs.hiro.so/bitcoin/runes/api/etchings/get-etching
export async function getRunesEtchingInfo(id: any): Promise<Etching> {
  let response = await fetch(`https://api.hiro.so/runes/v1/etchings/${id}`, {
    method: "GET",
    cache: "no-store"
  })

  let data = await response.json()

  return data
}
