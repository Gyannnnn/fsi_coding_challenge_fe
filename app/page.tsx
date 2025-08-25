import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import React from "react";
import axios from "axios";
import StoreCard from "@/components/StoreCard";
import USerCard from "@/components/USerCard";

export default async function page() {
  const session = await auth();
  const email = session?.user?.email;
  if (!session) {
    return <div className="h-screen w-screen center">Not authenticated</div>;
  }
  try {
    const res = await axios.get(
      "https://fsi-coding-challenge-api.vercel.app/api/v1/store/all-stores"
    );

    const data = res.data.stores;

    return (
      <div className="min-h-screen w-full flex flex-col items-center  justify-center">
        <div className="w-1/2">
          <USerCard />
        </div>
        <div className="w-1/2">
          <StoreCard storeData={data} />
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
