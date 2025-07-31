"use client"

import { SignUp, useUser } from '@clerk/clerk-react'
import React from 'react'

const page = () => {

    const { isSignedIn } = useUser()

    return <div className='flex justify-center items-center'>
            <SignUp />
        </div>
}

export default page