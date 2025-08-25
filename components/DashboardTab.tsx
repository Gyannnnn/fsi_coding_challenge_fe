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

       
        <TabsContent value="account" className="mt-4">
          <div className="mb-3"><AddUser /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userData.map((user) => (
              <Link key={user.id} href={`/user/${user.id}`}>
                <Card className="px-5 py-4 hover:shadow-md transition rounded-2xl flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-gray-900">{user.userName}</h3>
                    <p className="text-sm text-gray-600">{user.userEmail}</p>
                    <p className="text-xs text-gray-500">📍 {user.userAddress}</p>
                  </div>
                  <Badge variant="secondary" className="shrink-0 capitalize">{user.userRole}</Badge>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

       
        <TabsContent value="stores" className="mt-4">
          <div className="mb-3"><AddStore /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {storeData.map((store) => (
              <Link key={store.id} href={`/store/${store.id}`}>
                <Card className="px-5 py-4 hover:shadow-md transition rounded-2xl flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-gray-900">{store.storeName}</h3>
                    <p className="text-sm text-gray-600">{store.storeAddress}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="text-yellow-600">⭐ {store.averageRating.toFixed(1)}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-300" />
                      <span>Owner: {store.storeOwner?.userName}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="shrink-0">Store</Badge>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    );
  } catch (error) {
    const err = error as Error;
    return <h1>{err.message}</h1>;
  }
}
