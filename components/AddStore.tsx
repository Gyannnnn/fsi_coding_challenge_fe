"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "./ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";

export default function AddStore() {
  const { data: session } = useSession();
  const token = session?.accessToken;
  const decoded: { userId: string } = jwtDecode(token as string);
  const userId = decoded.userId;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const storeName = formData.get("storeName");
    const address = formData.get("address");

    try {
      await axios.post(
        "https://fsi-coding-challenge-api.vercel.app/api/v1/store/create",
        {
          storeName: storeName,
          storeAddress: address,
          storeOwnerId: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Store created succssfully");
    } catch (error) {
      const err = error as Error;

      toast.error("Failed to create store : " + err.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add a new Store</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Store</DialogTitle>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="storeName">Store name</Label>
              <Input
                required
                name="storeName"
                placeholder="Enter store name"
              ></Input>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                required
                name="address"
                placeholder="Enter store address"
              ></Input>
            </div>
            <Button className="mt-2 w-full" type="submit">
              Add new user
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}
