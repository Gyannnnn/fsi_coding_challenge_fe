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
      <div className="h-16 w-full bg-primary fixed top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
          <Link href="/"><div className="logo text-white">RatingX</div></Link>
          <div className="text-white hidden sm:flex gap-3">
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
              <DropdownMenuItem>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
    // Fallback to logged-out navbar if token can't be decoded
    return (
      <div className="h-16 w-full bg-primary fixed top-0 z-50">
        <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
          <Link href="/"><div className="logo text-white">RatingX</div></Link>
          <div className="text-white hidden sm:flex gap-3">
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
              <DropdownMenuItem>
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <div className="h-16 w-full bg-primary fixed top-0 z-50">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        <Link href="/"><div className="logo text-white">RatingX</div></Link>
        <div className="text-white hidden sm:flex gap-3">
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
                <Link href="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
