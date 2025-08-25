import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import AddUser from "./AddUser";
import AddStore from "./AddStore";
import { Card } from "./ui/card";

interface User {
  id: string;
  userName: string;
  userEmail: string;
  userAddress: string;
  userRole: "user" | "storeOwner" | "systemAdmin";
}

interface StoreOwner {
  id: string;
  userName: string;
  userEmail: string;
  userAddress: string;
  userRole: string;
}

interface Store {
  id: string;
  storeName: string;
  storeAddress: string;
  averageRating: number;
  storeOwner: StoreOwner;
}

interface UserStoreResponse {
  message: string;
  userData: User[];
  storeData: Store[];
}

export default async function DashboardTab() {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const res = await axios.get<UserStoreResponse>(
      "https://fsi-coding-challenge-api.vercel.app//api/v1/dashboard/data",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;

    const userData = data.userData;
    const storeData = data.storeData;

    return (
      <Tabs defaultValue="account" className="w-full">
        {/* Tab Buttons */}
        <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            👤 Users
          </TabsTrigger>
          <TabsTrigger
            value="stores"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg"
          >
            🏬 Stores
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="account" className="flex flex-col gap-3 mt-4">
          <AddUser />

          {userData.map((user) => (
            <Link key={user.id} href={`/user/${user.id}`}>
              <Card className="flex items-center justify-between px-4 py-3 hover:shadow-md transition rounded-xl">
                <div className="flex flex-col">
                  <h1 className="font-medium text-gray-800">{user.userName}</h1>
                  <p className="text-sm text-gray-500">{user.userEmail}</p>
                  <p className="text-xs text-gray-400">📍 {user.userAddress}</p>
                </div>
                <Badge variant="secondary">Admin</Badge>
              </Card>
            </Link>
          ))}
        </TabsContent>

        {/* Stores Tab */}
        <TabsContent value="stores" className="flex flex-col gap-3 mt-4">
          <AddStore />

          {storeData.map((store) => (
            <Link key={store.id} href={`/store/${store.id}`}>
              <Card className="flex items-center justify-between px-4 py-3 hover:shadow-md transition rounded-xl">
                <div className="flex flex-col">
                  <h1 className="font-medium text-gray-800">
                    {store.storeName}
                  </h1>
                  <p className="text-sm text-gray-500">{store.storeAddress}</p>
                  <p className="text-xs text-yellow-600">
                    ⭐ {store.averageRating.toFixed(1)}
                  </p>
                </div>
                <Badge variant="secondary">Admin</Badge>
              </Card>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    );
  } catch (error) {
    const err = error as Error;
    return <h1>{err.message}</h1>;
  }
}
