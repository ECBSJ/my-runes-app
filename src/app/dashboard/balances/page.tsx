import { columns } from "@/components/columns/columns-balances"
import { DataTable } from "@/components/data-table"
import { getAddressBalances } from "@/lib/data"

export default async function YourBalances({ searchParams }: { searchParams: { userAddress: string } }) {
  
  const response = await getAddressBalances(searchParams.userAddress)

  return (
    <div className="container mx-auto py-10 mt-10">
      <DataTable columns={columns} data={response} />
    </div>
  )
}
