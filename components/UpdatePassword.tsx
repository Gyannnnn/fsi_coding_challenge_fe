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
import toast from "react-hot-toast";

interface UpdatePasswordProps {
  userId: string;
  token:string
}

export default function UpdatePassword({ userId,token }: UpdatePasswordProps) {

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const currentPassword = formData.get("cpassword");
    const password = formData.get("password");

    try {
      await axios.put(
        "https://fsi-coding-challenge-api.vercel.app/api/v1/auth/update-password",
        {
          currentPassword,
          newPassword: password,
          userId,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Password updated");
    } catch (error) {
      const err = error as Error;
      toast.error("Failed to update password: " + err.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Update Password</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update your password</DialogTitle>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-2">
              <Label htmlFor="cpassword">Current Password</Label>
              <Input
                required
                name="cpassword"
                type="password"
                placeholder="Enter current password"
              />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                required
                type="password"
                name="password"
                placeholder="Enter new password"
              />
            </div>

            <Button className="mt-4 w-full" type="submit">
              Update password
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
