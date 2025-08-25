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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AddUser() {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const address = formData.get("address");
    const password = formData.get("password");
    const role = formData.get("role");


    const loadingId = toast.loading("Creating user...");
    try {
      const res = await axios.post(
        "https://fsi-coding-challenge-api.vercel.app/api/v1/user/adduser",
        {
          userName: name,
          userEmail: email,
          userPassword: password,
          userAddress: address,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.dismiss(loadingId);
      toast.success("User created successfully");
    } catch (error) {
      const err = error as Error;
      toast.dismiss(loadingId);
      toast.error("Failed to create user: " + err.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add a new user</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New User</DialogTitle>
          <form className="w-full" onSubmit={submitHandler}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input required name="name" placeholder="Enter user name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                required
                type="email"
                name="email"
                placeholder="Enter user email"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                required
                type="password"
                name="password"
                placeholder="Enter user password"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                required
                type="text"
                name="address"
                placeholder="Enter user address"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>User role</Label>
              <Select name="role">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="storeOwner">Store owner</SelectItem>
                  <SelectItem value="systemAdmin">System Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-2 w-full" type="submit">
              Add new user
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
      <Toaster position="top-right" />
    </Dialog>
  );
}
