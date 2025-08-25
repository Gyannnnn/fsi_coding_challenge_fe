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
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4 mt-20">
        <div className="w-full max-w-md bg-white rounded-2xl shadow p-6 text-center">
          <h1 className="text-lg font-semibold text-gray-800">Please sign in</h1>
          <p className="text-gray-500 mt-1">You need to be authenticated to view a profile.</p>
        </div>
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
    console.log(res)

    return (
      <div className="min-h-screen w-full flex flex-col items-center bg-gray-50 mt-20 px-4 py-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white text-xl font-bold shadow">
              {data.user.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{data.user.userName}</h1>
              <p className="text-gray-600">{data.user.userEmail}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
              <p className="text-xs uppercase tracking-wide text-gray-500">Address</p>
              <p className="mt-1 text-gray-800">{data.user.userAddress}</p>
            </div>
            <div className="rounded-xl border border-gray-100 p-4 bg-gray-50">
              <p className="text-xs uppercase tracking-wide text-gray-500">Joined</p>
              <p className="mt-1 text-gray-800">{new Date(data.user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {loggedUserId === userid ? (
          <div className="w-full max-w-xl mt-6">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Update Password</h2>
              <UpdatePassword token={token} userId={loggedUserId} />
            </div>
          </div>
        ) : null}
      </div>
    );
  } catch (error) {
    const err = error as Error;
    return <div className="h-screen w-screen center">Error {err.message}</div>;
  }
}
