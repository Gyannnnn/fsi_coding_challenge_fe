"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,  
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import axios from "axios";
import { z } from "zod";

export default function Page() {
  const signUpSchema = z.object({
    userName: z.string().min(10, "Name must be at least 10 characters").max(60),
    userEmail: z.string().email("Invalid email format"),
    userPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password cannot exceed 16 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/, {
        message:
          "Password must include uppercase, lowercase, number, and special character",
      }),
    userAddress: z.string().max(400, "Address cannot exceed 400 characters"),
  });

  const router = useRouter();
  const [isLoading, Setloading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const address = formData.get("address");
    const email = formData.get("email");
    const password = formData.get("password");

    const result = signUpSchema.safeParse({
      userName: name,
      userEmail: email,
      userPassword: password,
      userAddress: address,
    });

    if (!result.success) {
      result.error.issues.forEach((err) => toast.error(err.message));
      return;
    }

    try {
      Setloading(true);
      await axios.post("https://fsi-coding-challenge-api.vercel.app/api/v1/auth/signup", {
        userName: name,
        userEmail: email,
        userPassword: password,
        userAddress: address,
      });

      toast.success("SignUp successful");
      router.push("/signin");
    } catch (error) {
      const err = error as Error
      toast.error(err.message);
    } finally {
      Setloading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>RatingX</CardTitle>
        <CardDescription>Create a new account for RatingX</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Enter your name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter your Location"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>

          <div className="pt-10 flex flex-col gap-4 justify-center items-center">
            <Button type="submit" className="w-full">
              {isLoading ? (
                <div className="flex gap-2 items-center justify-center">
                  <span>Signing Up</span>
                  <LoaderIcon className="animate-spin" />
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
            <Link href="/signin">
              Already have an account?{" "}
              <span className="text-primary">Sign in</span>
            </Link>
          </div>
        </form>
      </CardContent>
      <Toaster />
    </Card>
  );
}
