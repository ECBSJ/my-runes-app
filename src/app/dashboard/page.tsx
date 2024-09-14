import {
  getAddressBalances,
  getYourRunesActivity,
  getBlockActivity,
  getApiStatus,
  getRunesEtchingInfo
} from "@/lib/data"
import BalancesCard from "@/components/cards/balances"
import BlockActivity from "@/components/cards/recent-block-activity"
import Activity from "@/components/cards/activity"
import FeaturedCard from "@/components/cards/featured"

async function retrieveAllData(userAddress: string) {
  console.log("i ran")
  
  let addressBalances = await getAddressBalances(userAddress)

  let addressActivityForRune = await getYourRunesActivity(addressBalances)

  let apiStatus = await getApiStatus()

  let { results, totalRunesActivity, mostFrequentRunes } =
    await getBlockActivity(apiStatus.block_height.toString())

  let featuredRunes = await getRunesEtchingInfo(mostFrequentRunes)

  return { addressBalances, addressActivityForRune, apiStatus, blockActivity: results, totalActivityCount: totalRunesActivity, featuredRunes }
}

export default async function Dashboard({ searchParams }: { searchParams: { userAddress: string } }) {

  let { addressBalances, addressActivityForRune, apiStatus, blockActivity, totalActivityCount, featuredRunes } = await retrieveAllData(searchParams.userAddress) 
  
  return (
    <main className="flex h-[968px] items-start justify-center gap-2 p-24">
      <div className="flex flex-col flex-1 gap-2">
        <Activity userAddress={searchParams.userAddress} addressActivityForRune={addressActivityForRune}/>
        <FeaturedCard userAddress={searchParams.userAddress} featuredRunes={featuredRunes} apiStatus={apiStatus}/>
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <BalancesCard userAddress={searchParams.userAddress} addressBalances={addressBalances}/>
        <BlockActivity userAddress={searchParams.userAddress} blockActivity={blockActivity} totalActivityCount={totalActivityCount} apiStatus={apiStatus} />
      </div>
    </main>
  )
}
