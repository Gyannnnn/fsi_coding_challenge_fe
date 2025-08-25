import { auth } from "@/auth";
import DashboardTab from "@/components/DashboardTab";
import { Card } from "@/components/ui/card";
import React from "react";
import axios from "axios";

interface analyticsResponse {
  message: string;
  usersCount: number;
  storeCount: number;
  ratingsCount: number;
}

export default async function page() {
  const session = await auth();
  if (session?.user.role != "systemAdmin") {
    return (
      <div className="h-screen w-screen center">
        <h1>Protected route only admins can access</h1>
      </div>
    );
  }
  const res = await axios.get<analyticsResponse>(
    "https://fsi-coding-challenge-api.vercel.app/api/v1/dashboard/analytics",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    }
  );
  const data = res.data;
  
  return (
    <div className="min-h-screen w-full bg-yellow-50 mt-20 px-4 py-4 flex flex-col items-center gap-6">
      <Card className="w-full max-w-4xl h-auto p-6 flex flex-col justify-center bg-white shadow-md rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          📊 Dashboard Stats
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-2xl font-bold text-blue-600">
              {data.usersCount}
            </h3>
            <p className="text-gray-500 text-sm">Users</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-2xl font-bold text-green-600">
              {data.storeCount}
            </h3>
            <p className="text-gray-500 text-sm">Stores</p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 shadow-sm">
            <h3 className="text-2xl font-bold text-yellow-600">
              {data.ratingsCount}
            </h3>
            <p className="text-gray-500 text-sm">Ratings</p>
          </div>
        </div>
      </Card>

      <Card className="w-full max-w-4xl min-h-[50vh]">
        <DashboardTab />
      </Card>
    </div>
  );
}
