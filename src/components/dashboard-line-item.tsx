"use client"

import { Separator } from "./ui/separator"

type DashboardLineItemParams = {
  // runes name or symbol
  a: string
  // operation or runes id
  b: string
  // block height or tx id or address
  c?: number | string
  // amount
  d: number
  // symbol
  e?: string
}

export default function DashboardLineItem({ a, b, c, d, e }: DashboardLineItemParams) {
  return (
    <div className="rounded-md border px-4 py-3 font-mono text-sm flex justify-between items-center my-3">
      <span>{a}</span>
      <Separator orientation="horizontal" />
      <span>{b}</span>
      {c ? (
        <>
          <Separator orientation="horizontal" />
          <span>{typeof c === "string" ? c.slice(-6) : c}</span>
        </>
      ) : null}
      <Separator orientation="horizontal" />
      <span>{d?.toLocaleString()}</span>
      <span className="text-2xl">&nbsp;{e}</span>
    </div>
  )
}
