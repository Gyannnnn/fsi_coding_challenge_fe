import { auth } from "@/auth";
import axios from "axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { Divide } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpdatePassword from "@/components/UpdatePassword";

interface userResponse {
  message: string;
  user: {
    id: string;
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
    userAddress: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ userid: string }>;
}) {
  const userid = (await params).userid;
  const session = await auth();
  const token = session?.accessToken;
  if (!token) {
    return (
      <div className="h-screen w-screen center">
        <h1>Signin first</h1>
      </div>
    );
  }
  const decoded: { userId: string } = jwtDecode(token as string);
  const loggedUserId = decoded.userId;
  try {
    const res = await axios.get<userResponse>(
      `https://fsi-coding-challenge-api.vercel.app/api/v1/user/getuser/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = res.data;

    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-2xl font-bold shadow-md">
              {data.user.userName.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-xl font-semibold text-gray-800">
              {data.user.userName}
            </h1>
            <p className="text-gray-600">{data.user.userEmail}</p>
            <p className="flex items-center justify-center text-gray-500">
              📍 <span className="ml-1">{data.user.userAddress}</span>
            </p>
            <p className="text-sm text-gray-400">
              Joined: {new Date(data.user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        {loggedUserId === userid ? (
          <div>
            <UpdatePassword token={token} userId={loggedUserId} />
          </div>
        ) : (
          ""
        )}
      </div>
    );
  } catch (error) {
    const err = error as Error;
    return <div className="h-screen w-screen center">Error {err.message}</div>;
  }
}
