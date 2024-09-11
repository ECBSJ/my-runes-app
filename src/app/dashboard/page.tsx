"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Plus, X } from "lucide-react"
import {
  type AddressBalances,
  AddressActivityForRune,
  type BlockActivity,
  Etching,
  ApiStatus
} from "@/lib/models"
import {
  getAddressBalances,
  getYourRunesActivity,
  getBlockActivity,
  getApiStatus,
  getRunesEtchingInfo
} from "../utils/data-processing"
import DashboardLineItem from "@/components/dashboard-line-item"
import { useSearchParams } from "next/navigation"

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

export default async function Dashboard() {
  const searchParams = useSearchParams()
  let userAddress = searchParams.get("userAddress")!

  const [isOpen_Card1, setIsOpen_Card1] = useState(false)
  const [isOpen_Card2, setIsOpen_Card2] = useState(false)
  const [isOpen_Card4, setIsOpen_Card4] = useState(false)

  let { addressBalances, addressActivityForRune, apiStatus, blockActivity, totalActivityCount, featuredRunes } = await retrieveAllData(userAddress) 
  
  return (
    <main className="flex h-[968px] items-start justify-center gap-2 p-24">
      <div className="flex flex-col flex-1 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Runes Activity</CardTitle>
            <CardDescription>Most recent Runes activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible
              open={isOpen_Card1}
              onOpenChange={setIsOpen_Card1}
              className="space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                  You have 3 recent Runes activity
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <DashboardLineItem
                a={
                  addressActivityForRune
                    ? addressActivityForRune[0].rune_id
                    : "."
                }
                b={
                  addressActivityForRune
                    ? addressActivityForRune[0].operation
                    : "."
                }
                c={
                  addressActivityForRune
                    ? addressActivityForRune[0].block_height
                    : "."
                }
                d={
                  addressActivityForRune ? addressActivityForRune[0].amount : 0
                }
                e={
                  addressActivityForRune ? addressActivityForRune[0].symbol : ""
                }

              />
              <CollapsibleContent className="space-y-2">
                <DashboardLineItem
                  a={
                    addressActivityForRune
                      ? addressActivityForRune[1].rune_id
                      : "."
                  }
                  b={
                    addressActivityForRune
                      ? addressActivityForRune[1].operation
                      : "."
                  }
                  c={
                    addressActivityForRune
                      ? addressActivityForRune[1].block_height
                      : "."
                  }
                  d={
                    addressActivityForRune
                      ? addressActivityForRune[1].amount
                      : 0
                  }
                  e={
                    addressActivityForRune ? addressActivityForRune[1].symbol : ""
                  }
                />
                <DashboardLineItem
                  a={
                    addressActivityForRune
                      ? addressActivityForRune[2].rune_id
                      : "."
                  }
                  b={
                    addressActivityForRune
                      ? addressActivityForRune[2].operation
                      : "."
                  }
                  c={
                    addressActivityForRune
                      ? addressActivityForRune[2].block_height
                      : "."
                  }
                  d={
                    addressActivityForRune
                      ? addressActivityForRune[2].amount
                      : 0
                  }
                  e={
                    addressActivityForRune ? addressActivityForRune[2].symbol : ""
                  }  
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary">Secondary</Button>
            <Link
              href={{
                pathname: "/dashboard/your-activity",
                query: {
                  userAddress
                }
              }}
              className={buttonVariants({ variant: "default" })}
              prefetch={true}
            >
              View More
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Featured Runes</CardTitle>
            <CardDescription>
              Most active Runes in recent Bitcoin block height{" "}
              {apiStatus?.block_height}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-semibold">
                {featuredRunes?.spaced_name}
              </span>{" "}
              | {featuredRunes?.id}
            </p>
            <div className="flex items-center justify-between my-4">
              <span className="text-8xl">{featuredRunes?.symbol}</span>
              <Separator orientation="horizontal" />

              <span className="flex flex-col justify-between gap-2">
                <p className="font-semibold">Current Supply:</p>
                {Number(featuredRunes?.supply.current).toLocaleString()}
              </span>
            </div>
            <span className="flex items-center justify-start gap-2">
              <Badge variant="secondary">
                {featuredRunes?.supply.mintable ? "Mintable" : "Unmintable"}
              </Badge>
              <Badge variant="secondary">
                {featuredRunes?.turbo ? "Turbo" : "Not Turbo"}
              </Badge>
              <Badge variant="secondary">
                {featuredRunes?.location.block_height}
              </Badge>
            </span>
            <span></span>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary">Secondary</Button>
            <Link
              href={`https://magiceden.us/runes/${featuredRunes?.spaced_name}`}
              className={buttonVariants({ variant: "default" })}
              prefetch={true}
              target="_blank"
            >
              View More
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Runes Balances</CardTitle>
            <CardDescription>Snapshot of your Runes balances</CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible
              open={isOpen_Card2}
              onOpenChange={setIsOpen_Card2}
              className="space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                  Balances of your top 3 Runes
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <DashboardLineItem
                a={
                  addressBalances ? addressBalances[0].spaced_name : "."
                }
                b={addressBalances ? addressBalances[0].id : "."}
                d={addressBalances ? addressBalances[0].balance : 0}
                e={addressBalances ? addressBalances[0].symbol : "."}
              />
              <CollapsibleContent className="space-y-2">
                <DashboardLineItem
                  a={
                    addressBalances
                      ? addressBalances[1].spaced_name
                      : "."
                  }
                  b={addressBalances ? addressBalances[1].id : "."}
                  d={addressBalances ? addressBalances[1].balance : 0}
                  e={addressBalances ? addressBalances[1].symbol : "."}

                />
                <DashboardLineItem
                  a={
                    addressBalances
                      ? addressBalances[2].spaced_name
                      : "."
                  }
                  b={addressBalances ? addressBalances[2].id : "."}
                  d={addressBalances ? addressBalances[2].balance : 0}
                  e={addressBalances ? addressBalances[2].symbol : "."}
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary">Secondary</Button>

            <Link
              href={{
                pathname: "/dashboard/your-balance",
                query: {
                  userAddress
                }
              }}
              className={buttonVariants({ variant: "default" })}
              prefetch={true}
            >
              View More
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity in Block</CardTitle>
            <CardDescription>
              Total of {totalActivityCount} Runes activity in last confirmed block {apiStatus?.block_height}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible
              open={isOpen_Card4}
              onOpenChange={setIsOpen_Card4}
              className="space-y-2"
            >
              <div className="flex items-center justify-between space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                  3 most recent activity in last confirmed block
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <DashboardLineItem
                a={blockActivity ? blockActivity[0].spaced_name : "."}
                b={blockActivity ? blockActivity[0].operation : "."}
                c={blockActivity ? blockActivity[0].tx_id : "."}
                d={blockActivity ? blockActivity[0].amount : 0}
              />
              <CollapsibleContent className="space-y-2">
                <DashboardLineItem
                  a={blockActivity ? blockActivity[1].spaced_name : "."}
                  b={blockActivity ? blockActivity[1].operation : "."}
                  c={blockActivity ? blockActivity[1].tx_id : "."}
                  d={blockActivity ? blockActivity[1].amount : 0}
                />
                <DashboardLineItem
                  a={blockActivity ? blockActivity[2].spaced_name : "."}
                  b={blockActivity ? blockActivity[2].operation : "."}
                  c={blockActivity ? blockActivity[2].tx_id : "."}
                  d={blockActivity ? blockActivity[2].amount : 0}
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary">Secondary</Button>

            <Link
              href={{
                pathname: "/dashboard/recent-block-activity",
                query: {
                  userAddress
                }
              }}
              className={buttonVariants({ variant: "default" })}
              prefetch={true}
            >
              View More
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
