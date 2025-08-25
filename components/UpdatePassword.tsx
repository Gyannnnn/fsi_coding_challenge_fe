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



export default function UpdatePassword() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Update Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your password</DialogTitle>
          <form className="w-full" action="">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cpassword">Current Password</Label>
              <Input
                required
                name="cpassword"
                placeholder="Enter Current password"
              ></Input>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                required
                type="password"
                name="password"
                placeholder="Enter new password"
              ></Input>
            </div>

            <Button className="mt-2 w-full" type="submit">
              Update password
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
