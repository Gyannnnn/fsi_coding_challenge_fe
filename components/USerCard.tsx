import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { auth } from "@/auth";
import Link from "next/link";

export default async function USerCard() {
  const session = await auth();
  const token = session?.accessToken;
  const email = session?.user?.email;
  const name = session?.user?.name;
  const role = session?.user?.role;

  return (
    <Card className="w-full mt-16 mb-4">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-900">
          👋 Hello, {name || "User"}
        </CardTitle>
        <CardDescription className="text-gray-500 mt-1">
          Welcome back to RatingX
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-center">
        <p className="text-sm text-gray-700">
          <span className="font-medium text-gray-900">Email:</span> {email}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium text-gray-900">Role:</span> {role}
        </p>
        {role === "storeOwner" ? (
          <Link href={`/store`}>View ratings of your store</Link>
        ) : (
          ""
        )}
      </CardContent>
    </Card>
  );
}
