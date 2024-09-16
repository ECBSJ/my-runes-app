"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { ChevronsUpDown, SquareActivity } from "lucide-react"
import DashboardLineItem from "@/components/dashboard-line-item"
import Link from "next/link"
import { useState } from "react"
import { type ApiStatus, type BlockActivity } from "@/types"

type props = {
  blockActivity: BlockActivity[]
  totalActivityCount: number
  apiStatus: ApiStatus
  userAddress: string
}

export default function BlockActivity({ blockActivity, totalActivityCount, apiStatus, userAddress }: props) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card>
    <CardHeader>
      <CardTitle className="flex items-center justify-start gap-2"><SquareActivity />Activity in Block</CardTitle>
      <CardDescription>
        Total of {totalActivityCount} Runes activity in last confirmed block {apiStatus?.block_height}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
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
      <Button variant="secondary" onClick={() => window.open(`https://ordiscan.com/block/${apiStatus?.block_height}/runes`, '_blank')}>View Block</Button>
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
  )
}