import { auth } from '@/auth'
import { SignIn } from '@/components/sign-in'
import React from 'react'

export default async function page() {
  const session = await auth()
  const email = session?.user?.email
  if (!session) return <div>Not authenticated</div>
  return (
    <div>
     
     <h1 className='text-6xl text-wrap'>{email}</h1>
      <SignIn/>
    </div>
  )
}
