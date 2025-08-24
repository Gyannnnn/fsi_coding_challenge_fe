import {
  Dialog,
  DialogContent,
  DialogDescription,
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

export default function AddStore() {
  return (
    <Dialog>
          <DialogTrigger>
            <Button>Add a new Store</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Store</DialogTitle>
              <form className="w-full" action="">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name">Store name</Label>
                  <Input required name="name" placeholder="Enter store name"></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="Enter user email"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="Enter user password"
                  ></Input>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    required
                    type="address"
                    name="address"
                    placeholder="Enter user address"
                  ></Input>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>User role</Label>
                  <Select>
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
        </Dialog>
  )
}
