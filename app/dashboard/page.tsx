import { auth } from "@/auth";
import DashboardTab from "@/components/DashboardTab";
import { Card } from "@/components/ui/card";
import React from "react";

export default async function page() {
  const session = await auth();
  if (session?.user.role != "systemAdmin") {
    return (
      <div className="h-screen w-screen center">
        <h1>Protected route only admins can access</h1>
      </div>
    );
  }
  return (
    <div className="h-screen w-screen bg-yellow-50 mt-16 pt-2 flex flex-col justify-start items-center gap-4">
      <Card className="w-1/2 h-56 flex  ">
        <h1>Total users : 100</h1>
        <h1>Total Stores : 200</h1>
        <h1>Total ratings: 23</h1>
      </Card>
      <Card className="w-1/2 min-h-[50vh]">
            <DashboardTab/>
      </Card>
    </div>
  );
}
