import { columns } from "@/components/columns/columns-block-activity"
import { DataTable } from "@/components/data-table"
import { getApiStatus, getBlockActivity } from "@/lib/data"

export default async function BlockActivity() {
  let apiStatus = await getApiStatus()
  let { results } =
    await getBlockActivity(apiStatus.block_height.toString())

  return (
    <div className="container mx-auto py-10 mt-10">
      <DataTable columns={columns} data={results} />
    </div>
  )
}
