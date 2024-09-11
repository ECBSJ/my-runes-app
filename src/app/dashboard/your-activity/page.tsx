"use client"

import { columns } from "../../../components/columns/columns-activity"
import { DataTable } from "../../../components/data-table"
import {
  getAddressBalances,
  getYourRunesActivity
} from "@/app/utils/data-processing"
import { useSearchParams } from "next/navigation"

export default async function YourActivity() {
  const searchParams = useSearchParams()
  let userAddress = searchParams.get("userAddress")!

  const response = await getAddressBalances(userAddress)
  let response1 = await getYourRunesActivity(response)

  return (
    <div className="container mx-auto py-10 mt-10">
      <DataTable columns={columns} data={response1} />
    </div>
  )
}
