import { auth } from "@/auth";
import axios from "axios";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <h1>Please login first</h1>;
  }

  const token = (session).accessToken;

  try {
    const res = await axios.get("http://localhost:8000/api/v1/user/hello", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res.data)
    // res.data is an object, so we render its properties
    return (
      <div>
        <h2>API Response:</h2>
        <p>Message: {res.data.message}</p>
        <p>User: {res.data.user?.name || "N/A"}</p>

        <div>
          <h1>Welcome, {(session.user).name}</h1>
          <p>Role: {(session.user).role}</p>
          <p>JWT Token: {token}</p>
        </div>
      </div>
    );
  } catch (error) {
    const err = error as Error
    return (
      <h1>
        {err.message} {token}
      </h1>
    );
  }
}
