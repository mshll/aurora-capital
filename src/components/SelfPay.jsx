import * as React from "react"
import { Button } from "@/components/ui/button"
import { ChevronsUpDown } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import DepositToAccount from "./Deposit"
import WithdrawToAccount from "./Withdraw"

async function SelfPay() {

    return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Deposit</TabsTrigger>
        <TabsTrigger value="password">Withdraw</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Deposit</CardTitle>
            <CardDescription>
              Deposit funds into your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <DepositToAccount />
          </CardContent>
        </Card>
      </TabsContent>

      
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Withdraw</CardTitle>
            <CardDescription>
            Withdraw funds from your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <WithdrawToAccount />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default SelfPay