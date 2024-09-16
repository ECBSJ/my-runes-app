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
  address: string
  balance: number
  id: string
  name: string
  spaced_name: string
  symbol: string
}

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "spaced_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Runes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    }
  },
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "balance",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue("balance"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "decimal"
      }).format(balance)

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
              onClick={() => navigator.clipboard.writeText(data.id)}
            >
              Copy Runes ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.open(`https://magiceden.us/runes/${data.spaced_name}`, '_blank')}>View Etching</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
