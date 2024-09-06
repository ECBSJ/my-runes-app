import axios from "axios"
import {
  AddressBalances,
  addressBalancesToClient,
  AddressActivityForRune,
  addressActivityForRuneToClient,
  BlockActivity,
  blockActivityToClient,
  ApiStatus
} from "@/lib/models"
import { mostFrequent } from "./helpers"

export async function getAddressBalances() {
  let response = await axios.get("/api/address-balances")

  let addressBalances: AddressBalances[] = response.data.results.map(
    addressBalancesToClient
  )

  addressBalances.sort(
    (a: AddressBalances, b: AddressBalances) => b.balance - a.balance
  )

  return addressBalances
}

export async function getYourRunesActivity(data: AddressBalances[]) {
  let responses = data.map(async eachRune => {
    let id = eachRune.rune.id
    let address = eachRune.address

    let response = await axios.post("/api/address-activity", {
      id,
      address
    })

    let results: AddressActivityForRune[] = response.data.results.map(
      (data: any) => {
        let result = addressActivityForRuneToClient(data, id)
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
  let response = await axios.post("/api/block-activity", {
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
  let response = await axios.get("/api/status")
  let api_status: ApiStatus = response.data

  return api_status
}
