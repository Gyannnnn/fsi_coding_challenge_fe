import React from "react";
import { Card } from "./ui/card";
import { auth } from "@/auth";
import Link from "next/link";
interface Store {
  id: string;
  storeName: string;
  storeAddress: string;
  averageRating: number;
  ratingCount: number;
  createdAt: Date;
  updatedAt: Date;
  storeOwnerId: string;
}

export default async function StoreCard({ storeData }: { storeData: Store[] }) {
  if (!storeData) return <div>No stores found</div>;
  const session = await auth()
  const user = session?.user

  return (
    <div className="flex flex-col gap-4 ">
      {storeData.map((store) => (
        <Card key={store.id} className="w-full bg-white shadow-md p-4 rounded-lg relative">
          <h2 className="text-xl font-bold mb-2">{store.storeName}</h2>
          <p className="text-gray-600 mb-2">{store.storeAddress}</p>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold">Rating:</span>
            <span>{store.averageRating.toFixed(1)} ⭐</span>
            <span className="text-gray-500">({store.ratingCount} reviews)</span>
          </div>

          <div className="text-gray-500 text-sm">
            <p>Created: {new Date(store.createdAt).toLocaleDateString()}</p>
            <p>Updated: {new Date(store.updatedAt).toLocaleDateString()}</p>
          </div>
          {
            user?.role === "systemAdmin" ? (<div className="absolute top-2 right-2"><Link href={`/store/${store.id}`}>View Store</Link></div>):""
          }
        </Card>
      ))}
    </div>
  );
}
