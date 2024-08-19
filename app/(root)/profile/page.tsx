import Collection from '@/components/shared/common/Collection'
import { Button } from '@/components/ui/button'
import { getOrganizedEvents } from '@/lib/actions/event.actions'
import { getPurchasedOrder } from '@/lib/actions/order.action'
import { SearchParamType } from '@/types'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import React from 'react'

const ProfilePage = async ({searchParams} : SearchParamType) => {
    const {sessionClaims} = auth();
    const userId = sessionClaims?.userId  as string;

    const ordersPage = Number(searchParams?.ordersPage) || 1;
    const eventsPage = Number(searchParams?.eventsPage) || 1;

    const orders = await getPurchasedOrder({userId, page: ordersPage})

    const orderedEvents = orders?.orders?.map((order: any) => order.event)
    const organizedEvents = await getOrganizedEvents({userId, page: eventsPage });

    // console.log(organizedEvents);
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

        <div className='my-8 wrapper'>
            <Collection
               events = {orderedEvents}
               emptyMsg='No event ticket purchased yet'
               emptyStateSubtext='No worries - exiciting events to explore'
               collectionType='My_Tickets'
               limit={3}
               page={ordersPage}
               urlParamName='orderPage'
               totalPages={orders?.totalPages}
            />
        </div>
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
               page={eventsPage}
               urlParamName='eventsPage'
               totalPages={organizedEvents?.totalPages}
            />
        </div>
      </section>

    </>
  )
}

export default ProfilePage