import { auth } from "@/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import Link from "next/link";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import AddUser from "./AddUser";
import AddStore from "./AddStore";

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
  const session = await auth();
  const token = session?.accessToken;
  console.log("Token :" + token);

  try {
    const res = await axios.get<UserStoreResponse>(
      "https://fsi-coding-challenge-api.vercel.app//api/v1/dashboard/data",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;
    console.log(data);
    const userData = data.userData;
    const storeData = data.storeData;

    return (
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger value="account">Users</TabsTrigger>
          <TabsTrigger value="stores">Stores</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="flex flex-col gap-2">
            <AddUser/>
          {userData.map((user, index) => (
            <Link key={index} href={`/user/${user.id}`}>
              <div className="flex w-full h-10 center justify-between pr-24 pl-2 relative bg-red-100">
                <h1>{user.userName}</h1>
                <h1>{user.userEmail}</h1>
                <h1>📍 {user.userAddress}</h1>
                <Label className="absolute top-0 right-0 bg-primary text-white px-2 py-1 rounded font-bold">
                  Admin
                </Label>
              </div>
            </Link>
          ))}
        </TabsContent>
        <TabsContent value="stores" className="flex flex-col gap-2">
            <AddStore/>
          {storeData.map((store, index) => (
            <Link key={index} href={`/store/${store.id}`}>
              <div className="flex w-full h-10 center justify-between pr-24 pl-2 relative bg-red-100">
                <h1>{store.storeName}</h1>
                <h1>{store.storeAddress}</h1>
                <h1>{store.averageRating} ⭐</h1>
                <Label className="absolute top-0 right-0 bg-primary text-white px-2 py-1 rounded font-bold">
                  Admin
                </Label>
              </div>
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
