"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
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
import { userSession } from "../utils/ConnectWallet"

export default async function Dashboard() {
  const [isOpen_Card1, setIsOpen_Card1] = useState(false)
  const [isOpen_Card2, setIsOpen_Card2] = useState(false)
  const [isOpen_Card4, setIsOpen_Card4] = useState(false)
  const [addressBalances, setAddressBalances] = useState<AddressBalances[]>()
  const [addressActivityForRune, setAddressActivityForRune] =
    useState<AddressActivityForRune[]>()
  const [blockActivity, setBlockActivity] = useState<BlockActivity[]>()
  const [totalRunesActivity, setTotalRunesActivity] = useState<Number>()
  const [mostFrequentRunes, setMostFrequentRunes] = useState<Etching>()
  const [apiStatus, setApiStatus] = useState<ApiStatus>()

  async function retrieveAllData() {
    let address: string = userSession.loadUserData().profile.btcAddress.p2tr.mainnet
    
    let response = await getAddressBalances(address)
    setAddressBalances(response)

    let response1 = await getYourRunesActivity(response)
    setAddressActivityForRune(response1)

    let apiStatus = await getApiStatus()
    setApiStatus(apiStatus)

    let { results, totalRunesActivity, mostFrequentRunes } =
      await getBlockActivity(apiStatus.block_height.toString())
    setBlockActivity(results)
    setTotalRunesActivity(totalRunesActivity)

    let response5 = await getRunesEtchingInfo(mostFrequentRunes)
    setMostFrequentRunes(response5)
  }

  useEffect(() => {
    retrieveAllData()
  }, [])

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
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary">Secondary</Button>
            <Button>View More</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suggested Runes</CardTitle>
            <CardDescription>
              Most active Runes in recent Bitcoin block height{" "}
              {apiStatus?.block_height}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-semibold">
                {mostFrequentRunes?.spaced_name}
              </span>{" "}
              | {mostFrequentRunes?.id}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-8xl">{mostFrequentRunes?.symbol}</span>
              <Separator orientation="horizontal" />

              <span className="flex flex-col justify-between gap-2">
                <p className="font-semibold">Current Supply:</p>
                {mostFrequentRunes?.supply.current}
              </span>
            </div>
            <span className="flex items-center justify-start gap-2">
              <Badge variant="secondary">
                {mostFrequentRunes?.supply.mintable ? "Mintable" : "Unmintable"}
              </Badge>
              <Badge variant="secondary">
                {mostFrequentRunes?.turbo ? "Turbo" : "Not Turbo"}
              </Badge>
              <Badge variant="secondary">
                {mostFrequentRunes?.location.block_height}
              </Badge>
            </span>
            <span></span>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary">Secondary</Button>
            <Button>View More</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Runes Balances</CardTitle>
            <CardDescription>Balances of your top 3 Runes</CardDescription>
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
                  addressBalances ? addressBalances[0].spaced_name : "Rune Name"
                }
                b={addressBalances ? addressBalances[0].id : "Rune ID"}
                d={addressBalances ? addressBalances[0].balance : 0}
              />
              <CollapsibleContent className="space-y-2">
                <DashboardLineItem
                  a={
                    addressBalances
                      ? addressBalances[1].spaced_name
                      : "Rune Name"
                  }
                  b={addressBalances ? addressBalances[1].id : "Rune ID"}
                  d={addressBalances ? addressBalances[1].balance : 0}
                />
                <DashboardLineItem
                  a={
                    addressBalances
                      ? addressBalances[2].spaced_name
                      : "Rune Name"
                  }
                  b={addressBalances ? addressBalances[2].id : "Rune ID"}
                  d={addressBalances ? addressBalances[2].balance : 0}
                />
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <Button variant="secondary">Secondary</Button>

            <Link
              href={"/dashboard/your-balance"}
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
              Most recent activity in last confirmed block
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
                  Most recent activity in last confirmed block
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

            <Button>View More</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
