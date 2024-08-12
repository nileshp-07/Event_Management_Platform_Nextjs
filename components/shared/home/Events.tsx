import { getAllEvents } from '@/lib/actions/event.actions'
import React from 'react'
import Collection from '../common/Collection';

const Events = async () => {
  const response = await getAllEvents({
    query: "",
    page : 1,
    limit : 6,
    category: ""
  });

  return (
    <section id="events" className='my-8 wrapper flex flex-col gap-8 md:gap-12'>
        <h2 className='h2-bold'>Trust by <br/>
        Thousands of Events</h2>

        <div className='flex flex-col md:flex-row'>

          <Collection
            events = {response?.events}
            emptyMsg = "No Events Found"
            emptyStateSubtext = "No back later"
            collectionType =  "All_Events"
            limit = {6}
            page = {1}
            totalPages = {response?.totalPages}


          />

        </div>
    </section>
  )
}

export default Events