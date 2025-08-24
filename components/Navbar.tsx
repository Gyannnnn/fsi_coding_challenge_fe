import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="h-16 w-screen bg-primary flex items-center justify-around fixed top-0">
      <div className="logo">RatingX</div>
      <div className="text-white flex gap-2">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/profile">Profile</Link>
      </div>
      <div className="center gap-4">
        <Button variant="outline">Logout</Button>
        <Avatar>
          <AvatarImage  src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
