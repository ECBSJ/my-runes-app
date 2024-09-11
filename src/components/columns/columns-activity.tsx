"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

type Data = {
  rune_id: string
  address: string
  amount: number
  operation: string
  block_height: number
  tx_id: string
  timestamp: number
  symbol: string
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "rune_id",
    header: "Rune ID"
  },
  {
    accessorKey: "operation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Operation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },

  {
    accessorKey: "timestamp",
    header: "Date"
  },
  {
    accessorKey: "block_height",
    header: "Block"
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal"
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    }
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => {
      const symbol: string = row.getValue("symbol")

      return <span className="text-4xl">{symbol}</span>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(data.tx_id)}
            >
              Copy TX ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Etching</DropdownMenuItem>
            <DropdownMenuItem>View Transaction</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
