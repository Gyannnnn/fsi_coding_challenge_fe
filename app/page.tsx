import { auth } from "@/auth";
import React from "react";
import axios from "axios";
import StoreCard from "@/components/StoreCard";
import USerCard from "@/components/USerCard";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const session = await auth();
  const email = session?.user?.email;
  const token = session?.accessToken;

  if (!session) {
    return (
      <div className="h-screen w-screen center flex flex-col gap-2">
        <h1>Not Authenticated</h1>
        <Link href={"/signin"}>
          <Button>Sign in</Button>
        </Link>
      </div>
    );
  }
  const decoded: { userId: string } = jwtDecode(token as string);
  const userId = decoded.userId;
  try {
    const res = await axios.get(
      "https://fsi-coding-challenge-api.vercel.app/api/v1/store/all-stores"
    );

    const data = res.data.stores;
    const query = typeof searchParams?.q === "string" ? searchParams?.q : "";
    const filteredStores = query
      ? data.filter((store: { storeName?: string; storeAddress?: string }) => {
          const name = String(store.storeName || "").toLowerCase();
          const addr = String(store.storeAddress || "").toLowerCase();
          const q = query.toLowerCase();
          return name.includes(q) || addr.includes(q);
        })
      : data;

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-start gap-6 mt-20 px-4 pb-10">
        <div className="w-full max-w-2xl">
          <USerCard />
        </div>
        <div className="w-full max-w-2xl">
          <form method="get" className="mb-2">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search stores by name or address"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>
          <StoreCard storeData={filteredStores} />
        </div>
      </div>
    );
  } catch (error) {
    const err = error as Error;
    return (
      <div className="h-screen w-screen center">
        <h1>{err.message} </h1>
      </div>
    );
  }
}
