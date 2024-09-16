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
import { ChevronsUpDown, FolderKanban } from "lucide-react"
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
      <CardTitle className="flex items-center justify-start gap-2"><FolderKanban />Your Runes Activity</CardTitle>
      <CardDescription>Most recent Runes activity by block height</CardDescription>
    </CardHeader>
    <CardContent>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4">
          <h4 className="text-sm font-semibold">
            Your recent Runes activity
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
            addressActivityForRune[0] != undefined
              ? addressActivityForRune[0].spaced_name
              : "."
          }
          b={
            addressActivityForRune[0] != undefined
              ? addressActivityForRune[0].operation
              : "."
          }
          c={
            addressActivityForRune[0] != undefined
              ? addressActivityForRune[0].block_height
              : "."
          }
          d={
            addressActivityForRune[0] != undefined ? addressActivityForRune[0].amount : 0
          }
          e={
            addressActivityForRune[0] != undefined ? addressActivityForRune[0].symbol : ""
          }

        />
        <CollapsibleContent className="space-y-2">
          <DashboardLineItem
            a={
              addressActivityForRune[1] != undefined
                ? addressActivityForRune[1].spaced_name
                : "."
            }
            b={
              addressActivityForRune[1] != undefined
                ? addressActivityForRune[1].operation
                : "."
            }
            c={
              addressActivityForRune[1] != undefined
                ? addressActivityForRune[1].block_height
                : "."
            }
            d={
              addressActivityForRune[1] != undefined
                ? addressActivityForRune[1].amount
                : 0
            }
            e={
              addressActivityForRune[1] != undefined ? addressActivityForRune[1].symbol : ""
            }
          />
          <DashboardLineItem
            a={
              addressActivityForRune[2] != undefined
                ? addressActivityForRune[2].spaced_name
                : "."
            }
            b={
              addressActivityForRune[2] != undefined
                ? addressActivityForRune[2].operation
                : "."
            }
            c={
              addressActivityForRune[2] != undefined
                ? addressActivityForRune[2].block_height
                : "."
            }
            d={
              addressActivityForRune[2] != undefined
                ? addressActivityForRune[2].amount
                : 0
            }
            e={
              addressActivityForRune[2] != undefined ? addressActivityForRune[2].symbol : ""
            }  
          />
        </CollapsibleContent>
      </Collapsible>
    </CardContent>
    <CardFooter className="flex items-center justify-end">
      {addressActivityForRune.length > 0 ? (
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
      ) : (
        <Button disabled>No Activity</Button>
      )}
      
    </CardFooter>
  </Card>
  )
}