import axios from "axios"
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

export async function getAddressBalances(address: string) {
  let response = await axios.post(process.env.URL + "/api/address-balances", {
    address
  })

  if (response.data.results.length === 0) {
    return []    
  }

  let addressBalances: AddressBalances[] = response.data.results.map(async (o: any) => {
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

    let response = await axios.post(process.env.URL + "/api/address-activity", {
      id,
      address
    })

    let results: AddressActivityForRune[] = response.data.results.map(
      (data: any) => {
        let result = addressActivityForRuneToClient(data, id, symbol, name, spaced_name)
        return result
      }
    )

    return results
  })

  let arrayOfArrays = await Promise.all(responses)
  let flattenedArray = arrayOfArrays.flat(1)
  flattenedArray.sort(
    (a: AddressActivityForRune, b: AddressActivityForRune) =>
      b.timestamp - a.timestamp
  )

  return flattenedArray
}

export async function getBlockActivity(block_height: string) {
  let response = await axios.post(process.env.URL + "/api/block-activity", {
    block_height
  })

  let totalRunesActivity: number = response.data.total

  let results: BlockActivity[] = response.data.results.map(
    blockActivityToClient
  )

  let mostFrequentRunes = mostFrequent(results, p => p.id)

  return { results, totalRunesActivity, mostFrequentRunes }
}

export async function getApiStatus() {
  let response = await axios.get(process.env.URL + "/api/status")
  let api_status: ApiStatus = response.data

  return api_status
}

export async function getRunesEtchingInfo(id: any): Promise<Etching> {
  let response = await axios.post(process.env.URL + "/api/get-etching", {
    id
  })

  return response.data
}
