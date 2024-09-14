import { columns } from "@/components/columns/columns-activity"
import { DataTable } from "@/components/data-table"
import {
  getAddressBalances,
  getYourRunesActivity
} from "@/lib/data"

export default async function YourActivity({ searchParams }: { searchParams: { userAddress: string } }) {

  const response = await getAddressBalances(searchParams.userAddress)
  let response1 = await getYourRunesActivity(response)

  return (
    <div className="container mx-auto py-10 mt-10">
      <DataTable columns={columns} data={response1} />
    </div>
  )
}
