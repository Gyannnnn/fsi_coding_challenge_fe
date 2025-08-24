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
import { useState } from "react";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";

export default function Page() {
  const router = useRouter();
  const [isLoading, Setloading] = useState(false);
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      Setloading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });

      if (res?.error) {
        console.error(res.error);
        toast.error("Login Failed");
        Setloading(false);
      } else {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (error) {
      const err = error as Error;
      Setloading(false);
      toast.error(err.message);
    }
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle>RatingX</CardTitle>
        <CardDescription>Login to your RatingX Accout</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </div>
          <div className="pt-10 flex flex-col gap-4 justify-center items-center">
            <Button type="submit" className="w-full">
              {isLoading ? (
                <div className="flex gap-2 items-center justify-center">
                  <h1>Signingin </h1> <LoaderIcon className="animate-spin" />
                </div>
              ) : (
                "Login"
              )}
            </Button>
            <Link href="/signup">
              Dont have account ? <span className="text-primary">Signup</span>
            </Link>
          </div>
        </form>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          {
            isLoading?(<div className="flex gap-2 items-center justify-center"><h1>Signingin </h1> <LoaderIcon className="animate-spin"/></div>):"Login" 
          }
        </Button>
        <Link href="/signup">
          Dont have account ? <span className="text-primary">Signup</span>
        </Link>
      </CardFooter> */}
      <Toaster />
    </Card>
  );
}
