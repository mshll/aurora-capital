"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { transfer } from "@/actions/transactions";

function TransferPage({ me }) {
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState(searchParams.get("amount"));
  const accountId = searchParams.get("accountId");
  const isOwner = me.username === accountId;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTransfer = async () => {
    if (!isOwner) {
      toast.error("Unauthorized", {
        description: "Only the owner can initiate the transfer.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("amount", amount);

    try {
      await transfer(formData, accountId);
      toast.success("Transfer Successful!", {
        description: `Transfer of ${amount} KWD to ${accountId} was successful.`,
      });
    } catch (error) {
      toast.error("Transfer Failed", { description: "Try again later." });
      console.error("Transfer error:", error);
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-10 p-6 border border-gray-200 rounded-md shadow-md">
      <h3 className="text-lg font-bold">
        {isOwner ? "Edit Transfer Amount" : "Transfer Details"}
      </h3>
      <div className="mt-4">
        <label className="block text-sm font-medium">Owner: {accountId}</label>
        <label className="block text-sm font-medium">
          {isOwner ? "Editable Amount" : "Amount to Transfer"}
        </label>
        {isOwner ? (
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min="1"
            className="w-full"
          />
        ) : (
          <p className="text-xl font-semibold">{amount} KWD</p>
        )}
      </div>

      {isOwner && (
        <Button onClick={handleTransfer} variant="outline" className="mt-4">
          Update Transfer
        </Button>
      )}
    </div>
  );
}

export default TransferPage;
