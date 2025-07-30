"use client"

import { SignUp, useUser } from '@clerk/clerk-react'
import Link from 'next/link'
import React from 'react'

const page = () => {

    const { isSignedIn } = useUser()

    if (!isSignedIn)
        return <div className='flex justify-center items-center'>
            <SignUp />
        </div>
}

export default page