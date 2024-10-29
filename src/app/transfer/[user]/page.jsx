"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter, redirect } from "next/navigation";

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useToast } from "@/hooks/use-toast";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const EditableAmount = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const amountParam = searchParams.get("amount");
  const [amount, setAmount] = useState(amountParam || "");

  useEffect(() => {
    if (amountParam) {
      setAmount(amountParam);
    }
  }, [amountParam]);

  const handleChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);

    // Update the URL with the new amount without reloading the page
    const newUrl = `${pathname}?amount=${newAmount}`;
    router.push(newUrl);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Edit Payment Request</CardTitle>
        <CardDescription>Change the amount you would like to request</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Amount</Label>
              <Input onChange={handleChange} type="number" id="amount" placeholder="Enter new amount" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row justify-between">
        <Button onClick={() => toast.error("Update Successful", {description: `Pay Me link amount has been updated to ${amount}`})} variant="outline">Update</Button>
        <Button onClick={() => router.push('/transactions')} variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
    // <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
    //   <h3>Edit Payment Amount</h3>
    //   <input
    //     type="number"
    //     value={amount}
    //     onChange={handleChange}
    //     style={{ padding: "8px", marginRight: "10px", width: "100px" }}
    //   />
    //   <button onClick={() => alert(`Payment amount updated to: $${amount}`)} style={{ padding: "8px 12px" }}>
    //     Update Amount
    //   </button>
    // </div>
  );
};

export default EditableAmount;
