'use client'

import { columns } from "../../../components/columns/columns-balances"
import { DataTable } from "../../../components/data-table"
import { getAddressBalances } from "@/app/utils/data-processing"
import { useSearchParams } from "next/navigation"

export default async function YourBalances() {
  const searchParams = useSearchParams()
  let userAddress = searchParams.get("userAddress")!

  const response = await getAddressBalances(userAddress)

  return (
    <div className="container mx-auto py-10 mt-10">
      <DataTable columns={columns} data={response} />
    </div>
  )
}
