import CreateEventForm from '@/components/shared/createEvent/CreateEventForm'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const page = () => {
    const {sessionClaims} = auth();
    console.log("ADFADFa");

    const userId = sessionClaims?.userId as string;

    console.log("UserId" , userId);
  return (
    <div>
        <div className='md:py-5 py-3 bg-primary-50'>
            <h2 className='h3-bold wrapper md:text-left text-center'>Create Event</h2>
        </div>

        <div className='wrapper my-8'>
            <CreateEventForm userId={userId} type="Create"/>
        </div>
    </div>
  )
}

export default page