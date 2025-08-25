import { LoaderCircle } from 'lucide-react'
import React from 'react'

export default async function loading() {
    
  return (
    <div className='h-screen w-screen center'>
        <LoaderCircle className='animate-spin h-20 w-20 text-primary'></LoaderCircle>
    </div>
  )
}
