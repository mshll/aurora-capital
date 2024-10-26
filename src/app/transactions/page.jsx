"use client"

import * as React from "react"
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon, DollarSign, MoreHorizontal, Search } from "lucide-react"
import { format, parseISO, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


// Mock transaction data
const transactions = [
  {
    id: "1",
    date: "2024-10-01",
    description: "Grocery Store",
    amount: -85.484,
    balance: 1500.25,
    type: "withdrawl",
  },
  {
    id: "2",
    date: "2024-10-02",
    description: "Technology Academy Transfer",
    amount: 335.484,
    balance: 4000.25,
    type: "deposit",
  },
  {
    id: "3",
    date: "2024-10-03",
    description: "Oula Gas Station",
    amount: -6.484,
    balance: 3879.50,
    type: "withdrawl",
  },
  {
    id: "4",
    date: "2024-10-04",
    description: "Online Shopping",
    amount: -65.484,
    balance: 3813.51,
    type: "withdrawl",
  },
  {
    id: "5",
    date: "2024-10-05",
    description: "Transfer to Haya",
    amount: -12.484,
    balance: 3768.51,
    type: "transfer",
  },
]


export default function Transactions() {
  const [query, setQuery] = React.useState("")
  const [filter, setFilter] = React.useState("all")
  const [date, setDate] = React.useState(new Date())

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(query.toLowerCase())
    const matchesFilter = filter === "all" || transaction.type === filter
    const matchesDate = !date || isSameDay(parseISO(transaction.date), date)
    return matchesSearch && matchesFilter && matchesDate
  })

  return (
    <div className='flex h-full flex-1 flex-col items-center justify-center gap-16 p-8 pb-20 sm:p-20'>
      <div className=" h-[500px] w-[900px] overflow-y-auto no-scrollbar rounded-lg border bg-card text-card-foreground shadow-sm p-6">
      <div className="flex flex-col space-y-1.5 mb-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Transactions</h3>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 sm:space-x-2">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a transaction"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8" 
            />
          </div>
          

          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className={cn("w-[240] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "MMMM dd, yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar 
              mode="single"
              selected={date}
              onSelect={(newDate) => setDate(newDate)}
              initialFocus />
            </PopoverContent>
          </Popover>
          
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Transactions</SelectItem>
              <SelectItem value="withdrawl">Withdrawls</SelectItem>
              <SelectItem value="deposit">Deposits</SelectItem>
              <SelectItem value="transfer">Transfers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {transaction.description}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Download receipt</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <CalendarIcon className="mr-1 h-4 w-4" />
                      {transaction.date}
                    </p>
                    <p className="text-2xl font-bold">
                      <span className={transaction.amount < 0 ? "text-red-500" : "text-green-500"}>
                        {transaction.amount < 0 ? (
                          <ArrowDownIcon className="mr-1 h-5 w-5 inline" />
                        ) : (
                          <ArrowUpIcon className="mr-1 h-5 w-5 inline" />
                        )}
                        ${Math.abs(transaction.amount).toFixed(3)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <p className="text-xs text-muted-foreground">Balance</p>
                    <p className="text-sm font-medium">${transaction.balance.toFixed(3)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
