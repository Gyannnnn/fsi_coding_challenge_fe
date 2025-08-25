import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { Divide } from "lucide-react";
import Link from "next/link";

interface StoreOwner {
  id: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userRole: string;
  userAddress: string;
  createdAt: string;
  updatedAt: string;
}

interface Store {
  id: string;
  storeName: string;
  storeAddress: string;
  averageRating: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
  storeOwnerId: string;
  storeOwner: StoreOwner;
}

interface Rating {
  id: string;
  rating: number;
  storeId: string;
  userId: string;
  store: Store;
  user: StoreOwner;
}

interface StoreResponse {
  message: string;
  store: Store & { ratings: Rating[] };
  ratings: Rating[];
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const token = session?.accessToken;
  if (session?.user.role != "systemAdmin") {
    return (
      <div className="h-screen w-screen center">
        Protected route only admin can access
      </div>
    );
  }
  const storeId = (await params).id;
  try {
    const res = await axios.get<StoreResponse>(
      `https://fsi-coding-challenge-api.vercel.app/api/v1/store/get-store/${storeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data.store;
    const ratingsData = res.data.ratings;

    return (
      <div className="h-screen w-screen bg-yellow-50 flex flex-col gap-4 justify-start items-center mt-16 pt-2">
        <Card className="w-full sm:w-1/2 bg-primary-foreground text-black h-56 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col gap-3 justify-center items-center">
            {/* Store Name */}
            <h1 className="text-2xl font-bold">{data.storeName}</h1>

            {/* Store Address */}
            <p className="flex items-center gap-2 text-sm ">
              <span>📍</span> {data.storeAddress}
            </p>

            {/* Ratings */}
            <div className="flex items-center gap-4">
              <p className="text-lg font-semibold">
                ⭐ {data.averageRating.toFixed(1)} / 5
              </p>
              <span className="text-sm ">({data.ratingCount} ratings)</span>
            </div>

            {/* Owner */}
            <p className="text-sm">
              <span className="font-medium">Owner:</span>{" "}
              {data.storeOwner.userName}
            </p>

            {/* Created At */}
            <p className="text-xs">
              Created on: {new Date(data.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Card>
        <h1>Ratings</h1>

        <Card className="w-full sm:w-1/2 bg-white rounded-2xl shadow-md p-4 flex flex-col gap-4">
          {ratingsData.length === 0 ? (
            <div className="center">
              <h1>No Ratings found !</h1>
            </div>
          ) : (
            ratingsData.map((data, index) => (
              <Link href={`/user/${data.user.id}`}>
                <Card
                  key={index}
                  className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {data.user.userName}
                    </h2>
                    <span className="text-yellow-500 font-medium">
                      ⭐ {data.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{data.user.userEmail}</p>
                  <p className="text-sm text-gray-500 capitalize">
                    {data.user.userRole}
                  </p>
                </Card>
              </Link>
            ))
          )}
        </Card>
      </div>
    );
  } catch (error) {
    return (
      <div className="h-screen w-screen center">
        <div className="flex flex-col items-center">
          <h1>No stores found !</h1>
          <Link className="px-4 py-2 border" href={"/"}>
            Go back
          </Link>
        </div>
      </div>
    );
  }
}
