"use client"

import { userSession } from "@/app/utils/ConnectWallet"
import { columns } from "../../../components/columns/columns-activity"
import { DataTable } from "../../../components/data-table"
import {
  getAddressBalances,
  getYourRunesActivity
} from "@/app/utils/data-processing"

export default async function YourActivity() {
  let address: string = userSession.loadUserData().profile.btcAddress.p2tr.mainnet

  const response = await getAddressBalances(address)
  let response1 = await getYourRunesActivity(response)

  return (
    <div className="container mx-auto py-10 mt-10">
      <DataTable columns={columns} data={response1} />
    </div>
  )
}
