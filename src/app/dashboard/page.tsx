"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible"
import { ChevronsUpDown, Plus, X } from "lucide-react"
import axios from "axios"

const getAddressBalances = async () => {
  let result = await axios.get("/api/address-balances")
  console.log(result.data)
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getAddressBalances()
  }, [])

  return (
    <main className="flex h-[968px] items-start justify-center gap-1 p-24">
      <div className="flex flex-col flex-1 gap-1">
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
              <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                <span>Runes Name</span>
                <Separator orientation="horizontal" />
                <span>receive</span>
                <Separator orientation="horizontal" />

                <span>859104</span>
                <Separator orientation="horizontal" />

                <span>10.00000</span>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                  <span>Runes Name</span>
                  <Separator orientation="horizontal" />
                  <span>receive</span>
                  <Separator orientation="horizontal" />

                  <span>859104</span>
                  <Separator orientation="horizontal" />

                  <span>10.00000</span>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                  <span>Runes Name</span>
                  <Separator orientation="horizontal" />
                  <span>receive</span>
                  <Separator orientation="horizontal" />

                  <span>859104</span>
                  <Separator orientation="horizontal" />

                  <span>10.00000</span>
                </div>
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
            <CardTitle>Your Favorite Runes</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
      <div className="flex flex-col flex-1 gap-1">
        <Card>
          <CardHeader>
            <CardTitle>Your Runes Balances</CardTitle>
            <CardDescription>Balances of your top 3 Runes</CardDescription>
          </CardHeader>
          <CardContent>
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
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
              <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                <span>Icon</span>
                <Separator orientation="horizontal" />
                <span>name</span>
                <Separator orientation="horizontal" />
                <span>balance</span>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                  <span>Icon</span>
                  <Separator orientation="horizontal" />
                  <span>name</span>
                  <Separator orientation="horizontal" />
                  <span>balance</span>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                  <span>Icon</span>
                  <Separator orientation="horizontal" />
                  <span>name</span>
                  <Separator orientation="horizontal" />
                  <span>balance</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
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
              open={isOpen}
              onOpenChange={setIsOpen}
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
              <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                <span>Runes Name</span>
                <Separator orientation="horizontal" />
                <span>operation</span>
                <Separator orientation="horizontal" />

                <span>address</span>
                <Separator orientation="horizontal" />

                <span>amount</span>
              </div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                  <span>Runes Name</span>
                  <Separator orientation="horizontal" />
                  <span>operation</span>
                  <Separator orientation="horizontal" />

                  <span>address</span>
                  <Separator orientation="horizontal" />

                  <span>amount</span>
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
                  <span>Runes Name</span>
                  <Separator orientation="horizontal" />
                  <span>operation</span>
                  <Separator orientation="horizontal" />

                  <span>address</span>
                  <Separator orientation="horizontal" />

                  <span>amount</span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}
