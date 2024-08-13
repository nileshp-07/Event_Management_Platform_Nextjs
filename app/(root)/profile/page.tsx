import Collection from '@/components/shared/common/Collection'
import { Button } from '@/components/ui/button'
import { getOrganizedEvents } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const page = async () => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId  as string;

    const organizedEvents = await getOrganizedEvents({userId, page: 1 });

    console.log(organizedEvents);
  return (
    <>
      <section>
        <div className='bg-primary-50 py-5 md:py-10 ' >
            <div className='wrapper flex items-center justify-center sm:justify-between'>
                <h2 className='h3-bold text-center sm:text-left'>My Tickets</h2>

                <Button size="lg" className='rounded-full hidden sm:flex'>
                    <Link href="/#events">
                      Explore More Events
                    </Link>
                </Button>
            </div>
        </div>

        {/* <div className='my-8 wrapper'>
            <Collection
               events = {orderedEvents}
               emptyMsg='No event ticket purchased yet'
               emptyStateSubtext='No worries - exiciting events to explore'
               collectionType='My_Tickets'
               limit={3}
               page={1}
               urlParamName='orderPage'
               totalPages={1}
            />
        </div> */}
      </section>

      <section>
        <div className='bg-primary-50 py-5 md:py-10 ' >
            <div className='wrapper flex items-center justify-center sm:justify-between'>
                <h2 className='h3-bold text-center sm:text-left'>Events Organized</h2>

                <Button size="lg" className='rounded-full hidden sm:flex'>
                    <Link href="/event/create">
                      Create New Events
                    </Link>
                </Button>
            </div>
        </div>

        <div className='my-8 wrapper'>
            <Collection
               events = {organizedEvents?.events}
               emptyMsg='No event have been create yet'
               emptyStateSubtext='Create Now'
               collectionType='Events_Organized'
               limit={3}
               page={1}
               urlParamName='eventsPage'
               totalPages={1}
            />
        </div>
      </section>

    </>
  )
}

export default page