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
import { ChevronsUpDown } from "lucide-react"
import DashboardLineItem from "@/components/dashboard-line-item"
import Link from "next/link"
import { useState } from "react"
import { type AddressActivityForRune } from "@/types"

type props = {
  addressActivityForRune: AddressActivityForRune[]
  userAddress: string
}

export default function Activity({ addressActivityForRune, userAddress }: props) {

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card>
    <CardHeader>
      <CardTitle>Your Runes Activity</CardTitle>
      <CardDescription>Most recent Runes activity</CardDescription>
    </CardHeader>
    <CardContent>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
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
          pathname: "/dashboard/activity",
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