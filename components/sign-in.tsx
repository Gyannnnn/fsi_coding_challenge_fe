"use client"

import { signIn as nextAuthSignIn } from "next-auth/react"

export function SignIn() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const res = await nextAuthSignIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
    })

    if (res?.error) {
      console.error(res.error)
    } else {
      console.log("Login successful")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Password
        <input name="password" type="password" required />
      </label>
      <button type="submit">Sign In</button>
    </form>
  )
}
