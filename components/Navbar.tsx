import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {jwtDecode} from "jwt-decode"; // ✅ default import
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import Logout from "./Logout";

export default async function Navbar() {
  const session = await auth();
  const token = session?.accessToken;

  if (!token) {
    // User not logged in
    return (
      <div className="h-16 w-screen bg-primary flex items-center justify-around fixed top-0 z-50]">
        <div className="logo">RatingX</div>
        <div className="text-white flex gap-2">
          <Link href={"/"}>Home</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-12 w-12 hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            
            <DropdownMenuItem>
             <Link href={"/signin"}>Signin</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  // Decode token safely
  type JwtPayload = { userId: string };
  let userId: string;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    userId = decoded.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    return null; // or show a fallback UI
  }

  return (
    <div className="h-16 w-screen bg-primary flex items-center justify-around fixed top-0">
      <div className="logo">RatingX</div>
      <div className="text-white flex gap-2">
        <Link href={"/"}>Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href={`/user/${userId}`}>Profile</Link>
      </div>
      <div className="center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-12 w-12 hover:cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href={`/user/${userId}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Logout />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
