"use client"

import { userSession } from "@/app/utils/ConnectWallet"
import { columns } from "../../../components/columns/columns-balances"
import { DataTable } from "../../../components/data-table"
import { getAddressBalances } from "@/app/utils/data-processing"

export default async function YourBalances() {
  let address: string = userSession.loadUserData().profile.btcAddress.p2tr.mainnet

  const response = await getAddressBalances(address)

  return (
    <div className="container mx-auto py-10 mt-10">
      <DataTable columns={columns} data={response} />
    </div>
  )
}
